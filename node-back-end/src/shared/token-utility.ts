import * as jsonwebtoken from 'jsonwebtoken';
import {VerifyCallback} from 'jsonwebtoken';

export class TokenUtility {
    private static readonly TOKEN_SECRET: string = 'donySecret';
    private static readonly REFRESH_TOKEN_SECRET: string = 'donySecretRefresh';

    // 1 hours
    private static readonly EXPIRATION_TOKEN_TIME_IN_SECONDS: number = 3600;
    // 24 hours
    private static readonly EXPIRATION_REFRESH_TOKEN_TIME_IN_SECONDS: number = 86400;

    public static generateToken(userId: string): string {
        const token = jsonwebtoken.sign({id: userId}, TokenUtility.TOKEN_SECRET, {
            expiresIn: TokenUtility.EXPIRATION_TOKEN_TIME_IN_SECONDS,
        });

        return token;
    }

    public static verifyToken(token: string, callback: VerifyCallback): void {
        jsonwebtoken.verify(token as any, TokenUtility.TOKEN_SECRET, callback);
    }

    public static verifyRefreshToken(
        refreshToken: string,
        callback: VerifyCallback
    ): void {
        jsonwebtoken.verify(
            refreshToken as any,
            TokenUtility.REFRESH_TOKEN_SECRET,
            callback
        );
    }

    public static generateRefreshToken(userId: string): string {
        const token = jsonwebtoken.sign(
            {id: userId},
            TokenUtility.REFRESH_TOKEN_SECRET,
            {
                expiresIn: TokenUtility.EXPIRATION_REFRESH_TOKEN_TIME_IN_SECONDS,
            }
        );

        return token;
    }
}
