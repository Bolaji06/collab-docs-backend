import app from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { YSocketIO } from 'y-socket.io/dist/server';
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
// Initialize Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || 'https://collab-docs-alpha.vercel.app',
        credentials: true,
        methods: ['GET', 'POST']
    }
});
// Initialize Y-Socket.IO
const ysocketio = new YSocketIO(io, {
// Optional: Authenticate using existing middleware logic if needed
// For now we trust the socket connection as it's protected by CORS
});
// Initialize the provider
ysocketio.initialize();
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📡 Socket.io server ready`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    httpServer.close(() => {
        console.log('HTTP server closed');
    });
});
//# sourceMappingURL=server.js.map