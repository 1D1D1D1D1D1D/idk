// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
    title: 'shared/Select',
    component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Primary: Story = {};
Primary.args = {
    label: 'Label',
    value: 'Russia',
    options: [
        { value: 'Russia', content: 'Russia' },
        { value: 'Sweden', content: 'Sweden' },
        { value: 'Thailand', content: 'Thailand' },
        { value: 'Vietnam', content: 'Vietnam' },

    ],

};

export const Readonly: Story = {};
Readonly.args = {
    label: 'Label',
    value: 'Russia',
    readonly: true,
    options: [
        { value: 'Russia', content: 'Russia' },
        { value: 'Sweden', content: 'Sweden' },
        { value: 'Thailand', content: 'Thailand' },
        { value: 'Vietnam', content: 'Vietnam' },

    ],

};
