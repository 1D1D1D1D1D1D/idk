// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'shared/Skeleton',
    component: Skeleton,
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {};
Primary.args = {
    width: 100,
    height: 100,
};

export const Circle: Story = {};
Circle.args = {
    width: 100,
    height: 100,
    border: '50%',
};
