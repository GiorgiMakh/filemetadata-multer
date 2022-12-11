var express = require('express');
var cors = require('cors');
const path = require('path');
const multer = require("multer");
const DIR = './public/';
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, DIR)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
	cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

app.post('/api/fileanalyse', upload.single('upfile'), async(req, res, next)=> {
  console.log(req.file)
  res.send({
    name:req.file.originalname,
    type:req.file.mimetype,
    size:req.file.size
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
