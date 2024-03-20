import { model, Schema } from 'mongoose';
import validator from 'validator';

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
  },
});

userSchema.pre('save',function(next){
    if(this.password===this.confirmPassword){
        next()
    }
});

const User = model('User', userSchema);

export default User;
