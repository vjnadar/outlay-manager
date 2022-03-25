const crypto = require("crypto");

exports.cryptoAsync = async (size) => {
    const token = await new Promise((res, rej) => {
        crypto.randomBytes(size, (err, buffer) => {
            if (err) {
                rej(err);
            }
            res(buffer.toString("hex"));
        });
    });
    return token;
};
