export const formatDate = (str = 'Fri. 5 Jun') => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const strArr = str.split('-');
  const [year, month, day] = strArr;

  // if month is between 1 and 9, remove the 0 at the beginning
  if (month?.charAt(0) === '0') {
    return `${day}. ${months[+month.replace('0', '') - 1]}`;
  }
  return `${day}. ${months[+month - 1]}`;
};

export const formatValue = (temp) => {
  return Math.floor(temp);
};
