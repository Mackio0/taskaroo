import { matchedData, validationResult } from 'express-validator';
import { Task } from '../mongoose/schemas/task.mjs';
import { useErrorHandler } from '../utils/helpers.mjs';

export const createTask = async (req, res, next) => {
  const { id } = req.user;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      msg: result.array().map((r) => ({
        value: r?.value,
        msg: r?.msg,
        field: r?.path,
      })),
    });
  }

  const data = matchedData(req);
  data.user = id;
  try {
    const newTask = new Task(data);
    const savedTask = await newTask.save();
    // console.log(savedTask);
    return res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task: ' + error);
    next(useErrorHandler(error, 500));
  }
};

export const getTasks = async (req, res, next) => {
  const { id } = req.user;
  try {
    const tasks = await Task.find({ user: id });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(`Error fetching tasks: ${error}`);
    next(useErrorHandler(error, 500));
  }
};

export const getTask = async (req, res, next) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    return res.status(200).json(task);
  } catch (error) {
    console.error(`Error fetching task ${taskId}: ${error}`);
    next(useErrorHandler(error, 500));
  }
};

export const updateTask = async (req, res, next) => {
  const taskId = req.params.id;
  const body = req.body;
  try {
    const updateTask = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
      runValidators: true,
    });
    if (!updateTask) {
      return next(useErrorHandler(`Task with ID ${taskId} not found`, 404));
    }
    return res.status(200).json(updateTask);
  } catch (error) {
    console.error(`Error updating task ${taskId}: ${error}`)
    next(useErrorHandler(error, 500))
  }
};

export const deleteTask = async (req, res, next) => {
  const taskId = req.params.id;
  try {
    const deleteTask = await Task.findByIdAndDelete(taskId)
    if(!deleteTask) {
      return next(useErrorHandler(`Task with ID ${taskId} not found`, 404))
    }
    return res.status(204).send()
  } catch (error) {
    console.error(`Error deleting task ${taskId}: ${error}`)
    next(useErrorHandler(error, 500))
  }
};
