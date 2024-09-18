import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
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
    test('should return form', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,

            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });
    test('should return undef', () => {
        const state: DeepPartial<StateSchema> = { };
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
