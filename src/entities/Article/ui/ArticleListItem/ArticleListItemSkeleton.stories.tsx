// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleView } from '../../../Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';

const meta: Meta<typeof ArticleListItemSkeleton
> = {
    title: 'entities/Article/ArticleListItemSkeleton',
    component: ArticleListItemSkeleton,
};

export default meta;

type Story = StoryObj<typeof ArticleListItemSkeleton>;

export const GridViewLoading: Story = {};
GridViewLoading.args = {
    view: ArticleView.GRID,

};

export const ListViewLoading: Story = {};
ListViewLoading.args = {

    view: ArticleView.LIST,

};

GridViewLoading.decorators = [ThemeDecorator(Theme.GRAY)];
ListViewLoading.decorators = [ThemeDecorator(Theme.GRAY)];
