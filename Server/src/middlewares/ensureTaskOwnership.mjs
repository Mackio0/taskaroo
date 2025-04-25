import { Task } from '../mongoose/schemas/task.mjs';
import { useErrorHandler } from '../utils/helpers.mjs';

const ensureTaskOwnership = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    // console.log('taskId -' + taskId + '\n' + 'userId -' + userId);

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.user.toString() !== userId.toString()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    return next();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ msg: 'Invalid task ID' });
    }
    next(useErrorHandler(error, 500));
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
