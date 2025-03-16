import bcrypt from 'bcrypt';

export const useErrorHandler = (errMsg, statusCode) => {
  const error = new Error(errMsg);
  error.status = statusCode;
  return error;
};

const saltRounds = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plainPW, hashedPW) =>
  bcrypt.compareSync(plainPW, hashedPW);
