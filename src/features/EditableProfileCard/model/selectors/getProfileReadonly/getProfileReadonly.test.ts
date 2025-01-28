import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileIsloading', () => {
    test('should return is readonly true', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: true,
            },
        };
        expect(getProfileReadonly(state as StateSchema)).toEqual(true);
    });
    test('should return undef', () => {
        const state: DeepPartial<StateSchema> = { };
        expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
    });
});
