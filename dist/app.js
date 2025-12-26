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
const allowedOrigins = [
    'https://collab-docs-alpha.vercel.app',
    'http://localhost:5173'
];
app.use(cors({
    origin: (origin, callback) => {
        // If CLIENT_URL is set, prioritize it
        if (process.env.CLIENT_URL) {
            return callback(null, process.env.CLIENT_URL);
        }
        // In development, allow localhost even if not in allowedOrigins (though it is)
        if (process.env.NODE_ENV !== 'production' || !origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
import folderRoutes from './routes/folder.route.js';
import tagRoutes from './routes/tag.route.js';
import activityRoutes from './routes/activity.route.js';
import versionRoutes from './routes/version.route.js';
import workspaceRoutes from './routes/workspace.route.js';
import aiRoutes from './routes/ai.route.js';
// API routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/versions', versionRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/ai', aiRoutes);
// 404 handler
app.use(notFound);
// Error handler (must be last)
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map