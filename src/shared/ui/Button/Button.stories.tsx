
import type { Meta, StoryObj } from '@storybook/react';

import Button, { ButtonSize } from './Button';
import {  ThemeButton } from './Button';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {}
Primary.args = {
    children: 'Text',
};
export const Clear: Story = {}
Clear.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR
};

export const Outline: Story = {}
Outline.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE
};
export const OutlineSizeL: Story = {}
OutlineSizeL.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
    size: ButtonSize.L
};
export const OutlineSizeXl: Story = {}
OutlineSizeXl.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
    size: ButtonSize.XL
};
export const OutlineDark: Story = {}
OutlineDark.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]


export const Background: Story = {}
Background.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND
};


export const BackgroundInverted: Story = {}
BackgroundInverted.args = {
    children: 'Text',
    theme: ThemeButton.BACKGROUND_INVERTED
};


export const Square: Story = {}
Square.args = {
    children: '<',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true
};

export const SquareSizeL: Story = {}
SquareSizeL.args = {
    children: '<',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.L
};

export const SquareSizeXl: Story = {}
SquareSizeXl.args = {
    children: '<',
    theme: ThemeButton.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.XL
};
