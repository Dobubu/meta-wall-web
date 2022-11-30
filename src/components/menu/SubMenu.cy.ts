import SubMenu from './SubMenu.vue';

describe('<SubMenu />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(SubMenu);
  });
});
