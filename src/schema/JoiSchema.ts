import * as Joi from "joi";

export const UserRegisterSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .max(30)
    .required(),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .max(30)
    .required(),
  email: Joi.string().email().max(30).required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.ref("password"),
});

export const UserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});
