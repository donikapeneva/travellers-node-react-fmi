import {Request, Response} from 'express';
import {TokenUtility} from './token-utility';

export class AuthenticationMiddleware {
    public static verifyToken(req: Request, res: Response, next: any) {
        const authorizationHeaderValue = req.headers['authorization'];

        if (!authorizationHeaderValue) {
            return res
                .status(403)
                .send({auth: false, message: 'No token provided.'});
        }

        const token = authorizationHeaderValue
            .toString()
            .replace('Bearer', '')
            .trim();

        if (!token) {
            return res
                .status(403)
                .send({auth: false, message: 'No token provided.'});
        }

        const verificationHandler = (err: any, decoded: any) => {
            if (err) {
                return res
                    .status(500)
                    .send({auth: false, message: 'Failed to authenticate token.'});
            }

            // if everything good, save to request for use in other routes
            (req as any).userId = decoded.id;

            next();
        };

        TokenUtility.verifyToken(token, verificationHandler);
    }
}
