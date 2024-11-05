import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateToken = (member = false, user) => {
    let expiresIn = "2d";
  if (member) expiresIn = "365d";

  const payload = {
    username: user.username,
    role: user.role
  };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn, algorithm: "HS256" };
  const token = jwt.sign(payload, secret, options);
  return token;
}

const generaetSaltHash = (key) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(key, salt, 10000, 512, "sha512")
      .toString("hex");

    return { salt,  hash}
};

const validateKey = (key, hash, salt) => {
    const newHash = crypto
      .pbkdf2Sync(key, salt, 10000, 512, "sha512")
      .toString("hex");
    return newHash === hash;
};

const generateHash = (key, salt) => {
    return crypto
      .pbkdf2Sync(key, salt, 10000, 512, "sha512")
      .toString("hex");
};

export {
    generateToken,
    generaetSaltHash,
    validateKey,
    generateHash
}