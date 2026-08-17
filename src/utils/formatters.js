export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return '0 ₴';
  }
  return price.toLocaleString('uk-UA') + ' ₴';
};
