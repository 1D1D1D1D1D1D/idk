import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
    title: 'shared/Dropdown',
    component: Dropdown,
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {};

Primary.args = {
    items: [
        { content: (<div>asdsdd</div>) },
        { content: (<div>asdsdd</div>) },
        { content: (<div>asdsdd</div>) },
    ],
    trigger: <div>Click</div>,
};
export const DisabledValues: Story = {};

DisabledValues.args = {
    items: [
        { content: (<div>1</div>), disabled: true },
        { content: (<div>2</div>), disabled: true },
        { content: (<div>3</div>), disabled: true },
    ],
    trigger: <div>Click</div>,
};
