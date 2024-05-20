const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pages: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      data: Buffer,
      contentType: String
    },
    ownerId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  }, { timestamps: true, versionKey: false }
);

const model = mongoose.model("file", schema);

module.exports = model;