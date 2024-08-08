import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'features/LoginForm',
    component: LoginForm,
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Primary: Story = {};

Primary.args = {

};
Primary.decorators = [StoreDecorator({ loginForm: { username: 'dssd', password: 'sadsd' } })];

export const WithError: Story = {};
WithError.args = {
};
WithError.decorators = [StoreDecorator({ loginForm: { username: 'фыва', password: 'выап', error: 'Неверный логин или пароль' } })];

export const Loading: Story = {};
Loading.args = {
};
Loading.decorators = [StoreDecorator({ loginForm: { isLoading: true } })];
