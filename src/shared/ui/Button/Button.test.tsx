import {render, screen} from "@testing-library/react"
import Button from "./Button";
describe('classNames', () => {
    test('with only first param', () => {
      render(<Button>test</Button>)
      expect(screen)
      screen.getByText('test')
    });

  
});
