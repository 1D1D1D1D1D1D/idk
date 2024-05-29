
// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';
import {  ThemeButton } from './Button';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {}
Primary.args = {
    children: 'Text',
};
export const Clear: Story = {}
Clear.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR
};

export const Outline: Story = {}
Outline.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE
};
