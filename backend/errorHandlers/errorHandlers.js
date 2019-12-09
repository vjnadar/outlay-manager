exports.catchError = (errorHolder, response) => {
  switch (errorHolder.type) {
    case "generalError": {
      if (!response) {
        let error = new Error(errorHolder.message);
        error.statusCode = errorHolder.statusCode;
        if (errorHolder.next) {
          errorHolder.next(error);
        } else {
          throw error;
        }
      }
      break;
    }
    case "generalErrorInverse": {
      if (response) {
        let error = new Error(errorHolder.message);
        error.statusCode = errorHolder.statusCode;
        if (errorHolder.next) {
          errorHolder.next(error);
        } else {
          throw error;
        }
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
    default: {
      return;
    }
  }
};
