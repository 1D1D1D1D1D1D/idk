// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import AboutPage from './AboutPage';
const meta: Meta<typeof AboutPage> = {
    title: 'pages/AboutPage',
    component: AboutPage,
};
export default meta;

type Story = StoryObj<typeof AboutPage>;


export const Light: Story = {}
Light.args = {
    
};

export const Dark: Story = {}
Dark.args = {

};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
