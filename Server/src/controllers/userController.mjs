import { matchedData, validationResult } from 'express-validator';
import { User } from '../mongoose/schemas/user.mjs';
import { hashPassword, useErrorHandler } from '../utils/helpers.mjs';

export const userIndex = async (req, res, next) => {
  return res.status(200).json(await User.find({}));
};

export const userRegisterController = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(200).json({
      msg: result.array().map((r) => ({
        value: r?.path === 'password' ? '******' : r?.value,
        msg: r?.msg,
        field: r?.path,
      })),
    });
  }

  const data = matchedData(req);
  data.password = hashPassword(data.password);
  const newUser = new User(data);

  try {
    const savedUser = await newUser.save();
    return res.status(200).json(savedUser);
  } catch (error) {
    next(useErrorHandler(error.message, 400));
  }
};
