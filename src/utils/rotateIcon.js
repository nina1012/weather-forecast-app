export const rotateIcon = (direction) => {
  switch (direction) {
    case 'N':
      return '-45deg';
    case 'NNE':
      return '-25deg';
    case 'NE':
      return '0deg';
    case 'ENE':
      return '20deg';
    case 'E':
      return '45deg';
    case 'EES':
      return '65deg';
    case 'SE':
      return '90deg';
    case 'SSE':
      return '115deg';
    case 'S':
      return '135deg';
    case 'SSW':
      return '155deg';
    case 'SW':
      return '180deg';
    case 'WSW':
      return '200deg';
    case 'W':
      return '225deg';
    case 'WNW':
      return '245deg';
    default:
      return '315deg';
  }
};
