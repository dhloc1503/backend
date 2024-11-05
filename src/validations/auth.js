import Joi from "joi";

const register = Joi.object({
  email: Joi.string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  fullname: Joi.string()
    .min(6)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
}).required();

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .required(),
  remember: Joi.boolean().allow(false),
}).required();

const validate_change_password = Joi.object({
  oldPassword: Joi.string().min(6)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
}).required();

export {
  register,
  login,
  validate_change_password
};
