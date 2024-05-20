const express = require('express');
const File = require('../models/file');

exports.file = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = req.file;

    if (!data) {
      return res.status(400).send('No file uploaded.');
    }

    const file = await File.create({ data: data.buffer, ownerId: userId, contentType: data.mimetype });

    if (!file) {
      return res.status(404).send('File not found.');
    }

    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    res.status(500).send('An error occurred: ' + error.message);
  }
};
