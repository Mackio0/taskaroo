import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
