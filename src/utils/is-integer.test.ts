import { isInteger } from './is-inteeger';

describe('when given something that is not an integer number', () => {
  test('should return false', () => {
    expect(isInteger('test' as unknown as number)).toEqual(false);
    expect(isInteger(12.45)).toEqual(false);
  });
});
describe('when given an integer number', () => {
  test('should return true', () => {
    expect(isInteger(21)).toEqual(true);
  });
});
