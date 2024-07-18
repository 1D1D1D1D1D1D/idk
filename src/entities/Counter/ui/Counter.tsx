import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button, { ButtonSize, ThemeButton } from 'shared/ui/Button/Button';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useSelector(getCounterValue);
    const increment = () => {
        dispatch(counterActions.increment());
    };
    const decrement = () => {
        dispatch(counterActions.decrement());
    };
    const { t } = useTranslation();

    return (
        <div>
            <h1 data-testid="value-title">
                {' value = '}
                {counterValue}
            </h1>
            <Button data-testid="increment-btn" theme={ThemeButton.BACKGROUND} size={ButtonSize.XL} onClick={increment}>INCREMENT</Button>
            <Button data-testid="decrement-btn" theme={ThemeButton.BACKGROUND} size={ButtonSize.XL} onClick={decrement}>DECREMENT</Button>
        </div>
    );
};
export default Counter;
