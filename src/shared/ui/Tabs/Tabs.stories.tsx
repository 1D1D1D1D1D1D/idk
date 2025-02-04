// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { ArticleType } from 'entities/Article/model/consts/articleConsts';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
    title: 'shared/Tabs',
    component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {};

Primary.args = {
    tabs: [{ content: 'tab1', value: ArticleType.IT }],

};
export const CurrentValue: Story = {};
CurrentValue.args = {
    tabs: [{ content: 'tab1', value: ArticleType.IT }],
    value: ArticleType.IT,
};

Primary.decorators = [ThemeDecorator(Theme.GRAY)];
