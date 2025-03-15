import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AddCommentFormActions, AddCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';

interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void
}
const AddCommentForm = (props: AddCommentFormProps) => {
    const {
        className,
        onSendComment,
    } = props;
    const reducerList: ReducerList = {
        addCommentForm: AddCommentFormReducer,
    };
    const { t } = useTranslation();
    const text = useSelector(getAddCommentFormText);

    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(AddCommentFormActions.setText(value));
        }
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [text, onCommentTextChange, onSendComment]);
    return (
        <DynamicModuleLoader removeAfterUnmount={false} reducers={reducerList}>
            <div className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input placeholder={t('Введите текст комментария')} autofocus={false} value={text} onChange={onCommentTextChange} className={cls.input} />
                <Button theme={ThemeButton.OUTLINE} className={cls.addCommentBtn} onClick={onSendHandler}>{t('Оставить комментарий')}</Button>
            </div>
        </DynamicModuleLoader>
    );
};

export default AddCommentForm;
