import Counter from './components/counter/Counter';
import { classNames } from './helpers/classNames';
import './styles/index.scss';
import { useTheme } from './theme/useTheme';

const App = () => {
    
    const { theme, toggleTheme } = useTheme()

    
    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>
asddasadsasd 
            </button>
            <Counter />
        </div>


    );
};

export default App;
