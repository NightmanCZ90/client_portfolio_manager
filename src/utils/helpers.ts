export const capitalizeFirst = (str: string) => {
  if (str.length === 0) return '';
  return str[0].toUpperCase() + str.slice(1);
}

export const generateGreenRedClass = (value: number) => {
  if (value > 0) return 'green';
  if (value < 0) return 'red';
  return '';
}
