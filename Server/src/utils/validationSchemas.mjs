export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
      errorMessage:
        'Username must be at least 3 characters and at most 30 characters',
    },
    notEmpty: {
      errorMessage: 'Username must not be empty',
    },
    isString: {
      errorMessage: 'Username must be a string',
    },
  },
  password: {
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: 'Password must be at least 6 characters',
    },
    notEmpty: {
      errorMessage: 'Password must not be empty',
    },
  },
};

export const createTaskValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: 'Title must not be empty',
    },
    isString: {
      errorMessage: 'Title must be a string',
    },
  },
  description: {
    isString: {
      errorMessage: 'Description must be a string',
    },
    optional: true,
  },
  completed: {
    notEmpty: {
      errorMessage: 'Completed must not be empty',
    },
    isBoolean: {
      errorMessage: 'Completed must be a boolean',
    },
  },
  priority: {
    notEmpty: {
      errorMessage: 'Priority must not be empty',
    },
    isString: {
      errorMessage: 'Priority must be a string',
    },
  },
  estimatedFinishTime: {
    notEmpty: {
      errorMessage: 'Estimated finish time must not be empty',
    },
    isInt: {
      errorMessage: 'Estimated finish time must be an integer',
    },
  },
};
