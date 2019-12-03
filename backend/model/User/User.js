const getDbAccess = require("../../databaseConnection/connectToDb").getDbAccess;
const catchError = require("../../errorHandlers/errorHandlers").catchError;

class User {
  constructor(_id, fullName, email, password) {
    this._id = _id ? _id : null;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }

  async save() {
    const db = getDbAccess();
    try {
      if (!this._id) {
        let result = await db.collection("users").insertOne(this);
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  static async findByEmail(email) {
    const db = getDbAccess();
    try {
      let result = await db.collection("users").findOne({ email });
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = User;
