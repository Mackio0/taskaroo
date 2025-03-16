import { useErrorHandler } from '../utils/helpers.mjs';

export const loginController = (req, res, next) => {
  return req.user
    ? res.status(200).json({ msg: 'Login Successfully' })
    : next(useErrorHandler('Bad Credentials', 401));
};

export const authStatusController = (req, res, next) => {
  console.log(req.isAuthenticated());
  return req.user
    ? res.status(200).json(req.user)
    : res.status(401).json({ msg: 'User is not authenticated' });
};

export const logoutController = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    return res.status(200).json({ msg: 'Logout Successfully' });
  });
};
