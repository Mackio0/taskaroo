const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ status: err.status, msg: err.message });
  } else {
    res.status(500).json({ msg: err.message });
  }
};

export default errorHandler