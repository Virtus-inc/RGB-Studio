const Validator = require("fastest-validator");

const v = new Validator();

const schema = { 
  name: {
    type: 'string',
  },
  password: {
    type: 'string',
  },
  $$strict: true,
}

const checker = v.compile(schema);

module.exports = checker;