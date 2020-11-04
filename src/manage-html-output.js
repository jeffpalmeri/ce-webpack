const manageHtmlOutput = ({ pages, META_TAGS }) => {
  const output = {};
  pages.forEach(({ source, outputName, chunk, metaTags }) => {
    const value = {
      source,
      outputName,
      chunks: [chunk],
      metaTags: metaTags || META_TAGS,
    };
    output[source] = value;
  });
  return output;
};

module.exports = manageHtmlOutput;
