import moment from 'moment';

export const formatDate = (date: string) =>
  moment(date).format('YYYY-MM-DD hh:mm:ss');

export const formatTime = (date: string) => moment(date).format('hh:mm:ss');

export function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
