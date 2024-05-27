import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { PageLoader } from './PageLoader';
export default {
    title: 'widget/PageLoader',
    component: PageLoader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PageLoader>;

const Template: ComponentStory<typeof PageLoader> = (args) => <PageLoader {...args} />;

export const Light = Template.bind({});
Light.args = {
    theme: Theme.LIGHT
};

export const Dark = Template.bind({
    theme: Theme.DARK
})

Dark.decorators = [ThemeDecorator(Theme.DARK)]
