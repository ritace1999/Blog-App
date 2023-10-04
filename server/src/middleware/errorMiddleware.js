export const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    msg: err.msg || "Internal server error.",
  });
};

export const routesErr = (req, res, next) => {
  next({
    status: 404,
    msg: `Invalid method/URL ${req.method} ${req.path}`,
  });
};
