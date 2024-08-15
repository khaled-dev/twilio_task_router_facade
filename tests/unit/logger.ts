import Logger from '../../src/config/logger';

describe('Logger', () => {
    it('should log info messages correctly', () => {
        const message = 'This is an info message';
        Logger.info(message);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[INFO]'), expect.any(String));
    });

    it('should log warning messages correctly', () => {
        const message = 'This is a warning message';
        Logger.warning(message);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[WARN]'), expect.any(String));
    });

    it('should log error messages correctly', () => {
        const message = 'This is an error message';
        Logger.error(message);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'), expect.any(String));
    });
});