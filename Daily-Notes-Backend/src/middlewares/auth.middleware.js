import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {

    // Collect the access token
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    
    if(!token) throw new ApiError(401,"Unauthorized request");
    
    // Decode the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Find the user & remove sensitive field
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
    if(!user) throw new ApiError(401,"Invalid Access Token");
    
    // Attach the user to the req
    req.user = user;

    // Move next
    next();

})