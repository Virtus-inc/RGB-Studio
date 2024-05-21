const PDFParser = require("pdf-parse");
const File = require('../models/file');

exports.uploadFile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const data = req.file;

    if (!data) {
      return res.status(400).send('No file uploaded.');
    }

    const pdfData = await PDFParser(data.buffer);

    const file = await File.create({
      name: data.originalname,
      pages: pdfData.numpages,
      size: data.size,
      data: data.buffer,
      ownerId: userId,
      contentType: data.mimetype
    });

    if (!file) {
      return res.status(404).send('File not found.');
    }

    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    res.status(500).send('An error occurred: ' + error.message);
  }
};
