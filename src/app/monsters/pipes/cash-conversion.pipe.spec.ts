import { CashConversionPipe } from './cash-conversion.pipe';

describe('CashConversionPipe', () => {
  it('create an instance', () => {
    const pipe = new CashConversionPipe();
    expect(pipe).toBeTruthy();
  });
});
