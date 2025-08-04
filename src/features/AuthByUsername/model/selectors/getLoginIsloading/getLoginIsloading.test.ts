import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { getLoginIsloading } from './getLoginIsloading';

describe('getLoginIsLoading', () => {
    test('should return login isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { isLoading: true },
        };
        expect(getLoginIsloading(state as StateSchema)).toEqual(true);
    });
    test('should return login isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { },
        };
        expect(getLoginIsloading(state as StateSchema)).toEqual(false);
    });
});
