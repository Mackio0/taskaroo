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
    console.log(savedTask);
    return res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task: ' + error)
    next(useErrorHandler(error.message, 500));
  }
};

export const getTasks = (req, res, next) => {
  return res.status(200).json({ msg: 'getTasks' });
};

export const getTask = (req, res, next) => {
  return res.status(200).json({ msg: 'getTask' });
};

export const updateTask = (req, res, next) => {
  return res.status(200).json({ msg: 'updateTask' });
};

export const deleteTask = (req, res, next) => {
  return res.status(200).json({ msg: 'deleteTask' });
};
