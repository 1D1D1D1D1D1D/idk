import type { Meta, StoryObj } from '@storybook/react';
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { Dropdown } from './Dropdown';
import AvatarIcon from '../../assets/icons/user-32-32.png';
import { Avatar } from '../Avatar/Avatar';

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
    trigger: <div> 123 </div>,
    // <Avatar src={AvatarIcon} /> *

};
export const DisabledValues: Story = {};

DisabledValues.args = {
    items: [
        { content: (<div>1</div>), disabled: true },
        { content: (<div>2</div>), disabled: true },
        { content: (<div>3</div>), disabled: true },
    ],
    trigger: <div>123</div>,
    // <Avatar src={AvatarIcon} /> *
};
Primary.decorators = [StyleDecorator];
