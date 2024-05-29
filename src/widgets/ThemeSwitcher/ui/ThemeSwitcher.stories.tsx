// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import  {ThemeSwitcher}  from './ThemeSwitcher';
const meta: Meta<typeof ThemeSwitcher> = {
    title: 'widget/ThemeSwitcher',
    component: ThemeSwitcher,
};
export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;


export const Light: Story = {}
Light.args = {
    
};

export const Dark: Story = {}
Dark.args = {

};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
