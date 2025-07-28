
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', async (req, res) => {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
});

router.post('/', async (req, res) => {
    const task = new Task({ ...req.body, userId: req.userId });
    await task.save();
    res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
    const updated = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        req.body,
        { new: true }
    );
    res.json(updated);
});

router.delete('/:id', async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted' });
});

module.exports = router;
