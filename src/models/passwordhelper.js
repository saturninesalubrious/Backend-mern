if(!this.modified("password")) return next();

if (this.isNew || this.isModified("password")) {
 this.password = await bcrypt.hash(this.password,   
10);
}

userSchema.pre('save', async function (next) {
 if (this.isModified('password')) {
   this.password = await bcrypt.hash(this.password, 10);
 }
 next(); }