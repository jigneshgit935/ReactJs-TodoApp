const express = require('express');

const router = express.Router();

const Todo = require('../Models/Todo');

router.get('/test', (req, res) => {
  res.json({ message: 'Todo routes Api is working' });
});

// create todo
router.post('/createtodo', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
    });
    await newTodo.save();
    res.status(201).json({
      message: 'Todo created successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get('/getAllTodo', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      todos,
      message: 'Todo fetched successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get('/getatodo/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).json({
        message: 'Todo not found',
      });
    }
    res.status(200).json({
      todo,
      message: 'Todo fetched successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.put('/updatetodo/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed,
      },
      {
        new: true,
      }
    );

    if (!todo) {
      res.status(404).json({
        message: 'Todo not found',
      });
    }
    res.status(200).json({
      todo,
      message: 'Todo updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete('/deletetodo/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      res.status(404).json({
        message: 'Todo not found',
      });
    }
    res.status(200).json({
      message: 'Todo deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
