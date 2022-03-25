const ObjectId = require("mongodb").ObjectID;
const moment = require("moment");

const getDbAccess = require("../../databaseConnection/connectToDb").getDbAccess;

exports.getStats = async (req, res, next) => {
    const startDate = moment(req.body.startDate).utc(true).format("YYYY-MM-DD");
    const endDate = moment(req.body.endDate).utc(true).format("YYYY-MM-DD");
    const userId = ObjectId(req.userId);
    const db = getDbAccess();
    try {
        let result = await db
            .collection("outlayRecords")
            .aggregate([
                {
                    $match: { user_id: userId, date: { $gte: startDate, $lte: endDate } }
                },
                {
                    $group: {
                        _id: { type: "$type", flowtype: "$flowtype" },
                        amount: { $sum: "$amount" }
                    }
                },
                { $sort: { _id: 1 } }
            ])
            .toArray();
        res.status(200).json({
            message: "The relevant data was retreived succesfully!",
            result
        });
    } catch (error) {
        next(error);
    }
};
