// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';
import { Text } from '../Text/Text';

const meta: Meta<typeof Card> = {
    title: 'shared/Card',
    component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Normal: Story = {};

Normal.args = {
    children: <Text title="test" text="text text" />,
};
