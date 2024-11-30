import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { application } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (req,res) => {

 const {email, userName, password, fullName} = req.body
 const existingUser = User.findOne({ email})

 if(existingUser) {
  throw new ApiError(409, "User with email or username already exists")
 }

 console.log("req.file", req.file)

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

await User.create({
 fullName,
 avatar: avatar.url,
 coverImage: coverImage?.url || 0,
 email,
 password,
 username: username.toLowerCase()
})

const createduser =  await user.findById(user._id).select("-password -refreshToken")

if (!createduser) {
 throw new ApiError(500, "something went wrong while registering the user")
}


res.status(201).json(new ApiResponse(200, createduser, "user created successfully"));


})

export {registerUser}