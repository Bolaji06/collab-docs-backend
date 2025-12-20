import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Document: "Document";
    readonly DocumentPermission: "DocumentPermission";
    readonly DocumentVersion: "DocumentVersion";
    readonly DocumentDelta: "DocumentDelta";
    readonly Comment: "Comment";
    readonly CommentReply: "CommentReply";
    readonly Notification: "Notification";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly username: "username";
    readonly password: "password";
    readonly avatar: "avatar";
    readonly googleId: "googleId";
    readonly isVerified: "isVerified";
    readonly otp: "otp";
    readonly otpExpiresAt: "otpExpiresAt";
    readonly resetToken: "resetToken";
    readonly resetTokenExpiry: "resetTokenExpiry";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const DocumentScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly content: "content";
    readonly ownerId: "ownerId";
    readonly isPublic: "isPublic";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum];
export declare const DocumentPermissionScalarFieldEnum: {
    readonly id: "id";
    readonly documentId: "documentId";
    readonly userId: "userId";
    readonly role: "role";
    readonly grantedAt: "grantedAt";
};
export type DocumentPermissionScalarFieldEnum = (typeof DocumentPermissionScalarFieldEnum)[keyof typeof DocumentPermissionScalarFieldEnum];
export declare const DocumentVersionScalarFieldEnum: {
    readonly id: "id";
    readonly documentId: "documentId";
    readonly content: "content";
    readonly versionNumber: "versionNumber";
    readonly createdBy: "createdBy";
    readonly createdAt: "createdAt";
};
export type DocumentVersionScalarFieldEnum = (typeof DocumentVersionScalarFieldEnum)[keyof typeof DocumentVersionScalarFieldEnum];
export declare const DocumentDeltaScalarFieldEnum: {
    readonly id: "id";
    readonly documentId: "documentId";
    readonly userId: "userId";
    readonly operations: "operations";
    readonly version: "version";
    readonly timestamp: "timestamp";
};
export type DocumentDeltaScalarFieldEnum = (typeof DocumentDeltaScalarFieldEnum)[keyof typeof DocumentDeltaScalarFieldEnum];
export declare const CommentScalarFieldEnum: {
    readonly id: "id";
    readonly documentId: "documentId";
    readonly userId: "userId";
    readonly content: "content";
    readonly positionStart: "positionStart";
    readonly positionEnd: "positionEnd";
    readonly resolved: "resolved";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum];
export declare const CommentReplyScalarFieldEnum: {
    readonly id: "id";
    readonly commentId: "commentId";
    readonly userId: "userId";
    readonly content: "content";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommentReplyScalarFieldEnum = (typeof CommentReplyScalarFieldEnum)[keyof typeof CommentReplyScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly title: "title";
    readonly message: "message";
    readonly documentId: "documentId";
    readonly isRead: "isRead";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: "JsonNull";
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
    readonly AnyNull: "AnyNull";
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map