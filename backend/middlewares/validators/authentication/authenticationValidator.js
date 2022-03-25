const ObjectId = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");
const catchError = require("../../../errorHandlers/errorHandlers").catchError;

exports.checkSignupCredentials = (req, res, next) => {
    if (req.body.fullName && req.body.email && req.body.password) {
        next();
    } else {
        let error = new Error("Request failed. Request did not have all the values necessary for this endpoint!");
        error.statusCode = 400;
        throw error;
    }
};

exports.checkSigninCredentials = (req, res, next) => {
    if (req.body.email && req.body.password) {
        next();
    } else {
        let error = new Error("Request failed. Request did not have all the values necessary for this endpoint!");
        error.statusCode = 400;
        throw error;
    }
};

exports.checkResetPasswordRequest = (req, res, next) => {
    if (req.body.email) {
        next();
    } else {
        let error = new Error("The email value was not present.");
        error.statusCode = 400;
        throw error;
    }
};

exports.checkResetPassword = (req, res, next) => {
    if (req.body.password && req.body.token) {
        next();
    } else {
        let error = new Error("Request failed. Request did not have all the values necessary for this endpoint!");
        error.statusCode = 400;
        throw error;
    }
};

exports.checkAuthentication = async (req, res, next) => {
    const authorizationHeader = req.get("Authorization");
    catchError(
        {
            type: "generalError",
            message: "The Authorization header was not there",
            statusCode: 400,
            next
        },
        authorizationHeader
    );
    const token = authorizationHeader.split(" ")[1];
    catchError(
        {
            type: "generalError",
            message: "The user is not logged in!",
            statusCode: 401,
            next
        },
        token
    );
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SALT);
        catchError(
            {
                type: "generalError",
                message: "Invalid token. Authentication failed!",
                statusCode: 401
            },
            decodedToken
        );
    } catch (error) {
        next(error);
    }
    req.userId = decodedToken.user_id;
    next();
};
