const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();
const { file } = require('../controllers/file');

router.post('/files', upload.single('file'), file);

module.exports = router;