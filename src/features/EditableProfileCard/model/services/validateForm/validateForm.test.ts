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
    test('no first or lastname', () => {
        const result = validateForm({ ...data, first: '', lastname: '' });

        expect(result).toEqual([ValidateProfileErrors.INCORRECT_DATA]);
    });
    test('no age', () => {
        const result = validateForm({ ...data, age: 0 });

        expect(result).toEqual([ValidateProfileErrors.INCORRECT_AGE]);
    });
    test('no country', () => {
        const result = validateForm({ ...data, country: undefined });

        expect(result).toEqual([ValidateProfileErrors.INCORRECT_COUNTRY]);
    });

    test('no data', () => {
        const result = validateForm({ });

        expect(result).toEqual(
            [
                ValidateProfileErrors.INCORRECT_DATA,
                ValidateProfileErrors.INCORRECT_AGE,
                ValidateProfileErrors.INCORRECT_COUNTRY,

            ],
        );
    });
});
