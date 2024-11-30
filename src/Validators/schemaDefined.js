import Joi from "joi";


const userSchema = Joi.object({
 userName: Joi.string().lowercase().trim().required(),
 email: Joi.string().lowercase().trim().required().email(),
 fullName: Joi.string().trim().required(),
 password: Joi.string().required()
});




export {userSchema}