import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './MostViewedArticles.module.scss';
import { Carousel } from 'shared/ui/Carousel/ui/Carousel';
import { VFlex } from 'shared/ui/Stack/VFlex/VFlex';
import { memo, useEffect } from 'react';
import { initAllArticles } from 'pages/MainPage/services/initAllArticles/initAllArticles';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { getArticlesData, getArticlesIsloading, getArticlesRecent, getArticlesRecommendations } from 'pages/MainPage/services/selectors/selectors';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AllArticlesSliceReducer } from 'pages/MainPage/slice/AllArticlesSlice';

interface MostViewedArticlesProps {
    className?: string;
}

export const MostViewedArticles = ({ className }: MostViewedArticlesProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch()
    const reducers: ReducerList = {
        mainPage: AllArticlesSliceReducer
    }

    const articles = useSelector(getArticlesData)
    const isLoading = useSelector(getArticlesIsloading)
    const recommendations = useSelector(getArticlesRecommendations)
    const recent = useSelector(getArticlesRecent)
    console.log(recommendations);
    console.log(recent);
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            console.log('start');

            dispatch(initAllArticles())
        }
    }, [])
    return (
        <DynamicModuleLoader removeAfterUnmount={false} reducers={reducers}>

            <VFlex align='center' justify='center' className={classNames(cls.MostViewedArticles, {}, [className])}>
                <Carousel className={cls.carousel} articles={articles} isLoading={isLoading} />
            </VFlex>
        </DynamicModuleLoader>

    );
}