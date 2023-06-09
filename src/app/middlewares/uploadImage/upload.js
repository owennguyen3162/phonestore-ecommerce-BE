const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads')
  },
  filename: function (req, file, cb) {
    // console.log("kk"+file.originalname);
    cb(null,  file.originalname)
  }
})

const upload = multer({
  storage: storage
})

module.exports = {
  upload
}