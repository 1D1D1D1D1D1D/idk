// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

const meta: Meta<typeof Text> = {
    title: 'shared/Text',
    component: Text,
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {};
Primary.args = {
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

export const OnlyWithTitle: Story = {};
OnlyWithTitle.args = {
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

export const OnlyWithText: Story = {};
OnlyWithText.args = {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

export const PrimaryDark: Story = {};
PrimaryDark.args = {
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyWithTitleDark: Story = {};
OnlyWithTitleDark.args = {
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

OnlyWithTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyWithTextDark: Story = {};
OnlyWithTextDark.args = {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

OnlyWithTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error: Story = {};
Error.args = {
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    theme: TextTheme.ERROR,
};

export const SizeM: Story = {};
SizeM.args = {
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    size: TextSize.M,
};

export const SizeL: Story = {};
SizeL.args = {
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    size: TextSize.L,
};
