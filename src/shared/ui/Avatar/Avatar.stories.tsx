import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
    title: 'shared/Avatar',
    component: Avatar,
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {};
Primary.args = {
    size: 300,
    src: 'https://static29.tgcnt.ru/posts/_0/43/435320ad49357bcf742cdd6cc18fd28c.jpg',
};

export const Rounded: Story = {};
Rounded.args = {
    size: 300,
    round: true,
    src: 'https://static29.tgcnt.ru/posts/_0/43/435320ad49357bcf742cdd6cc18fd28c.jpg',

};
