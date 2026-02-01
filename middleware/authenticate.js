const { verifyToken } = require("../controllers/tokens");
const authenticate = (req, res, next) => {
  const token = req.cookies?.uuid;

  if (!token) {
    return res.status(401).redirect("/user/login");
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).redirect("/user/login");
  }
};
module.exports = authenticate;
