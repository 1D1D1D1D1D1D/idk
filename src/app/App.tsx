import './styles/index.scss';
import {useTheme} from './providers/ThemeProvider/lib/useTheme';

import {classNames} from 'shared/lib/classNames/classNames';
import {AppRouter} from './providers/router';
import {Navbar} from 'widgets/navbar';
import {Sidebar} from 'widgets/Sidebar';
import {Suspense, useEffect} from 'react';


const App = () => {
    const {theme} = useTheme();

    // useEffect(() =>{
    //     throw new Error
    // },[])

    return (
        <div className={classNames('app', {}, [theme])}>

            <Suspense>
                <Navbar />
             
                <div className='content-page'>
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;

