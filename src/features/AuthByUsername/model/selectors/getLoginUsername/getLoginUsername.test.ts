import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginState', () => {
    test('should return login username', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { username: 'user' },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('user');
    });
});
