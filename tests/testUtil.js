exports.ensureIdsAreEqual = (actual, expected) => {
	ensureComparable([actual, expected]);
	expect(actual.toString()).toBe(expected.toString());
};
//had to do this since mongoese arrays can not be
//verfied by by the .toEqual matcher.
exports.ensureArraysAreEqual = (actual, expected) => {
	ensureComparable([actual, expected]);
	actual.forEach((element, index) => {
		this.ensureEqual(element, expected[index]);
	});
};

exports.ensureIsTruthy = value => {
	expect(value).toBeTruthy();
};

exports.ensureIsFalsy = value => {
	ensureComparable([value]);
	expect(value).toBeFalsy();
};
exports.ensureNull = value => {
	expect(value).toBeNull();
};
exports.ensureNotNull = value => {
	expect(value).not.toBeNull();
};

exports.ensureObjectHasKeyValuePair = (object, key, value) => {
	ensureComparable([object, key, value]);
	expect(object).toHaveProperty(key, value);
};
exports.ensureObjectHasProp = (object, prop) => {
	ensureComparable([object, prop]);
	expect(object).toHaveProperty(prop);
};

exports.ensureValueGreaterThanOrEqual = (value, expected) => {
	ensureComparable([value, expected]);
	expect(value).toBeGreaterThanOrEqual(expected);
};
exports.ensureValueLessThan = (value, expected) => {
	ensureComparable([value, expected]);
	expect(value).toBeLessThan(expected);
};

exports.ensureArrayHasElement = (arr, elem) => {
	ensureComparable([arr, elem]);
	expect(arr).toContain(elem);
};
exports.ensureEqual = (actual, expected) => {
	ensureComparable([actual, expected]);
	expect(actual).toBe(expected);
};
exports.ensureObjectsAreEqual = (actual, expected) => {
	ensureComparable([actual, expected]);
	expect(actual).toEqual(expected);
};
exports.ensureObjectsHaveSameValuesForProps = (props, actual, expected) => {
	ensureComparable([props, actual, expected]);
	for (const prop of props) {
		this.ensureEqual(actual[prop], expected[prop]);
	}
};

function ensureComparable(args) {
	for (const arg of args)
		if (isUndefinedOrNull(arg))
			throw new Error('Trying to test nullish values.');
}

function isUndefinedOrNull(value) {
	return typeof value === 'undefined' || value === null;
}
