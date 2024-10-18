import React, { SVGProps } from 'react';

export interface SidebarItemType {
    path: string,
    text: string,
    Icon: React.VFC<SVGProps<SVGSVGElement>>
    authOnly?: boolean
}
