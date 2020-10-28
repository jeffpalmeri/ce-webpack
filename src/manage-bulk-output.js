const manageHtmlOutput = ({ pages, META_TAGS }) => {
  const output = {};
  pages.forEach(({ filename, chunk, templateContent, metaTags }) => {
    const key = `${filename}.hbs`;
    const value = {
      filename,
      chunks: [chunk],
      metaTags: metaTags || META_TAGS,
      templateContent,
    };
    output[key] = value;
  });
  return output;
};

export default manageHtmlOutput;
