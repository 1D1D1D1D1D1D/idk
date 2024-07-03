import { componentRender } from "shared/lib/tests/componentRender/componentRender"
import { screen, waitFor } from "@testing-library/react"
import Counter from "./Counter";
import userEvent from '@testing-library/user-event'



describe('Counter', () => {
    test('test slice initial state',  () => { 
        componentRender(<Counter />,  undefined);
    
            expect(screen.getByTestId('value-title')).toHaveTextContent('0');
    });
    test('test render', async () => { 
        componentRender(<Counter />,  {initialState: {counter: {value: 10}}});
        await waitFor(() => {
            expect(screen.getByTestId('value-title')).toHaveTextContent('10');
        })
    });

    test('test increment', async () => { 
        componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
        userEvent.click(screen.getByTestId('increment-btn'));
    
        await waitFor(() => { 
            expect(screen.getByTestId('value-title')).toHaveTextContent('11');
        });
    });

    test('test decrement', async () => { 
        componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
        userEvent.click(screen.getByTestId('decrement-btn'));
    
        await waitFor(() => { 
            expect(screen.getByTestId('value-title')).toHaveTextContent('9');
        });
    });
})