// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { PageLoader } from './PageLoader';
const meta: Meta<typeof PageLoader> = {
    title: 'widget/PageLoader',
    component: PageLoader,
};
export default meta;

type Story = StoryObj<typeof PageLoader>;


export const Light: Story = {}
Light.args = {
    
};

export const Dark: Story = {}
Dark.args = {

};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
