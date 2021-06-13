const multerConf = require('./multerBase');

const fileDestination = 'Data/Images';
const field = 'image';
const filter = (req, file, cb) => {
	const type = file.mimetype;
	isImage(type) ? cb(null, true) : cb(null, false);
};

const isImage = type => {
	return type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg';
};

module.exports = multerConf(field, fileDestination, filter).array('images', 10);
