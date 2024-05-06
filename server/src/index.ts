import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';
import { Server } from 'socket.io';
import { ORIGIN } from './utils/secret';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ORIGIN,
        methods: ['POST', 'GET'],
    },
});

const rooms: Record<string, string[]> = {};

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('create-room', () => {
        const roomId = uuidV4();
        rooms[roomId] = [];
        socket.emit('room-created', { roomId });
    });

    socket.on('join-room', ({ roomId, peerId }) => {
        let isUserExist = rooms[roomId].includes(peerId);
        if (rooms[roomId] && !isUserExist) {
            rooms[roomId].push(peerId);
            console.log('user joined the room', rooms[roomId]);
            socket.join(roomId);
            socket.emit('users', { roomId, participants: rooms[roomId] });
        }
        socket.on('disconnect', () => {
            rooms[roomId] = rooms[roomId].filter((id) => peerId != id);
            console.log('user disconnected', rooms[roomId]);
            socket.to(roomId).emit('user-left', peerId);
        });
    });
});

const PORT = process.env.PORT || 6007;
server.listen(PORT, () =>
    console.log('server is running on http://localhost:' + PORT)
);
