import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import { ArticleType, getArticleDetailsData, getArticleDetailsForm } from 'entities/Article';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { EditArticleActions, EditArticleReducer } from '../../model/slice/EditArticleSlice';
import { getEditArticleReadonly } from '../..';
import { EditableArticleCard } from '../EditableArticleCard/EditableArticleCard';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { ArticleTypeSelector } from 'pages/ArticleEditPage/ui/ArticleTypeSelector/ArticleTypeSelector';
import { getArticleTypesForm } from 'features/EditArticleForm/model/selectors/editArticleSelectors';

interface EditArticleFormProps {
    className?: string;
    id?: string
}

export const EditArticleForm = (props: EditArticleFormProps) => {

    const reducers: ReducerList = {
        articleDetails: articleDetailsReducer,
        editArticleForm: EditArticleReducer


    };
    const { className, id } = props
    const dispatch = useAppDispatch()
    const article = useSelector(getArticleDetailsData);
    const formArticle = useSelector(getArticleDetailsForm)
    const readonly = useSelector(getEditArticleReadonly)
    const types = useSelector(getArticleTypesForm);
    if (!id) {
        return null
    }
    useEffect(() => {
        if (article) {
            dispatch(EditArticleActions.updateData(article));
        }
    }, [article, dispatch]);
    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [id])

    const onChangeSubtitle = useCallback((value: string) => {
        dispatch(EditArticleActions.updateData({ subtitle: value || '' }))
    }, [dispatch])
    const onChangeTitle = useCallback((value: string) => {
        dispatch(EditArticleActions.updateData({ title: value || '' }))
    }, [dispatch])
    const onChangeImage = useCallback((value: string) => {
        dispatch(EditArticleActions.updateData({ img: value || '' }))
    }, [dispatch])
    const onChangeType = useCallback((value: ArticleType) => {
        if (!readonly) {
            dispatch(EditArticleActions.setType(value));
        }

    }, [dispatch, readonly]);
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>

            <VFlex className={classNames('', {}, [className])}>
                <EditableArticleCard data={formArticle} readonly={readonly}
                    onChangeSubtitle={onChangeSubtitle}
                    onChangeTitle={onChangeTitle}
                    onChangeImage={onChangeImage}
                />
                <ArticleTypeSelector onTabClick={onChangeType} value={types} readonly={readonly} />
            </VFlex>
        </DynamicModuleLoader>

    );
};