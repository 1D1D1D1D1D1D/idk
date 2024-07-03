// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';
const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,
};
export default meta;

type Story = StoryObj<typeof Modal>;


export const Light: Story = {}
Light.args = {
    isOpen: true,
    children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat est reiciendis asperiores modi veniam quam voluptates itaque! Autem tempora ad accusamus reiciendis, iusto, consequatur, odio voluptatem consequuntur voluptas sit id."
};

export const Dark: Story = {}
Dark.args = {
    isOpen: true,
    children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat est reiciendis asperiores modi veniam quam voluptates itaque! Autem tempora ad accusamus reiciendis, iusto, consequatur, odio voluptatem consequuntur voluptas sit id."

};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
