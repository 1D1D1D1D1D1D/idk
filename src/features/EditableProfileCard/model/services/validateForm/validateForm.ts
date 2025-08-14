import { Profile } from 'entities/Profile';
import { ValidateProfileErrors } from '../../consts/consts';

export const validateForm = (profile?: Profile) => {
    const errors: ValidateProfileErrors[] = [];

    if (!profile) {
        errors.push(ValidateProfileErrors.NO_DATA);
        return errors;
    }

    const { first, lastname, age, city, username } = profile;

    if (!first || first.trim() === '') {
        errors.push(ValidateProfileErrors.FIRST_NAME_REQUIRED);
    }

    if (!lastname || lastname.trim() === '') {
        errors.push(ValidateProfileErrors.LAST_NAME_REQUIRED);
    }

    if (!age || age === 0) {
        errors.push(ValidateProfileErrors.AGE_REQUIRED);
    }

    if (!city || city.trim() === '') {
        errors.push(ValidateProfileErrors.CITY_REQUIRED);
    }

    if (!username || username.trim() === '') {
        errors.push(ValidateProfileErrors.USERNAME_REQUIRED);
    }

    return errors;
};