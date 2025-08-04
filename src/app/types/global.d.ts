declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

declare type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
declare module 'clarinet' {
    interface ClarinetParser {
        onopenobject?: () => void;
        onkey?: (key: string) => void;
        onvalue?: (value: any) => void;
        oncloseobject?: () => void;
        onopenarray?: () => void;
        onclosearray?: () => void;
        onerror?: (error: Error) => void;
        write(chunk: string): void;
        close(): void;
    }

    export function parser(strict?: boolean): ClarinetParser;

    const clarinet: {
        parser: typeof parser;
    };

    export default clarinet;
}