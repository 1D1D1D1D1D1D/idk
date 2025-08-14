import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { validateForm } from './validateForm';
import { ValidateProfileErrors } from '../../consts/consts';

const data = {
    first: 'Макс',
    lastname: 'Огр',
    age: 38,
    country: Country.Russia,
    city: 'Oryol',
    username: 'admin',
    currency: Currency.RUB,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonMt3t0fOLVhvo_2RYRKsD9hgts80cJWSIQ&s',
};
describe('validate profile form', () => {
    test('success', () => {
        const result = validateForm(data);

        expect(result).toEqual([]);
    });
    test('no first', () => {
        const result = validateForm({ ...data, first: '' });

        expect(result).toEqual([ValidateProfileErrors.FIRST_NAME_REQUIRED]);
    });
    test('no last', () => {
        const result = validateForm({ ...data, lastname: '' });

        expect(result).toEqual([ValidateProfileErrors.LAST_NAME_REQUIRED]);
    });
    test('no age', () => {
        const result = validateForm({ ...data, age: 0 });

        expect(result).toEqual([ValidateProfileErrors.AGE_REQUIRED]);
    });
    test('no city', () => {
        const result = validateForm({ ...data, city: '' });

        expect(result).toEqual([ValidateProfileErrors.CITY_REQUIRED]);
    });
    test('no username', () => {
        const result = validateForm({ ...data, username: '' });

        expect(result).toEqual([ValidateProfileErrors.USERNAME_REQUIRED]);
    });

    test('no data', () => {
        const result = validateForm(undefined);

        expect(result).toEqual(
            [
                ValidateProfileErrors.NO_DATA,

            ],
        );
    });
});