/**
 * this function determines if the input is actually a number
 * @param number
 * @returns
 */
export const isInteger = (number: number): boolean => {
  return !(typeof number !== 'number' || number % 1);
};
