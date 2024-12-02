// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { ArticlesPageFilters } from './ArticlesPageFilters';

const meta: Meta<typeof ArticlesPageFilters> = {
    title: 'pages/ArticlePage/ArticlesPageFilters',
    component: ArticlesPageFilters,
};

export default meta;

type Story = StoryObj<typeof ArticlesPageFilters>;

export const Primary: Story = {};

Primary.args = {

};

Primary.decorators = [StoreDecorator({ articlesPage: {} }), ThemeDecorator(Theme.GRAY), StyleDecorator];
