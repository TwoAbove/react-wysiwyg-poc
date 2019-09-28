import express from 'express';
import bodyParser from 'body-parser';

import apiRouter from './router';

const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(port, () => {
	console.log('listening...');
});
