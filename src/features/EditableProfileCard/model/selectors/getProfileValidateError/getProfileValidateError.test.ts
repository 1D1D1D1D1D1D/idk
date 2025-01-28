import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileErrors } from '../../types/editableProfileSchema';
import { getProfileValidateError } from './getProfileValidateError';

describe('getProfileForm', () => {
    test('should return form', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateError: [ValidateProfileErrors.INCORRECT_AGE,
                    ValidateProfileErrors.INCORRECT_COUNTRY,
                    ValidateProfileErrors.INCORRECT_DATA,
                    ValidateProfileErrors.NO_DATA,
                    ValidateProfileErrors.SERVER_ERROR,
                ],

            },
        };
        expect(getProfileValidateError(state as StateSchema)).toEqual([ValidateProfileErrors.INCORRECT_AGE,
            ValidateProfileErrors.INCORRECT_COUNTRY,
            ValidateProfileErrors.INCORRECT_DATA,
            ValidateProfileErrors.NO_DATA,
            ValidateProfileErrors.SERVER_ERROR,
        ]);
    });
    test('should return undef', () => {
        const state: DeepPartial<StateSchema> = { };
        expect(getProfileValidateError(state as StateSchema)).toEqual(undefined);
    });
});
