import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', (_res, req) => req.send({ message: `Server on ${port} Port` }));
io.on('connection', (socket) => {
  socket.on('geral', (msgs) => {
    socket.broadcast.emit('geral', { messages: msgs.messages });
  });
  socket.on('individual', ({ id, messages }) => {
    socket.broadcast.emit(`individual-${id}`, { messages });
  });
});

server.listen(port, () => console.log('Server On :: %s ::', port));
