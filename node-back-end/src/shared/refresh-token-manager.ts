export class RefreshTokenManager implements IRefreshTokenManager {
    private readonly refreshTokens: Set<string> = new Set<string>();

    public registerRefreshToken(token: string): void {
        this.refreshTokens.add(token);
    }

    public invalidateRefreshToken(token: string): void {
        this.refreshTokens.delete(token);
    }

    public isRefreshTokenValid(token: string): boolean {
        return this.refreshTokens.has(token);
    }
}

export interface IRefreshTokenManager {
    registerRefreshToken(token: string): void;

    invalidateRefreshToken(token: string): void;

    isRefreshTokenValid(token: string): boolean;
}
