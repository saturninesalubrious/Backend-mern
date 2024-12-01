import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { application } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/userModel.js";



const registerUser = asyncHandler(async (req,res) => {

 const {email, userName, password, fullName} = req.body
 const existingUser = await User.findOne({ $or: [{userName}, {email}]})

 if(existingUser) {
  throw new ApiError(409, "User with email or username already exists")
 }

 console.log("req.file", req.files)

 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path;

 if (!avatarLocalPath) {
  throw new ApiError(400,"Avatar file is required")
 }

 const avatar = await uploadOnCloudinary(avatarLocalPath);
 const coverImage = await uploadOnCloudinary(coverImageLocalPath);
 
 
 if (!avatar) {
  throw new ApiError(400, "Avatar file is required")
 }

const CreatedUser = await User.create({
 fullName,
 avatar: avatar.url,
 coverImage: coverImage?.url || 0,
 email,
 password,
 userName: userName.toLowerCase()
});

const UpdatedCreateduser =  await User.findById(CreatedUser._id).select("-password -refreshToken")

if (!UpdatedCreateduser) {
 throw new ApiError(500, "something went wrong while registering the user")
}


res.status(201).json(new ApiResponse(200, UpdatedCreateduser, "User created successfully"));

})

export {registerUser}