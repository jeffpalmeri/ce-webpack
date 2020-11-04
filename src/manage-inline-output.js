const manageInlineOutput = ({ pages, META_TAGS }) => {
  const output = {};
  pages.forEach(({ outputName, chunk, metaTags }) => {
    const key = outputName;
    const chunks = [`${chunk || outputName}`];
    output[outputName] = { outputName: key, chunks, metaTags: metaTags || META_TAGS };
  });
  return output;
};

module.exports = manageInlineOutput;
