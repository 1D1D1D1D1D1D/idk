// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { ProfileCard } from './ProfileCard';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
const meta: Meta<typeof ProfileCard> = {
    title: 'entities/Profile/ProfileCard',
    component: ProfileCard,
};
export default meta;

type Story = StoryObj<typeof ProfileCard>;

export const CardReadonly: Story = {};
CardReadonly.args = {
    readonly: true,
    data: {
        first: 'Макс',
        lastname: 'Огр',
        age: 38,
        country: Country.Russia,
        city: 'Oryol',
        username: 'admin',
        currency: Currency.RUB,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonMt3t0fOLVhvo_2RYRKsD9hgts80cJWSIQ&s'
    }

};

export const Card: Story = {};
Card.args = {
    readonly: false,
    data: {
        first: 'Макс',
        lastname: 'Огр',
        age: 38,
        country: Country.Russia,
        city: 'Oryol',
        username: 'admin',
        currency: Currency.RUB,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonMt3t0fOLVhvo_2RYRKsD9hgts80cJWSIQ&s'
    }

};


export const CardError: Story = {};
CardError.args = {
    error: 'true',
    data: {
        first: 'Макс',
        lastname: 'Огр',
        age: 38,
        country: Country.Russia,
        city: 'Oryol',
        username: 'admin',
        currency: Currency.RUB,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonMt3t0fOLVhvo_2RYRKsD9hgts80cJWSIQ&s'
    }

};


