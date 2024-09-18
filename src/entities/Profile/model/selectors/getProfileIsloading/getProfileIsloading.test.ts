import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { getProfileIsloading } from 'entities/Profile';

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
