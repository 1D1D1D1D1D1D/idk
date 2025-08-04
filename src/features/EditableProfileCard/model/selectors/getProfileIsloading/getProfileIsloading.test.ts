import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileIsloading } from './getProfileIsloading';

describe('getProfileIsloading', () => {
    test('should return is loading true', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true,
            },
        };
        expect(getProfileIsloading(state as StateSchema)).toEqual(true);
    });
    test('should return undef', () => {
        const state: DeepPartial<StateSchema> = { };
        expect(getProfileIsloading(state as StateSchema)).toEqual(undefined);
    });
});
