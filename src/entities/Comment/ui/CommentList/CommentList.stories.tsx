// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { CommentList } from './CommentList';

const meta: Meta<typeof CommentList> = {
    title: 'entities/Comment/CommentList',
    component: CommentList,
};

export default meta;

type Story = StoryObj<typeof CommentList>;

export const Primary: Story = {
    args: {
        className: '',
    },
};
Primary.args = {
    comments: [
        { id: '1', text: 'Comment1', user: { id: '1', username: 'user1', avatar: '' } },
        { id: '1', text: 'Comment2', user: { id: '1', username: 'user2', avatar: '' } },
        { id: '1', text: 'Comment3', user: { id: '1', username: 'user3', avatar: '' } },
    ],
};
