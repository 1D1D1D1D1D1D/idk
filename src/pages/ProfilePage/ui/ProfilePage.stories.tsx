// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfilePage } from '..';

const meta: Meta<typeof ProfilePage> = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
};

export default meta;

type Story = StoryObj<typeof ProfilePage>;

export const Primary: Story = {};
Primary.args = {

};
Primary.decorators = [StoreDecorator({
    profile: {
        form: {
            first: 'Макс',
            lastname: 'Огр',
            age: 38,
            country: Country.Russia,
            city: 'Oryol',
            username: 'admin',
            currency: Currency.RUB,
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonMt3t0fOLVhvo_2RYRKsD9hgts80cJWSIQ&s',

        },

    },
})];
