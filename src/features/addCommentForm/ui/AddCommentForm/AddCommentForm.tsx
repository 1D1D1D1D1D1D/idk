import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getAddCommentFormError, getAddCommentFormText } from 'features/addCommentForm/model/selectors/addCommentFormSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { AddCommentFormActions, AddCommentFormReducer } from 'features/addCommentForm/model/slice/addCommentFormSlice';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './AddCommentForm.module.scss';

interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void
}
const AddCommentForm = ({ className, onSendComment }: AddCommentFormProps) => {
    const reducerList: ReducerList = {
        addCommentForm: AddCommentFormReducer,
    };
    const { t } = useTranslation();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(AddCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [text, onCommentTextChange, onSendComment]);
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducerList}>
            <div className={classNames(cls.AddCommentForm, {}, [])}>
                <Input placeholder={t('Введите текст комментария')} autofocus={false} value={text} onChange={onCommentTextChange} className={cls.input} />
                <Button theme={ThemeButton.OUTLINE} className={cls.addCommentBtn} onClick={onSendHandler}>{t('Оставить комментарий')}</Button>
            </div>

        </DynamicModuleLoader>
    );
};

export default AddCommentForm;
