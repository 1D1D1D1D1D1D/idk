// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import AppLink, { AppLinkTheme } from './AppLink';
const meta: Meta<typeof AppLink> = {
    title: 'shared/AppLink',
    component: AppLink,
};
export default meta;

type Story = StoryObj<typeof AppLink>;


export const Light: Story = {}
Light.args = {
    children: 'Text',
    theme: AppLinkTheme.PRIMARY
};

export const Dark: Story = {}
Dark.args = {
    children: 'Text',
    theme: AppLinkTheme.SECONDARY
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
