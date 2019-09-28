import { Router } from 'express';

const store = {
	data: {},
	getData: id => store.data[id] || [],
	addData: (id, data) => {
		if (!store.data[id]) {
			store.data[id] = [];
		}
		store.data[id].push(data);
	}
};

const router = Router();

router.get('/chat/:id', (req, res) => {
	const id = req.params.id;
	const chat = store.getData(id);

	res.send(chat);
});

router.post('/chat/:id', (req, res) => {
	const id = req.params.id;
	const payload = req.body;
	store.addData(id, payload);
	const chat = store.getData(id);
	res.send(chat);
});

export default router;
