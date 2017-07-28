import { ProductsPage } from './app.po';

describe('products App', () => {
  let page: ProductsPage;

  beforeEach(() => {
    page = new ProductsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
