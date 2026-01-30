import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res)=>{

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
    return res.status(201).json(new ApiResponse(200,createdUser,"User registered successfully"));
})
console.log(registerUser);

export { registerUser};