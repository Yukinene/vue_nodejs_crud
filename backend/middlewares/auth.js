const jwt = require("jsonwebtoken");

function authMiddleware(require,respond,next) {
    //ตรวจ Token
    const authHeader = require.headers.authorizaion;
    if (!authHeader) {
        return respond.status(401).json({
            error: "ไม่มี Token"
        });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(
            token,process.env.JWT_SECRET
        );
        require.user = decoded;
        next();
    } catch (error) {
        respond.status(401).json({
            error: "Token ไม่ถูกต้อง"
        });
    }
}

module.exports = authMiddleware;