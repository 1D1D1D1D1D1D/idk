// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { TubeSpinner } from './TubeSpinner';

const meta: Meta<typeof TubeSpinner> = {
    title: 'shared/TubeSpinner',
    component: TubeSpinner,
};
export default meta;

type Story = StoryObj<typeof TubeSpinner>;

export const Light: Story = {};
Light.args = {

};

export const Dark: Story = {};
Dark.args = {

};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
