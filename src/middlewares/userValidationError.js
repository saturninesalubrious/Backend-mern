import { userSchema } from "../Validators/schemaDefined.js"
import { ApiError } from "../utils/ApiError.js"


const validateUser = async (req,res,next) => {

 const UserListing = req.body

 if (!UserListing){
 throw new ApiError(400, "Send validate data for the creating the user")
 }

 if(!userSchema.validate(UserListing)) {
   throw new ApiError(400, "Send validate data for the creating the user")
 }
 next();
}

export {validateUser}