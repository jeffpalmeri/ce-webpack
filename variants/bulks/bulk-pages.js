// eslint-disable-next-line no-unused-vars
import Handlebars from 'handlebars';

import headerOne from './1-header/header-1.hbs';
import heroOneSection from './2-hero/hero-1.hbs';
import carouselOneSection from './3-carousel/carousel-1.hbs';
import homeOneSection from './4-home/home-1.hbs';
import footerOne from './5-footer/footer-1.hbs';

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

export default bulkTemplates;
