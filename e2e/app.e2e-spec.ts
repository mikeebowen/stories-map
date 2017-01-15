import { StoriesMapPage } from './app.po';

describe('stories-map App', function() {
  let page: StoriesMapPage;

  beforeEach(() => {
    page = new StoriesMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
