import crypto from 'crypto';

const SECRET = 'NOBARKUY-REST-API';
export const random = () => crypto.randomBytes(128).toString('hex');
export const authenticate = (password: string, salt: string) => {
    return crypto.createHmac('sha256', [password, salt].join('/')).update(SECRET).digest('hex');
}