import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsMountedData, userActions } from 'entities/User';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const isMounted = useSelector(getIsMountedData);
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);
    return (
        <div className={classNames('app', {}, [theme])}>

            <Suspense>
                <Navbar />

                <div className="content-page">
                    <Sidebar />
                    {isMounted && <AppRouter />}

                </div>
            </Suspense>
        </div>
    );
};

export default App;
