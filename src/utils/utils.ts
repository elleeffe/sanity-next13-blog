export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('it-IT', {dateStyle: 'long'});
