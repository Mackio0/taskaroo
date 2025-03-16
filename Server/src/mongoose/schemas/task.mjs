import mongoose, { ObjectId } from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    estimatedFinishTime: {
      type: Number,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
