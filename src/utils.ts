import authenticator from 'otplib/authenticator';
import crypto from './crypto';

authenticator.options = { crypto };

export const getToken = (secret: string) => authenticator.generate(secret);
