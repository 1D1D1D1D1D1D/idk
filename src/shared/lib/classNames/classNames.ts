export type Mods = Record<string, boolean | string | undefined>;

export function classNames(
    cls: string,
    mods: Mods = {},
    aditional: Array<string | undefined> = [],
): string {
    return [cls,
        ...aditional.filter(Boolean),
        ...Object.entries(mods)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className),
    ]
        .join(' ');
}
