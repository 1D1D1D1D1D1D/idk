// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { ProfilePageHeader } from './ProfilePageHeader';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
const meta: Meta<typeof ProfilePageHeader> = {
    title: 'pages/ProfilePage/ProfilePageHeader',
    component: ProfilePageHeader,
};
export default meta;

type Story = StoryObj<typeof ProfilePageHeader>;

export const HeaderReadonly: Story = {};
HeaderReadonly.args = {

};
HeaderReadonly.decorators = [StoreDecorator({ profile: { readonly: true } })]


export const HeaderEdit: Story = {};
HeaderEdit.args = {

};
HeaderEdit.decorators = [StoreDecorator({ profile: { readonly: false } })]
