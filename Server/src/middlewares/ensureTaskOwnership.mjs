import { Task } from '../mongoose/schemas/task.mjs';
import { useErrorHandler } from '../utils/helpers.mjs';

const ensureTaskOwnership = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;

    const task = await Task.findById(taskId);
    if (!task) {
      return next(useErrorHandler('Task not found', 404));
    }

    if (task.user.toString() !== userId.toString()) {
      return next(useErrorHandler('Unauthorized', 401));
    }

    next();
  } catch (error) {
    if (error.name === 'CastError') {
      return next(useErrorHandler('Invalid task ID', 400));
    }
    next(useErrorHandler(error.message, 500));
  }
};

export default ensureTaskOwnership;


// if (taskId && userId) {
//     Task.findById(taskId)
//       .then((task) => {
//         if (task.user.toString() === userId) {
//           return next();
//         }
//         return next(useErrorHandler('Unauthorized', 401));
//       })
//       .catch((error) => {
//         return next(useErrorHandler(error.message, 500));
//       });
//   } else {
//     return next(useErrorHandler('Unauthorized', 401));
//   }
