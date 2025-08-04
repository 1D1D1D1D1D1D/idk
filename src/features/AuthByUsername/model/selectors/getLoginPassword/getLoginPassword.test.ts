import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
    test('should return login password', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { password: '123' },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('123');
    });
});
