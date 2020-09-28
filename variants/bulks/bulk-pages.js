// eslint-disable-next-line no-unused-vars
const Handlebars = require('handlebars');

const headerOne = require('./1-header/header-1.hbs');
const heroOneSection = require('./2-hero/hero-1.hbs');
const carouselOneSection = require('./3-carousel/carousel-1.hbs');
const homeOneSection = require('./4-home/home-1.hbs');
const footerOne = require('./5-footer/footer-1.hbs');

const bulkTemplates = [
  {
    filename: 'bulk-one',
    template: `
      ${headerOne({ headerText: 'this is your header one' })}
      ${heroOneSection({ heroText: 'Hero one' })}
      ${carouselOneSection({ carouselText: 'carousel one' })}
      ${homeOneSection({ someText: 'yes, it works!!' })}
      ${footerOne({ date: '2020-1' })}

    `,
  },
  {
    filename: 'bulk-two',
    template: `
      ${headerOne({ headerText: 'this is your header two' })}
      ${heroOneSection()}
      ${carouselOneSection({ carouselText: 'carousel two' })}
      ${homeOneSection({ someText: 'yes, it works on page 2' })}
      ${footerOne({ date: '2020-2' })}
    `,
  },
  {
    filename: 'bulk-three',
    template: `
      ${headerOne({ headerText: 'this is your header three' })}
      ${heroOneSection({ heroText: 'Hero three' })}
      ${carouselOneSection({ carouselText: 'carousel three' })}
      ${homeOneSection({ someText: 'yaaaaay!!' })}
      ${footerOne({ date: '2020-3' })}
    `,
  },
];

module.exports = bulkTemplates;
