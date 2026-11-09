
const multer = require("multer");


const upload = multer({

    // Store uploaded files in memory as Buffer objects
    storage: multer.memoryStorage(),

    // Maximum file size: 3 MB
    limits: {
        fileSize: 3 * 1024 * 1024
    },

    // Allow only PDF files
    fileFilter: (req, file, cb) => {

        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed"));
        }

        cb(null, true);
    }

});


module.exports = upload;
