const multer = require('multer');

function multerSetting(filefield, fileDestination, fileFilter) {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, fileDestination);
		},
		filename: (req, file, cb) => {
			// generate random numbers to make file names unique
			cb(null, Math.random() + '-' + file.originalname);
		},
	});
	const multerSettings = { storage, fileFilter };
	return multer(multerSettings);
}

module.exports = multerSetting;
