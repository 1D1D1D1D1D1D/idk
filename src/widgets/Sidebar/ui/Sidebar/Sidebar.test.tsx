import { fireEvent, screen} from "@testing-library/react"
import '@testing-library/jest-dom'
import Sidebar from "./Sidebar";
import { renderWitchTraslation } from "shared/lib/classNames/tests/renderWithTranslation";
describe('Sidebar', () => { 
    test('with only first param', () => {
        renderWitchTraslation(<Sidebar/>)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    });
    test('test toggle ', () => {
        renderWitchTraslation(<Sidebar/>)
        const tglBtn = screen.getByTestId('sidebar-toggle')
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        fireEvent.click(tglBtn)
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    });

  
});
