function auth(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];
    console.log("🚀 ~ auth ~ token: ", token)

    try {
        const decoded = require('jsonwebtoken').verify(
            token,
           "mySecretKey"
        );

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            message: err.message
        });
    }
}module.exports = auth;