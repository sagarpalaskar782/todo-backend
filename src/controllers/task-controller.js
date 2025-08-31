import express from 'express';
import Task from '../models/task.js'; // Ensure correct path
import dotenv from 'dotenv';
import { protect } from '../middleware/auth-middleware.js';
dotenv.config(); // Load environment variables

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get list of task (protected route)
// @access  Private
router.get('', protect, async (req, res) => {
    try {
        console.log("Fetching tasks for user:", req.user);

        const listOfTask = await Task.find({ userId: req.user });

        res.json({
            message: 'List of task fetched successfully',
            data: listOfTask,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   post /api/task
// @desc    Add new task (protected route)
// @access  Private
router.post('', protect, async (req, res) => {
    const { name, description, status, userId } = req.body;
    try {
        let task = await Task.findOne({ name });
        if (task) {
            return res.status(400).json({ message: 'Task name already exists' });
        }

        task = new Task({
            name,
            description,
            status,
            userId
        });

        await task.save();

        res.json({
            message: 'New task added',
            data: task,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   patch /api/task
// @desc    Update task status(protected route)
// @access  Private
router.patch('', protect, async (req, res) => {
    const { name, description, status } = req.body;
    console.log("Update attempt for task:", req.body);
    try {
        let task = await Task.findOne({ name });
        console.log("find one result:", task);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const result = await Task.updateOne({ name: name }, { $set: { status: status } });
        console.log("Update result:", result);

        res.json({
            message: 'Task updated successfully',
            data: task,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;