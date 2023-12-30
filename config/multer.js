const multer= require('multer')
const path = require('path')



module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // The "uploads" folder where the items will be stored
      cb(null, 'public/passportImages');
    },
    filename: function (req, file, cb) {
      // Generate a random string using the current timestamp
      const timestamp = Date.now();
      // Extract the file extension from the original filename
      const ext = path.extname(file.originalname);
      // Create the final filename by concatenating the random timestamp string and the original extension
      const finalFilename = `${timestamp}${ext}`;
      cb(null, finalFilename);
    },
  }),

  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext.toLocaleLowerCase() !== '.jpeg' && ext.toLocaleLowerCase() !== '.jpg' && ext.toLocaleLowerCase() !== '.png') {
      cb(new Error('The file is not supported'), false);
      return;
    }
    cb(null, true);
  },
});
