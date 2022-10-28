const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(5).max(15).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      next({ status: 400, message: error.details[0].message });
    }

    next();
  },
  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().min(5).max(15).optional(),
    }).min(1);

    const { error } = schema.validate(req.body);
    if (error) {
      next({ status: 400, message: error.details[0].message });
    }

    next();
  },
};
