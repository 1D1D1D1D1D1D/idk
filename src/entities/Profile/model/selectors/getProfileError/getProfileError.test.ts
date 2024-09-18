import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { getProfileError } from './getProfileError';

describe('getProfileForm', () => {
    test('should return form', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'error',
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual('error');
    });
    test('should return undef', () => {
        const state: DeepPartial<StateSchema> = { };
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
