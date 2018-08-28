var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var path = require('path')
const dirName = __dirname.substring(0, __dirname.length - 'router/'.length) + '/files/';
var upload = multer({ dest: dirName })

/* GET home page. */
router.get('/files', function (req, res, next) {
  console.log('GET ALL')
  fs.readdir(dirName, (err, files) => {
    console.log(dirName);
    res.send(files.filter(((file, index) => path.extname(file) == '.json')));
  });
});

router.get('/files/:file_name', function (req, res, next) {
  console.log('GET : ' + req.params.file_name)
  const index = fs.readdirSync(dirName).indexOf(req.params.file_name)
  if (index == -1) {
    res.status(404).send({ message: 'file does not exists' });
    return;
  }

  fs.readFile(dirName + req.params.file_name, (err, file) => {
    res.send(file.toString())
  })
  console.log('success !')
});

router.put('/files/:file_name', function (req, res, next) {
  console.log('PUT : ' + req.params.file_name)
  const filePath = dirName + req.params.file_name;
  if (path.extname(req.params.file_name) != '.json') {
    res.status(404).send({ message: 'file name rror : not JSON file' })
    return;
  }
  fs.writeFile(filePath, JSON.stringify(req.body), (err) => {
    if (err)
      res.status(404).send({ message: 'Error Saving file' })
  })
  res.send({ message: 'Successfully saved file to ' + req.params.file_name })
});

router.get('/', (req, res, next) => res.send({ message: 'app works !' }))

router.post('/files', upload.any(), function (req, res, next) {
  console.log('POST files')
  var path = '';
  // No error occured.
  console.log(req.files)
  return res.send("Upload Completed for " + path);
});

module.exports = router;
