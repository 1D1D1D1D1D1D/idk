import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsMountedData, initAuthData } from 'entities/User';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';


const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const isMounted = useSelector(getIsMountedData);
    console.log(isMounted);


    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                {isMounted ?
                    <>
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            {isMounted && <AppRouter />}
                        </div>
                    </>

                    :

                    <PageLoader />
                }
            </Suspense>
        </div>
    );
};

export default App;
