const moment = require("moment");
const ObjectId = require("mongodb").ObjectID;
const Long = require("mongodb").Long;

const getDbAccess = require("../../databaseConnection/connectToDb").getDbAccess;
const catchError = require("../../errorHandlers/errorHandlers").catchError;

class Entry {
    constructor(_id, user_id, flowtype, type, amount, date, time) {
        this._id = _id ? _id : null;
        this.user_id = user_id;
        this.flowtype = flowtype;
        this.type = type;
        this.amount = amount;
        this.date = date;
        this.time = time;
    }

    static async getGrandTotal(userId) {
        const db = getDbAccess();
        try {
            let result = await db
                .collection("outlayRecords")
                .aggregate([{ $match: { user_id: userId } }, { $group: { _id: "$flowtype", totalAmount: { $sum: "$amount" } } }, { $sort: { _id: 1 } }]);
            return result;
        } catch (error) {
            return error;
        }
    }

    static async getEntryByDate(date, userId) {
        const db = getDbAccess();
        try {
            let result = await db.collection("outlayRecords").aggregate([
                { $match: { user_id: userId, date: date } },
                { $sort: { _id: -1 } },
                {
                    $group: {
                        _id: ObjectId(),
                        income: {
                            $push: {
                                $cond: [{ $eq: ["$flowtype", "income"] }, "$$ROOT", null]
                            }
                        },
                        expense: {
                            $push: {
                                $cond: [{ $eq: ["$flowtype", "expense"] }, "$$ROOT", null]
                            }
                        }
                    }
                },
                {
                    $project: {
                        income: { $setDifference: ["$income", [null]] },
                        expense: { $setDifference: ["$expense", [null]] }
                    }
                }
            ]);
            return result;
        } catch (error) {
            return error;
        }
    }

    async save() {
        const db = getDbAccess();
        try {
            if (!this._id) {
                const result = await db.collection("outlayRecords").insertOne(this);
                return result;
            } else {
                const result = await db.collection("outlayRecords").updateOne(
                    { _id: this._id, user_id: this.user_id },
                    {
                        $set: this
                    }
                );
                return result;
            }
        } catch (error) {
            return error;
        }
    }

    static async deleteById(_id, user_id) {
        const db = getDbAccess();
        try {
            let result = await db.collection("outlayRecords").deleteOne({ _id, user_id });
            return result;
        } catch (error) {
            return error;
        }
    }
}

module.exports = Entry;
