const Joi = require("joi");

module.exports.registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(30).required(),
  name: Joi.string().min(2).required(),
  password: Joi.string().min(6).required(),
  'password-c': Joi.ref('password')
});

module.exports.reportSchema = Joi.object({
  report: Joi.object({
    age: Joi.number().min(0).required(),
    sex: Joi.string().valid("Male", "Female").required(),
    BMI: Joi.number().min(0).required(),
    smokingStatus: Joi.string().valid("Yes", "No", "Unknown").required()
  }).required()
});
