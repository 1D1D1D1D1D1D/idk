import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useMemo } from 'react';
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
import { articleAiActions, articleAiReducer } from 'features/EditArticleAiHelper/model/slice/articleAiSlice';
import { getAiInputIsLoading, getAiInputPrompt, getAiInputResponse, getAiInputResult } from 'features/EditArticleAiHelper/model/selectors/selectors';
import { sendPrompt } from 'entities/DeepSeek/model/services/sendPrompt';
import cls from './EditArticleForm.module.scss'
import { Icon } from 'shared/ui/Icon/Icon';
import SendIcon from 'shared/assets/icons/send-alt-svgrepo-com.svg';
import Button from 'shared/ui/Button/Button';

import { ArticleAiHelper } from 'features/EditArticleAiHelper/ui/ArticleAiHelper';
import { promptTemplate } from 'shared/const/promptTemplate';

interface EditArticleFormProps {
  className?: string;
  id?: string
}
export const EditArticleForm = memo((props: EditArticleFormProps) => {

  const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
    editArticleForm: EditArticleReducer,
    articleAiInput: articleAiReducer
  };


  const { className, id } = props
  const dispatch = useAppDispatch()
  const article = useSelector(getArticleDetailsData);
  const formArticle = useSelector(getArticleDetailsForm)
  const prompt = useSelector(getAiInputPrompt)
  const readonly = useSelector(getEditArticleReadonly)
  const isLoading = useSelector(getAiInputIsLoading)
  const types = useSelector(getArticleTypesForm);
  const response = useSelector(getAiInputResponse)
  const result = useSelector(getAiInputResult)

  console.log(result);

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
  const onChangePromptInput = useCallback((value: string) => {
    dispatch(articleAiActions.setPrompt(value))
  }, [dispatch]);

  const onSendPrompt = useCallback(() => {
    dispatch(articleAiActions.clear())
    dispatch(articleAiActions.setLoading(true))
    dispatch(articleAiActions.setReaonly(true))
    sendPrompt(promptTemplate, prompt, dispatch, result)
  }, [dispatch, prompt, result]);
  console.log(isLoading)

  const disabled = useMemo(() => {
    if (prompt === '' || isLoading === true)
      return true
    else return false
  }, [prompt, isLoading])
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>

      <VFlex className={classNames(cls.EditForm, {}, [className])}>
        <EditableArticleCard data={formArticle} readonly={readonly}
          onChangeSubtitle={onChangeSubtitle}
          onChangeTitle={onChangeTitle}
          onChangeImage={onChangeImage}
        />
        <ArticleTypeSelector onTabClick={onChangeType} value={types} readonly={readonly} />
      </VFlex>
      <VFlex className={cls.promptForm} align='center' justify='center'>
        <ArticleAiHelper response={response} prompt={prompt} onChange={onChangePromptInput} data={article} onClick={onSendPrompt} />
        <Button className={cls.sendButton} onClick={onSendPrompt} disabled={disabled}>
          <Icon className={cls.icon} Svg={SendIcon} />
        </Button>
      </VFlex>


    </DynamicModuleLoader>
  );
});
