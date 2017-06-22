import { MAIVPage } from './app.po';

describe('maiv App', () => {
  let page: MAIVPage;

  beforeEach(() => {
    page = new MAIVPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
