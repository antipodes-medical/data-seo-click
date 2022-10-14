const fs = require('fs');
const path = require('path');
const DataSeo = require('../src');
const html = fs.readFileSync(path.resolve(__dirname, '__fixtures__/index.html'), 'utf8');
const dataSeosJson = fs.readFileSync(path.resolve(__dirname, '__fixtures__/data-seos.json'), 'utf8');

jest.dontMock('fs');

beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
  new DataSeo(dataSeosJson);
});

afterEach(() => {
  jest.resetModules();
});

test('there is attributes on each elements', () => {
  const $firstElement = document.querySelector('.first-div__first-link');
  const $secondElement = document.querySelector('.first-div__second-link');
  const $thirdElement = document.querySelector('.second-div__first-link');
  const $fourthElement = document.querySelector('.second-div__second-link');

  expect($firstElement.getAttribute('data-seo-click')).toBe('First div');
  expect($firstElement.getAttribute('data-seo-click-name')).toBe('First link in first div');

  expect($secondElement.getAttribute('data-seo-click')).toBe('First div');
  expect($secondElement.getAttribute('data-seo-click-name')).toBeNull();

  // Test multiple selectors element

  expect($thirdElement.getAttribute('data-seo-click')).toBe('Second div');
  expect($thirdElement.getAttribute('data-seo-click-name')).toBe('Links inside second div');

  expect($fourthElement.getAttribute('data-seo-click')).toBe('Second div');
  expect($fourthElement.getAttribute('data-seo-click-name')).toBe('Links inside second div');
});

test('there is attributes on the first children of <roll-hover-button>', () => {
  const $rollHoverButton = document.querySelector('.roll-hover-button > roll-hover-button:first-child');
  expect($rollHoverButton.children[0].getAttribute('data-seo-click')).toBe('Roll hover button div');
  expect($rollHoverButton.children[0].getAttribute('data-seo-click-name')).toBe('Roll hover button direct');

  const $rollHoverButtonWithClass = document.querySelector('.roll-hover-button > .my-roll-hover-button');
  expect($rollHoverButtonWithClass.children[0].getAttribute('data-seo-click')).toBe('Roll hover button div');
  expect($rollHoverButtonWithClass.children[0].getAttribute('data-seo-click-name')).toBe('Roll hover button with class');
});

test('there is a custom style displayed to remove pointer-events on the data-seo-click elements', () => {
  expect(document.querySelector('style').textContent).toBe('[data-seo-click] * { pointer-events: none!important; }');
});