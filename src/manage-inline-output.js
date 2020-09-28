const manageInlineOutput = ({ pages, META_TAGS }) => {
  const output = {};
  pages.forEach(({ filename, chunk, metaTags }) => {
    const key = filename;
    const chunks = [`${chunk || filename}`];
    output[filename] = { filename: key, chunks, metaTags: metaTags || META_TAGS };
  });
  return output;
};

module.exports = manageInlineOutput;
