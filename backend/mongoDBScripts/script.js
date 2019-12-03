use outlayManager;
db.createCollection("outlayRecords", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "user_id",
        "flowtype",
        "type",
        "amount",
        "date",
        "time"
      ],
      description: "An outlay record",
      properties: {
        _id: {
          bsonType: "objectId",
          description: "The unique id of the record."
        },
        user_id: {
          bsonType: "objectId",
          description: "The unique user id associated with the record"
        },
        flowtype: {
          bsonType: "string",
          description: "The type of cash flow."
        },
        type: {
          bsonType: "string",
          description: "The type of income/expense"
        },
        amount: {
          bsonType: "long",
          description: "The amount of cash from the flow"
        },
        date: {
          bsonType: "string",
          description: "The date of the entry."
        },
        time: {
          bsonType: "string",
          description: "The time of the entry."
        }
      }
    }
  }
});

db.createCollection("users",{
  validator:{
    $jsonSchema:{
      bsonType:"object",
      required:["_id","fullName","email","password"],
      description:"The user document",
      properties:{
        _id:{
          bsonType:"objectId",
          description:"The unique userId."
        },
        fullName:{
          bsonType:"string",
          description:"The full name of the user."
        },
        email:{
          bsonType:"string",
          description:"The email of the user."
        },
        password:{
          bsonType:"string",
          description:"The user's account password."
        }
      }
    }
  }
});
