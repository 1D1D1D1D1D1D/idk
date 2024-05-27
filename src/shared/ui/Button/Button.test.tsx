import {render, screen} from "@testing-library/react"
import Button, { ThemeButton } from "./Button";
import '@testing-library/jest-dom'
describe('classNames', () => {
    test('with only first param', () => {
        render(<Button>test</Button>)
        expect(screen.getByText('test')).toBeInTheDocument()
    });
    test('with only first param', () => {
        render(<Button theme={ThemeButton.CLEAR}>test</Button>)
        expect(screen.getByText('test')).toHaveClass('clear')
    });

  
});
