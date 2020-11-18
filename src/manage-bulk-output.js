const manageBulkOutput = ({ pages, META_TAGS }) => {
  const output = {};
  pages.forEach(({ outputName, chunk, template, metaTags }) => {
    const value = {
      source: outputName,
      outputName,
      chunks: Array.isArray(chunk) ? chunk : [chunk],
      metaTags: metaTags || META_TAGS,
      templateContent: () => `
        <html>
          <body>
            ${template}
          </body>
        </html>
      `,
    };
    output[outputName] = value;
  });
  return output;
};

module.exports = manageBulkOutput;
