import { MathbetPage } from './app.po';

describe('mathbet App', function() {
  let page: MathbetPage;

  beforeEach(() => {
    page = new MathbetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
