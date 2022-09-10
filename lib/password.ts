import crypto from 'crypto';
import { IUser } from '../models/user';

export function decryptPassword(user: IUser, inputPassword: string) {
    const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
    return user.hash === inputHash;
}
export function encryptPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { hash, salt };
}