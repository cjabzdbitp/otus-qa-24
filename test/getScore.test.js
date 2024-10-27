import { getScore } from '../src/app.js';

describe('Total scores sum', () => {
  it('should compare total sum', () => {
    const scores = {
      Anna: 10,
      Olga: 1,
      Ivan: 5
    };
    const result = getScore(scores);
    expect(result).toEqual(16);
  });
});
