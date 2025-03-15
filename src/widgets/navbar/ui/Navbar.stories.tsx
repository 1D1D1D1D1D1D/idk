// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Navbar } from '..';
import AvatarPng from '../../../shared/assets/icons/user-32-32.png';

const meta: Meta<typeof Navbar> = {
    title: 'widget/Navbar',
    component: Navbar,
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Light: Story = {};
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const Dark: Story = {};
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const AuthNavbar: Story = {};
AuthNavbar.args = {};
AuthNavbar.decorators = [StoreDecorator({
    user: { authData: { avatar: AvatarPng } },
})];
