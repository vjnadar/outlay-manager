const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;
const Long = require("mongodb").Long;

const Entry = require("../../model/Entry/Entry");
const getDbAccess = require("../../databaseConnection/connectToDb").getDbAccess;
const catchError = require("../../errorHandlers/errorHandlers").catchError;

exports.getAllData = (req, res, next) => {
  res
    .status(200)
    .json({ message: "Data retrieval was successful", data: tempData });
};

exports.getTotal = async (req, res, next) => {
  let db = getDbAccess();
  const userId = ObjectId(req.userId);
  try {
    let result = await Entry.getGrandTotal(userId);
    result.toArray((err, response) => {
      if (err) {
        next(err);
      }
      if (!response.length) {
        response = [
          { _id: "expense", totalAmount: 0 },
          { _id: "income", totalAmount: 0 }
        ];
      }
      if (response[0]._id !== "expense") {
        response.unshift({ _id: "expense", totalAmount: 0 });
      }
      if (!response[1] || response[1]._id !== "income") {
        response.push({ _id: "income", totalAmount: 0 });
      }
      res.status(200).json({
        message: "Fetched the total successfully!",
        result: response
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.getDateData = async (req, res, next) => {
  const db = getDbAccess();
  let date = moment(req.params.date)
    .utc(true)
    .format("YYYY-MM-DD");
  let userId = ObjectId(req.userId);
  try {
    let result = await Entry.getEntryByDate(date, userId);
    result.next((err, result) => {
      if (err) {
        next(err);
      }
      if (result === null) {
        result = {
          _id: ObjectId(),
          income: [],
          expense: []
        };
      }
      res.status(200).json({
        message: "The data was fetched successfully",
        entryFromDate: result
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.postDateData = async (req, res, next) => {
  const db = getDbAccess();
  const userId = ObjectId(req.userId);
  const flowtype = req.body.flowtype;
  const type = req.body.type;
  const amount = Long.fromNumber(req.body.amount);
  const date = moment(req.body.dateTime).format("YYYY-MM-DD");
  const time = moment(req.body.dateTime).format("HH:mm:ss");
  const newEntry = new Entry(null, userId, flowtype, type, amount, date, time);
  try {
    let result = await newEntry.save();
    catchError("insertOne", result);
    res.status(201).json({
      message: "The date entry was posted successfully",
      _id: result.insertedId
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEntry = async (req, res, next) => {
  const db = getDbAccess();
  const newEntry = req.body.newEntry;
  const entryId = ObjectId(newEntry._id);
  const flowtype = newEntry.flowtype;
  const type = newEntry.type;
  const amount = Long.fromNumber(newEntry.amount);
  const time = moment(newEntry.dateTime).format("HH:mm:ss");
  const date = moment(newEntry.dateTime).format("YYYY-MM-DD");
  const userId = ObjectId(req.userId);
  const newEntryToBeSaved = new Entry(
    entryId,
    userId,
    flowtype,
    type,
    amount,
    date,
    time
  );
  try {
    let result = await newEntryToBeSaved.save();
    catchError("updateOne", result);
    res.status(200).json({ message: "The entry was updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteEntry = async (req, res, next) => {
  const id = ObjectId(req.params.id);
  const db = getDbAccess();
  const userId = ObjectId(req.userId);
  try {
    let result = await Entry.deleteById(id, userId);
    catchError("deleteOne", result);
    res.status(200).json({ message: "The entry was deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
