import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import React, { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';

type HtmlInputProps = Omit< InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface  InputProps extends HtmlInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void
    autofocus?: boolean;
}

export const Input =  memo((props:  InputProps) => {

    const [ifFocused, setIfFocused] = useState(false)
    const [caretPosition, setCaterPosition] = useState(0)
    const ref = useRef<HTMLInputElement>(null)
    const {
        className,
        value,
        onChange,
        placeholder,
        type ='text',
        autofocus,        
        ...otherProps
    } = props 
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)  
        setCaterPosition(e.target.value.length)

    }

    
    const onBlur = () => {
        setIfFocused(false)
    }
    const onFocus = () => {
        setIfFocused(true)
    }
    const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaterPosition(e.target.selectionStart || 0);
    };
    useEffect(() => {
        if(autofocus) {
            setIfFocused(true)
            ref.current?.focus()
        }
    }, [autofocus])
    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
           { placeholder && <div>
                {placeholder + '>'}
            </div> } 
            <div className={cls.caretWrapper}> 
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    {...otherProps}
                />
                { ifFocused &&  <span 
                className={cls.caret}
                style={{left: `${caretPosition * 9}px` }}
                />}
            </div>
           
        </div>
    );
});

