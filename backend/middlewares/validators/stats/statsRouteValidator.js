exports.getStatsValidator = (req, res, next) => {
  if (req.body.startDate && req.body.endDate) {
    next();
  } else {
    let error = new Error(
      "Request failed. The end point didnt receive the date values!"
    );
    error.statusCode = 400;
    throw error;
  }
};
