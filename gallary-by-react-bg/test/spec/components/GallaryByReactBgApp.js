'use strict';

describe('GallaryByReactBgApp', () => {
  let React = require('react/addons');
  let GallaryByReactBgApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    GallaryByReactBgApp = require('components/GallaryByReactBgApp.js');
    component = React.createElement(GallaryByReactBgApp);
  });

  it('should create a new instance of GallaryByReactBgApp', () => {
    expect(component).toBeDefined();
  });
});
