"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenManager = void 0;
class RefreshTokenManager {
    constructor() {
        this.refreshTokens = new Set();
    }
    registerRefreshToken(token) {
        this.refreshTokens.add(token);
    }
    invalidateRefreshToken(token) {
        this.refreshTokens.delete(token);
    }
    isRefreshTokenValid(token) {
        return this.refreshTokens.has(token);
    }
}
exports.RefreshTokenManager = RefreshTokenManager;
//# sourceMappingURL=refresh-token-manager.js.map