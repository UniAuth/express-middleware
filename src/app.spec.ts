import { Config } from './interface/config.interface';
import UniAuth from './app';

const configs: Array<Config> = [];
const obj = new UniAuth(configs);
describe('app export', () => {
  it('should not be undefined', () => {
    expect(obj.authenticate).not.toBeUndefined();
  });

  it('should not be null', () => {
    expect(obj.authenticate).not.toBeNull();
  });

  it('should be a function', () => {
    expect(typeof obj.authenticate).toBe('function');
  });

  it('should not be undefined', () => {
    expect(obj.callback).not.toBeUndefined();
  });

  it('should not be null', () => {
    expect(obj.callback).not.toBeNull();
  });

  it('should be a function', () => {
    expect(typeof obj.callback).toBe('function');
  });
});
