import { screen } from '@testing-library/dom';
import message from '../message';

describe('Message', () => {
    /**
     * @jest-environment jsdom
     */
    test('Test message success render', () => {
        const text = 'success message';
        message.success(text);
        expect(screen.queryByText(text)?.innerHTML).toBe(text);
    });
    /**
     * @jest-environment jsdom
     */
    test('Test message error render', () => {
        const text = 'error message';
        message.error(text);
        expect(screen.queryByText(text)?.innerHTML).toBe(text);
    });
    /**
     * @jest-environment jsdom
     */
    test('Test message loading render', () => {
        const text = 'loading message';
        message.loading(text);
        expect(screen.queryByText(text)?.innerHTML).toBe(text);
    });
    /**
     * @jest-environment jsdom
     */
    test('Test message warn render', () => {
        const text = 'warn message';
        message.warn(text);
        expect(screen.queryByText(text)?.innerHTML).toBe(text);
    });
    /**
     * @jest-environment jsdom
     */
    test('Test message info render', () => {
        const text = 'info message';
        message.info(text);
        expect(screen.queryByText(text)?.innerHTML).toBe(text);
    });
    /**
     * @jest-environment jsdom
     */
    test('Test promise', async () => {
        const text = 'promise message';
        const el = await message.info(text, 0.2);
        expect(el.querySelector('span')?.innerHTML).toBe(text);
    });
    test('Test destroy message', () => {
        jest.useFakeTimers();
        const key = 'destroy_key';
        const text = 'destroy message';
        message.success(text, 0, {
            key,
        });
        setTimeout(() => {
            message.destroy(key);
        }, 500);
        setTimeout(() => {
            expect(screen.queryByText(text)).toBeNull();
        }, 1000);
        jest.runAllTimers();
    });
});
