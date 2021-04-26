module.exports = (app, middlewares) => {
	for (const mw in middlewares) {
		middlewares[mw](app);
	}
};
