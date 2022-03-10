const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/db.json')
const middlewares = jsonServer.defaults()
const cors = require('cors');

const PORT = process.env.PORT || 4000;

server.use(cors());
server.options('*', cors());

server.use('/api', router);
server.use(middlewares);

server.use(router)
server.listen(PORT, () => {
    console.log('JSON Server is running on port', PORT);
})