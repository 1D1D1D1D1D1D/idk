import { EditableProfileCard } from "features/EditableProfileCard";
import { TestProvider } from "shared/lib/tests/componentRender/componentRender";
describe('EditableProfileCard.cy.tsx', () => {
  beforeEach(() => {
    localStorage.setItem('theme', 'app_dark_theme'); // Укажите нужную тему
  });
  it('playground', () => {

    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
    cy.wait(1000)
    cy.mount(
      <TestProvider options={{
        initialState: {
          user: {
            authData: {
              id: '1'
            }
          }
        }
      }}>
        <EditableProfileCard id="1" />
      </TestProvider>
    );
  });
});