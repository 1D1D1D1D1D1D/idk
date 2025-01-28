/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios from 'axios';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updateProfileData } from './updateProfileData';

jest.mock('axios');
// @ts-ignore
const mockedAxios = jest.mocked(axios, true);
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
describe('updateProfileData', () => {
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });
    test('success ', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error login', async () => {
        const thunk = new TestAsyncThunk(updateProfileData);
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
