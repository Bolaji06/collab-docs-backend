import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || (process.env.NODE_ENV === 'production' ? 'https://collab-docs-alpha.vercel.app' : 'http://localhost:5173'),
            credentials: true,
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('join-user-room', (userId: string) => {
            console.log(`User ${userId} joined their notification room`);
            socket.join(`user:${userId}`);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};
