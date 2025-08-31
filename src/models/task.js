import mongoose from 'mongoose';
import { taskStateEnum } from '../utils/task-state-enum.js';

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: [taskStateEnum.PENDING, taskStateEnum.IN_PROGRESS, taskStateEnum.COMPLETED],
            message: '{VALUE} is not a valid status. Allowed values are: pending, in-progress, completed'
        },
        default: taskStateEnum.PENDING
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;