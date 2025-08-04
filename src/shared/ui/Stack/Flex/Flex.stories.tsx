// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
    title: 'shared/Flex',
    component: Flex,
};
export default meta;

type Story = StoryObj<typeof Flex>;

export const Column: Story = {};
Column.args = {
    direction: 'column',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
};
export const ColumnGap4: Story = {};
ColumnGap4.args = {
    direction: 'column',
    gap: '4',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
};
export const ColumnGap8: Story = {};
ColumnGap8.args = {
    direction: 'column',
    gap: '8',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
};
export const ColumnGap16: Story = {};
ColumnGap16.args = {
    direction: 'column',
    gap: '16',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
};
export const ColumnGap32: Story = {};
ColumnGap32.args = {
    direction: 'column',
    gap: '32',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
};
export const ColumnJustifyEnd: Story = {};
ColumnJustifyEnd.args = {
    direction: 'column',
    justify: 'end',
    align: 'end',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
};
export const Row: Story = {};
Row.args = {
    direction: 'row',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),

};
