import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";

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
    
    // check if user already existed or not
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })
    
    if(existedUser) throw new ApiError(409,"User already existed");
    
    // create user object and enter in DB
    const user = await User.create({
        username: username.toLowerCase(),
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
    const {username, email, password} = req.body;
    
    // Login path - Username or Email
    if(!username && !email) throw new ApiError(400,"username or email required");

    if(!password) throw new ApiError(400,"Password is required");

    // Find user
    const user = await User.findOne(
        {
            $or: [{username}, {email}]
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
    const refreshToken = req.cookies?.refreshToken;

    if(refreshToken){
        await User.findOneAndUpdate(
            { refreshToken },
            { $unset: { refreshToken:1 }}
        );
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req,res) => {

    // Take refresh token
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    console.log(incomingRefreshToken);
    
    if(! incomingRefreshToken) throw new ApiError(401,"Unauthorized request");

    // Decode the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(401,"Invalid or expired refresh token");
    }

    // Check user exist or not
    const user = await User.findById(decodedToken._id);
    if(!user) throw new ApiError(401,"Invalid refresh token");

    // Token rotation
    if(incomingRefreshToken !== user?.refreshToken) throw new ApiError(401,"Refresh token is expired or used");

    // New token generation
    const {refreshToken, accessToken} = await generateAccessAndRefreshToken(user);

    // DB save
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    // Create options 
    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    }

    // Send response
    return res.
    status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200,{accessToken: accessToken, refreshToken: refreshToken},"Access token refreshed"));
})

export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
};