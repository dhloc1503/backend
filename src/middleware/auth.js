import { expressjwt } from "express-jwt";

console.log('process.env.JWT_SECRET : ', process.env.JWT_SECRET)

const getTokenFromHeaders = (req) => {

  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    let token = authorization.split(" ")[1];
    req.token = token;
    return token;
  }
  return null;
};

const isRevokedCallbackUser = async function (req, payload, done) {
  req.user = payload;
  return;
};

const auth = {
  user: expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    isRevoked: isRevokedCallbackUser,
    algorithms: ["HS256"],
    // credentialsRequired: false,
  }),
};
export default auth;
