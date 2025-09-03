import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { getEditArticleReadonly } from '../../model/selectors/editArticleSelectors';
import { useSelector } from 'react-redux';
import Button from 'shared/ui/Button/Button';
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateArticleById } from 'entities/Article/model/services/updateArticleById/updateArticleById';
import { EditArticleActions } from '../../model/slice/EditArticleSlice';
import { getArticleDetailsData, getArticleDetailsForm } from 'entities/Article';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './EditArticleHeader.module.scss'
import { getAiInputIsLoading, getAiInputPrompt, getAiInputResult } from 'features/EditArticleAiHelper/model/selectors/selectors';
interface EditArticleHeaderProps {
    className?: string;
}

export const EditArticleHeader = ({ className }: EditArticleHeaderProps) => {
    const { t } = useTranslation();
    const readonly = useSelector(getEditArticleReadonly)
    const dispatch = useAppDispatch()
    const article = useSelector(getArticleDetailsData);
    const articleForm = useSelector(getArticleDetailsForm)
    const prompt = useSelector(getAiInputPrompt)
    const isLoading = useSelector(getAiInputIsLoading)
    const result = useSelector(getAiInputResult)
    const navigate = useNavigate()
    const [saveDisabled, setSaveDisabled] = useState<boolean>(false)

    const onSaveHandler = useCallback(() => {
        dispatch(updateArticleById())
        setSaveDisabled(true)
        dispatch(EditArticleActions.saveData(article))
        dispatch(EditArticleActions.setReadonly(true))

    }, [dispatch])
    const onCancelHandler = useCallback(() => {
        if (article) {
            dispatch(EditArticleActions.cancelEdit(article))

        }

    }, [dispatch, articleForm])
    const onSetReadonlyHandler = useCallback(() => {
        dispatch(EditArticleActions.setReadonly(false))
    }, [dispatch])
    const onPreviewClick = useCallback(() => {
        navigate(RoutePath.preview)
    }, [navigate])

    const disabled = useMemo(() => {
        if (prompt === '' || isLoading === true || Object.entries(result).length < 2)
            return true
        else return false
    }, [prompt, isLoading, result])
    return (
        <HFlex className={classNames(cls.header, {}, [className])}>
            {readonly ?
                <HFlex  >
                    <Button onClick={onSetReadonlyHandler}>Edit</Button>
                </HFlex>
                :
                <HFlex className={cls.menu} gap='4' >
                    <Button onClick={onCancelHandler}>Cancel</Button>
                    <Button disabled={saveDisabled} onClick={onSaveHandler}>Save</Button>
                    <Button onClick={onPreviewClick} disabled={disabled} >Preview</Button>
                </HFlex>
            }
        </HFlex>

    );
};