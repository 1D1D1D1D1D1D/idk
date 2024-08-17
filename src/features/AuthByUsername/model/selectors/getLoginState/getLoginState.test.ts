import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { getLoginState } from './getLoginState';

describe('getLoginUsername', () => {
    test('should return login state', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { username: 'user', password: '123' },
        };
        expect(getLoginState(state as StateSchema)).toEqual({ username: 'user', password: '123' });
    });
    test('', () => {
    });
});
