const {
	ensureEqual,
	ensureObjectHasKeyValuePair,
	ensureObjectHasProp,
} = require('../testUtil');

exports.ensureResHasStatusCodeAndFieldData = (res, statusCode, key, value) => {
	ensureEqual(res.status, statusCode);
	ensureObjectHasKeyValuePair(res.body, key, value);
};

exports.ensureResHasStatusCodeAndProp = (res, statusCode, prop) => {
	ensureEqual(res.status, statusCode);
	ensureObjectHasProp(res.body, prop);
};
