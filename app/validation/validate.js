const { validationResult } = require("express-validator");

module.exports = {
  validate(req, res, next) {
    const errors = validationResult(req).formatWith(({ msg }) => msg);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    next();
  },
};
