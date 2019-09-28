import express from 'express';
import bodyParser from 'body-parser';

import apiRouter from './router';

const port = 3001;

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
}

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(port, () => {
	console.log('listening...');
});
