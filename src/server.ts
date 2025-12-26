import app from './app.js';
import { createServer } from 'http';
import { YSocketIO } from 'y-socket.io/dist/server';
import { initSocket } from './sockets/io.js';

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

// Initialize Socket.io
const io = initSocket(httpServer);

// Initialize Y-Socket.IO
const ysocketio = new YSocketIO(io, {
  // Optional: Authenticate using existing middleware logic if needed
});

// Initialize the provider
ysocketio.initialize();

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