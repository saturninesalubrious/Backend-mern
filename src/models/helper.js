userSchema = new Schema({
 userName: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
  index: true
 },
 email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
 },
 fullName: {
  type: String,
  required: true,
  trim: true,
  index: true,
 },
 password: {
  type: String,
  required: [true, 'Password is true']
 },
})