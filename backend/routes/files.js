const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();
const { loginRequired } = require('../controllers/auth');
const { uploadFile } = require('../controllers/file');

router.post('/files', loginRequired, upload.single('file'), uploadFile);

module.exports = router;