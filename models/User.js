import { model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  phoneNumber: {
    type: Number,
    required: [true, 'Phone number field is required'],
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    validate: [validator.isEmail, 'Enter proper email'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: [8, 'Password should contain minimum 8 characters'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Password field is required'],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: "password and confirm password doesn't match",
    },
  },
  resetPasswordToken: String, // Store the token for password reset
  resetPasswordExpires: Date, // Expiry time for the reset token
  resetPasswordOtp:Number,
});

userSchema.pre('save', async function (next) {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword=async function(pwd,pwdDB){
  return await bcrypt.compare(pwd,pwdDB)
}

const User = model('User', userSchema);

export default User;
