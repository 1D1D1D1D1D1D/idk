import type { Meta, StoryObj } from '@storybook/react';

import { AddCommentForm } from 'features/addCommentForm';

const meta: Meta<typeof AddCommentForm> = {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
};

export default meta;

type Story = StoryObj<typeof AddCommentForm>;

export const Primary: Story = {};

Primary.args = {

};
