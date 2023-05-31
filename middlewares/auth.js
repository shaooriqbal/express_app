const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = await jwt.verify(token, 'thisissecretkey');
            req.userId = user.id;
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorized User'
            });

        }
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized User'
        });
    }
};
module.exports = auth;