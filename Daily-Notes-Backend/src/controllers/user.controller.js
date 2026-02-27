import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import { validatePasswordStrength } from "../utils/passwordValidator.js"

const generateAccessAndRefreshToken = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return { accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while generating Access and Refresh token");
    }
}

const registerUser = asyncHandler( async (req,res) => {

    // Take information
    const {username, email, password} = req.body || {};
    
    // check imformations
    if([username,email,password].some((field) => !field || field.trim() === "")){
        throw new ApiError(400,"All fields are required");
    }

    validatePasswordStrength(password);
    
    // check if user already existed or not
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })
    
    if(existedUser) throw new ApiError(409,"User already existed");
    
    // create user object and enter in DB
    const user = await User.create({
        username,
        email,
        password,
    })
    
    // remove password and refreshtoken from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    // check for user creation
    if(!createdUser) throw new ApiError(500,"Something went wrong while registering the user");
    
    // res return
    return res.status(201).json(new ApiResponse(201,createdUser,"User registered successfully"));
})

const loginUser = asyncHandler(async (req,res) => {

    // Take information
    const { identifier, password} = req.body;
    
    // Login path - Username or Email
    if(!identifier) throw new ApiError(400,"username or email required");
    
    if(!password) throw new ApiError(400,"Password is required");
    
    // Find user
    const user = await User.findOne(
        {
            $or: [{username: identifier.trim()}, {email: identifier}]
        }
    )
    
    if(!user) throw new ApiError(404,"User does not exist");
    
    // Validation
    const isPasswordValid = await user.isPasswordCorrect(password);
    
    if(!isPasswordValid) throw new ApiError(401,"Password is invalid");
    
    // generate access and refresh token
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user);
        
    // send cookie
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/", // Cookie will be sent for all routes
        maxAge: 24 * 60 * 60 * 1000,
    }

    // Create object
    const safeUser = user.toObject();
    
    delete safeUser.password;
    delete safeUser.refreshToken;

    // Send response 
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,{user: safeUser},"User logged in successfully")
    )
})

const logoutUser = asyncHandler(async (req, res) => {

    // Take refresh token
    const refreshToken = req.cookies?.refreshToken;

    // Reset refresh token
    if(!refreshToken){
        return res
        .status(401)
        .json(new ApiResponse(401,{}, " Unauthorized request"))
    }

    const user = await User.findOne({ refreshToken });
    
    if(user){
        user.refreshToken = undefined;
        await user.save();
    }

    // Create options
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    }

    // Send response
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req,res) => {

    // Take refresh token
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    
    if(! incomingRefreshToken) throw new ApiError(401,"Unauthorized request");
    
    // Check user exist or not
    const user = await User.findOne({ refreshToken: incomingRefreshToken });
    if(!user) throw new ApiError(403,"Invalid refresh token");
    
    try {
        jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch (error) {
        user.refreshToken = undefined;
        await user.save({ validateBeforeSave: false });

        throw new ApiError(403, "Expired or invalid refresh token");
    }

    // Token rotation
    if(incomingRefreshToken !== user?.refreshToken) {
        user.refreshToken = undefined;
        await user.save({ validateBeforeSave: false });

        throw new ApiError(401,"Refresh token is expired or used");
    }

    // New token generation
    const {refreshToken, accessToken} = await generateAccessAndRefreshToken(user);

    // DB save
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    // Create options 
    const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"strict",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,

};

    // Send response
    return res.
    status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200,{},"Access token refreshed"));
})

const changeCurrentPassword = asyncHandler(async (req, res) => {

    // Take the information
    const {currentPassword, newPassword, confirmPassword} = req.body;

    if([currentPassword, newPassword, confirmPassword].some(field => !field || field === "")){
        throw new ApiError(400,"All fields are required");
    }

    validatePasswordStrength(newPassword);

    if(newPassword !== confirmPassword) throw new ApiError(400,"Password do not match");

    if(newPassword === currentPassword) throw new ApiError(400,"Password must be different with current password");
    
    // Get user
    const user = await User.findById(req.user?._id);

    if (!user) throw new ApiError(401, "User not found");

    // Change user password
    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

    if(!isPasswordCorrect) throw new ApiError(401,"Invalid credentials");

    // Set and save new password
    user.password = newPassword;
    user.refreshToken = null;
    await user.save();

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/", // Cookie will be sent for all routes
        maxAge: 24 * 60 * 60 * 1000,
    }

    // Retuen a response
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200,"Password changed successfully")
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.user,"Current user fetched successfully")
    )
})

const updateAccountDetails = asyncHandler(async (req,res) => {

    // Take information
    const { username } = req.body;

    // Validation
    if(!username.trim()) throw new ApiError(400,"Username is required");
    
    if (username === req.user.username) throw new ApiError(400, "Username is unchanged");

    // Take user and change credentials
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                username: username,
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken");

    if (!user) throw new ApiError(404, "User not found");

    // Create a response and send it
    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"Account details updated successfully")
    )
})

const deleteAccount = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) throw new ApiError(404, "User not found");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Account deleted successfully"));
})

export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    deleteAccount
};