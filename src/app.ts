import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js';
import documentRoutes from './routes/document.route.js';
import { errorHandler, notFound } from './middleware/error-handler.js';
import { generalLimiter } from './middleware/rate-limiter.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'https://collab-docs-alpha.vercel.app',
    credentials: true,
}));

// Compression
app.use(compression());

// Logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use(generalLimiter);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

import commentRoutes from './routes/comments.route.js';
import notificationRoutes from './routes/notification.route.js';

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api', commentRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

export default app;