const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("authHeader: ", authHeader);
    const token = authHeader.split(' ')[1];
    console.log("token: ", token);
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, err => {
        if (err) {
            console.log(err)
            return res.sendStatus(403);
        }
        next();
    })
}


// TODO: turn authenticateUser into middleware using next().
// const authenticateUser = async (req, res) => {
//     const admin = await db.User.find({ username: req.body.username });
//     if (admin.length < 1) {
//         res.status(404).send("Cannot find user.");
//         return false;
//     }
//     const validPassword = await bcrypt.compare(req.body.password, admin[0].password);
//     if (validPassword) {
//         return true;
//     } else {
//         res.status(401).send("Invalid password");
//         return false;
//     }
// }



module.exports = {
    token: authenticateToken
    // user: authenticateUser
}