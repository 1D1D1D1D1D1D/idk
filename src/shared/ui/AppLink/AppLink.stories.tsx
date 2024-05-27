import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import AppLink, { AppLinkTheme } from './AppLink';
export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Light = Template.bind({});
Light.args = {
    children: 'Text',
    theme: AppLinkTheme.PRIMARY
};

export const Dark = Template.bind({});
Dark.args = {
    children: 'Text',
    theme: AppLinkTheme.SECONDARY
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
