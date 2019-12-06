const getDbAccess = require("../../databaseConnection/connectToDb").getDbAccess;

class ResetPassword {
  constructor(user_id, token, expirationTime) {
    (this._id = user_id),
      (this.token = token),
      (this.expirationTime = expirationTime);
  }

  static async findBy(token, _id) {
    const db = getDbAccess();
    try {
      if (!_id) {
        let response = await db.collection("resetPassword").findOne({ token });
        return response;
      } else {
        let response = await db.collection("resetPassword").findOne({ _id });
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  async save() {
    const db = getDbAccess();
    try {
      let response = await db.collection("resetPassword").insertOne(this);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async deleteById(_id) {
    const db = getDbAccess();
    try {
      let result = await db.collection("resetPassword").deleteOne({ _id });
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ResetPassword;
