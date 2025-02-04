import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateError } from './getProfileValidateError';
import { ValidateProfileErrors } from '../../consts/consts';

describe('getProfileForm', () => {
    test('should return form', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateError: [ValidateProfileErrors.INCORRECT_AGE,
                    ValidateProfileErrors.INCORRECT_COUNTRY,
                    ValidateProfileErrors.INCORRECT_DATA,
                    ValidateProfileErrors.NO_DATA,
                    ValidateProfileErrors.SERVER_ERROR,
                    ValidateProfileErrors.INCORRECT_USER_DATA,
                ],

            },
        };
        expect(getProfileValidateError(state as StateSchema)).toEqual([ValidateProfileErrors.INCORRECT_AGE,
            ValidateProfileErrors.INCORRECT_COUNTRY,
            ValidateProfileErrors.INCORRECT_DATA,
            ValidateProfileErrors.NO_DATA,
            ValidateProfileErrors.SERVER_ERROR,
            ValidateProfileErrors.INCORRECT_USER_DATA,
        ]);
    });
    test('should return undef', () => {
        const state: DeepPartial<StateSchema> = { };
        expect(getProfileValidateError(state as StateSchema)).toEqual(undefined);
    });
});
