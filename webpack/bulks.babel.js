import yargs from 'yargs';

import bulkConfig from '../variants/bulks/bulk-pages';

const { env } = yargs.argv;

const META_TAGS = {
  'X-UA-Compatible': { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  'Content-Type': { 'http-equiv': 'Content-Type', content: 'text/html;charset=UTF-8' },
  charset: { charset: 'UTF-8' },
  viewport: {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
  },
  'og:image': {
    property: 'og:image',
    content: `https://${env.domain || 'help'}.domain.com/assets/images/quiz/quiz-img-1.jpg`,
  },
};

const manageBulkTemplates = (bPages) =>
  bPages.map(({ filename, template }) => ({
    filename,
    chunk: 'bulk-test',
    templateContent: () => `
      <html>
        <body>
          <div class="bulk-pages">
            ${template}
          </div>
        </body>
      </html>
    `,
  }));

export default { pages: manageBulkTemplates(bulkConfig), META_TAGS };
