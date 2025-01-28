import type { Meta, StoryObj } from '@storybook/react';

import { ListBox, ListBoxItem } from './ListBox';

const meta: Meta<typeof ListBox> = {
    title: 'shared/ListBox',
    component: ListBox,
};
export default meta;

type Story = StoryObj<typeof ListBox>;

export const Primary: Story = {};

Primary.args = {
    defaultValue: 'Select Item',
    items: [
        { value: '1', content: 'Durward Reynolds' },
        { value: '2', content: 'Kenton Towne' },
        { value: '3', content: 'Therese Wunsch' },
        { value: '4', content: 'Benedict Kessler' },
        { value: '5', content: 'Katelyn Rohan' },
    ],
    value: 'Durward Reynolds',

};
export const DisabledValues: Story = {};

DisabledValues.args = {
    defaultValue: 'Select Item',
    items: [
        { value: '1', content: 'Durward Reynolds', disabled: true },
        { value: '2', content: 'Kenton Towne', disabled: true },
        { value: '3', content: 'Therese Wunsch', disabled: true },
        { value: '4', content: 'Benedict Kessler', disabled: true },
        { value: '5', content: 'Katelyn Rohan', disabled: true },
    ],
    value: 'Durward Reynolds',

};
