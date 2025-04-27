import bcrypt from 'bcrypt';

export const useErrorHandler = (err, statusCode) => {
  if (typeof err === 'string') {
    const errObj = new Error(err);
    errObj.status = statusCode;
    return errObj;
  }

  if (!err.status && statusCode) {
    err.status = statusCode;
  }
  return err;
};

const saltRounds = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plainPW, hashedPW) =>
  bcrypt.compareSync(plainPW, hashedPW);
