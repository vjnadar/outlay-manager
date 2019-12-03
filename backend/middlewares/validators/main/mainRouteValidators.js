exports.checkForParam = (req, res, next) => {
  if (req.params.id || req.params.date) {
    next();
  } else {
    let error = new Error(
      "Request failed. The end point didnt receive the id param!"
    );
    error.statusCode = 400;
    throw error;
  }
};

exports.postDateDataValidator = (req, res, next) => {
  if (
    req.body.flowtype &&
    req.body.type &&
    req.body.dateTime &&
    req.body.amount
  ) {
    next();
  } else {
    let error = new Error(
      "Request failed. Request did not have all the values necessary for this endpoint!"
    );
    error.statusCode = 400;
    throw error;
  }
};

exports.updateEntryValidator = (req, res, next) => {
  const newEntry = req.body.newEntry;
  let check;

  for (let k in newEntry) {
    if (!newEntry[k]) {
      check = false;
      break;
    }
    check = true;
  }
  if (check) {
    next();
  } else {
    let error = new Error(
      "Request failed. Request did not have all the values necessary for this endpoint!"
    );
    error.statusCode = 400;
    throw error;
  }
};
