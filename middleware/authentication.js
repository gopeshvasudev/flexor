import jwt from "jsonwebtoken";

function userAuthentication(req, res, next) {
  const token = req.cookies["token"];
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  }
  else {
    return res.redirect("/admin");
  }
}

export default userAuthentication;
