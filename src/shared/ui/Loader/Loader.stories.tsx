import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { AboutPageAsync } from 'pages/AboutPage/ui/AboutPage.async';


export default {
    title: 'pages/AboutPageAsync',
    component: AboutPageAsync,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AboutPageAsync>;

const Template: ComponentStory<typeof AboutPageAsync> = (args) => <AboutPageAsync {...args} />;

export const Light = Template.bind({});
Light.args = {
    theme: Theme.LIGHT
};

export const Dark = Template.bind({});
Dark.args = {
    theme: Theme.DARK
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
