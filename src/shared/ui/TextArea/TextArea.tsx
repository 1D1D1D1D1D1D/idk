import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TextArea.module.scss'
import { HFlex } from '../Stack/HFlex/HFlex';
import { ChangeEvent, memo, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';

type HtmlTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'readonly' | 'value' | 'onChange'>
export enum ThemeTextArea {
    OUTLINE = 'outline',
    BACKGROUND_INVERTED = 'backgroundInverted',

}
interface TextAreaProps extends HtmlTextAreaProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void
    readonly?: boolean
    placeholder?: string
    theme?: ThemeTextArea
}

export const TextArea = memo((props: TextAreaProps) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const {
        theme = ThemeTextArea.BACKGROUND_INVERTED,
        className,
        value = '',
        onChange,
        placeholder = '',
        readonly = false,


    } = props
    const autoResize = () => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }


    };
    // const debounceInput = useDebounce(autoResize, 100);
    useEffect(() => {
        autoResize();
    }, [value]);
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };
    const mods: Record<string, boolean | undefined> = {
        [cls[theme]]: true,
        [cls.readonly]: readonly


    };
    return (
        <HFlex className={classNames(cls.background, mods, [className])} align='center' justify='center'>
            <textarea className={cls.TextArea} ref={textareaRef} placeholder={placeholder} onChange={onChangeHandler} readOnly={readonly} value={value} style={{ overflow: 'hidden', resize: 'none' }}>

            </textarea>
        </HFlex>
    );
});