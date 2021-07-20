const { MONGO_URI, PORT } = require('./config/env');

const { connector } = require('./models/utils');

const app = require('./app');
console.log('THis is the Uri', MONGO_URI);
connector(MONGO_URI)
	.then(() => {
		app.listen(PORT);
	})
	.catch(e => {
		throw new Error(e);
	});
