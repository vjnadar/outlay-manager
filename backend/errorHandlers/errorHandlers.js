exports.catchError = (type, response) => {
  switch (type) {
    case "commonOp": {
      if (!response) {
        let error = new Error("The operation failed! Not found");
        error.statusCode = 404;
        throw error;
      }
      break;
    }
    case "insertOne": {
      if (
        response.insertedCount !== undefined &&
        response.insertedCount !== 1
      ) {
        let error = new Error("The insertion operation failed.");
        throw error;
      } else if (response.name === "MongoError") {
        let error = new Error("MongoDb error. Check database");
        throw error;
      }
      break;
    }
    case "updateOne": {
      if (
        response.modifiedCount !== undefined &&
        response.modifiedCount !== 1 &&
        response.matchedCount !== 1
      ) {
        let error = new Error("The insertion operation failed.");
        throw error;
      } else if (response.name === "MongoError") {
        let error = new Error("MongoDb error. Check database");
        throw error;
      }
      break;
    }
    case "deleteOne": {
      if (response.deletedCount !== undefined && response.deletedCount !== 1) {
        let error = new Error("The deletion operation failed.");
        throw error;
      } else if (response.name === "MongoError") {
        let error = new Error("MongoDb error. Check database");
        throw error;
      }
      break;
    }
    case "accountAvailability": {
      if (response) {
        let error = new Error("The user account already exists");
        error.statusCode = 400;
        throw error;
      }
      break;
    }
    case "hashPassword": {
      if (!response) {
        let error = new Error("The hash process failed");
        error.statusCode = 400;
        throw error;
      }
      break;
    }
    case "userNotRegistered": {
      if (!response) {
        let error = new Error(
          "This user does not have an account and should register!"
        );
        error.statusCode = 401;
        throw error;
      }
      break;
    }
    case "isPasswordValid": {
      if (!response) {
        let error = new Error("The entered password is invalid!");
        error.statusCode = 401;
        throw error;
      }
      break;
    }
    default: {
      return;
    }
  }
};
