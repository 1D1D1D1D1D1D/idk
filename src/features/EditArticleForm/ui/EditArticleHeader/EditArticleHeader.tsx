import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { getEditArticleReadonly } from '../../model/selectors/editArticleSelectors';
import { useSelector } from 'react-redux';
import Button from 'shared/ui/Button/Button';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateArticleById } from 'entities/Article/model/services/updateArticleById/updateArticleById';
import { EditArticleActions, EditArticleReducer } from '../../model/slice/EditArticleSlice';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getArticleDetailsData, getArticleDetailsForm } from 'entities/Article';

interface EditArticleHeaderProps {
    className?: string;
}

export const EditArticleHeader = ({ className }: EditArticleHeaderProps) => {
    const { t } = useTranslation();
    const readonly = useSelector(getEditArticleReadonly)
    const dispatch = useAppDispatch()
    const article = useSelector(getArticleDetailsData);
    const articleForm = useSelector(getArticleDetailsForm)
    const reducers: ReducerList = {
        editArticleForm: EditArticleReducer
    }
    const onSaveHandler = useCallback(() => {
        dispatch(updateArticleById())
        dispatch(EditArticleActions.saveData(article))
        dispatch(EditArticleActions.setReadonly(true))

    }, [dispatch])
    const onCancelHandler = useCallback(() => {
        if (articleForm)
            dispatch(EditArticleActions.cancelEdit(articleForm))
    }, [dispatch, articleForm])
    const onSetReadonlyHandler = useCallback(() => {
        dispatch(EditArticleActions.setReadonly(false))
    }, [dispatch])
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classNames('', {}, [className])}>
                {readonly ?
                    <HFlex align='end' justify='end' >
                        <Button onClick={onSetReadonlyHandler}>Edit</Button>
                    </HFlex>
                    :
                    <HFlex align='end' justify='end' >
                        <Button onClick={onCancelHandler}>Cancel</Button>
                        <Button onClick={onSaveHandler}>Save</Button>
                    </HFlex>
                }
            </div>
        </DynamicModuleLoader>

    );
};