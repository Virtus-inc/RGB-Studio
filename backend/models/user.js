const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  }, { timestamps: true, versionKey: false }
);

const model = mongoose.model("user", schema);

module.exports = model;