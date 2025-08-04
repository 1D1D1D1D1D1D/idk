import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
    test('should return login error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { error: 'Error' },
        };
        expect(getLoginError(state as StateSchema)).toEqual('Error');
    });
});
