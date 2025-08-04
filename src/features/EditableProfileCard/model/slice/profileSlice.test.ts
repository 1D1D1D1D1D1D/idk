import { DeepPartial } from 'shared/lib/DeepPartialObject/DeepPartialObject';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { Profile } from 'entities/Profile';
import { ProfileSchema } from '../../../EditableProfileCard';
import { profileActions, profileReducer } from './profileSlice';

import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ValidateProfileErrors } from '../consts/consts';

describe('test profile slice', () => {
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
    test('set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { };
        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true });
    });
    test('set cancel edit ', () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({
            readonly: true, validateError: undefined, data, form: data,
        });
    });
    test('set update data ', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };
        expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ username: '123456' }))).toEqual({ form: { username: '123456' } });
    });
    test('updateProfileData pending ', () => {
        const state: DeepPartial<ProfileSchema> = { isLoading: false, validateError: [ValidateProfileErrors.INCORRECT_DATA] };
        const action = updateProfileData.pending({} as any);
        expect(profileReducer(state as ProfileSchema, action)).toEqual({ isLoading: true, valudateErrors: undefined });
    });
    test('updateProfileData fulfilled ', () => {
        const state: DeepPartial<ProfileSchema> = { isLoading: false, validateError: [ValidateProfileErrors.INCORRECT_DATA] };

        const testData = data as Profile; // Замените на реальные данные

        const action = updateProfileData.fulfilled(testData, 'testRequestId', undefined); // Создание действия fulfilled
        expect(profileReducer(state as ProfileSchema, action)).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            validateError: undefined,
            form: data,
            data,
        });
    });
});
