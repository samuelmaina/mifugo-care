class Responder {
	constructor(res) {
		this.res = res;
	}
	withStatusCode(status) {
		this.status = status;
		return this;
	}
	withMessage(msg) {
		this.msg = msg;
		return this;
	}
	withError(err) {
		this.err = err;
		return this;
	}
	withData(data) {
		this.data = data;
		return this;
	}
	redirect(url) {
		return this.res.redirect(url);
	}
	send() {
		const { msg, err, data, res, status } = this;
		rejectIfIsNullOrUndefined(res, 'res');
		rejectIfIsNullOrUndefined(status, 'status');
		const body = {};
		body.message = msg || null;
		body.error = err || null;
		for (const prop in data) {
			if (data.hasOwnProperty.call(data, prop)) {
				body[prop] = data[prop];
			}
		}
		return res.status(status).json(body);
	}
}
const rejectIfIsNullOrUndefined = (value, field) => {
	if (typeof value === 'undefined' || value === null) {
		throw new Error(`${field} must be there.`);
	}
};

module.exports = Responder;
