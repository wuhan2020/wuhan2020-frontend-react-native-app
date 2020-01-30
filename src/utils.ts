import authenticator from 'otplib/authenticator';
import crypto from './crypto';
import moment from 'moment';

authenticator.options = { crypto };

export const getToken = (secret: string) => authenticator.generate(secret);

export const formatDate = (date: string) =>
  moment(date).format('YYYY-MM-DD hh:mm:ss');

export const formatTime = (date: string) => moment(date).format('hh:mm:ss');
