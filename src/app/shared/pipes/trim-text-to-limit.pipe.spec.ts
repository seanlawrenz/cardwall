import { TrimTextToLimitPipe } from './trim-text-to-limit.pipe';

describe('TrimTextToLimitPipe', () => {
  let pipe: TrimTextToLimitPipe;

  beforeEach(() => (pipe = new TrimTextToLimitPipe()));

  it('does not trim text that does not need to be trimmed', () => {
    expect(pipe.transform('test', 20)).toBe('test');
  });

  it('trims to the limit', () => {
    expect(pipe.transform('a very long title that goes on forever', 15)).toBe('a very long...');
  });
});
