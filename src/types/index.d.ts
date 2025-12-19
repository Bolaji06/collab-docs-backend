export interface JWTPayload {
    userId: string;
    email: string;
}
export interface AuthResponse {
    user: {
        id: string;
        email: string;
        username: string;
        avatar?: string | null;
    };
    accessToken: string;
    refreshToken: string;
}
export interface SocketUser {
    id: string;
    username: string;
    email: string;
    color: string;
}
export interface PresenceData {
    userId: string;
    documentId: string;
    cursor?: any;
    selection?: any;
    lastSeen: number;
}
//# sourceMappingURL=index.d.ts.map