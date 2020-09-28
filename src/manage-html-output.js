const manageHtmlOutput = ({ pages, META_TAGS }) => {
  const output = {};
  pages.forEach(({ source, filename, chunk, metaTags }) => {
    const key = `${source}.hbs`;
    const value = {
      filename: filename || source,
      chunks: [chunk || source],
      metaTags: metaTags || META_TAGS,
    };
    output[key] = value;
  });
  return output;
};

module.exports = manageHtmlOutput;
