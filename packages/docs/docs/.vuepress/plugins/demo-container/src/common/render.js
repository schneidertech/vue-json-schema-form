const {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
} = require('./util.js');

module.exports = function (content) {
  if (!content) {
    return content
  }
  const startTag = '<!--pre-render-demo:';
  const startTagLen = startTag.length;
  const endTag = ':pre-render-demo-->';
  const endTagLen = endTag.length;

  let componenetsString = ''; //
  let templateArr = []; //
  let styleArr = []; //
  let id = 0; // demo  id
  let start = 0; //
  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    templateArr.push(content.slice(start, commentStart));
    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    const style = stripStyle(commentContent);
    const demoComponentContent = genInlineComponentText(html, script); //
    const demoComponentName = `render-demo-${id}`; //
    templateArr.push(`<template><${demoComponentName} /></template>`);
    styleArr.push(style);
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;
    //
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }
  //  demo  Markdown  script
  // todo:
  let pageScript = '';
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) { //
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }
  //  style
  let styleString = '';
  if(styleArr && styleArr.length > 0) {
    styleString = `<style>${styleArr.join('')}</style>`
  } else {
    styleString = `<style></style>`
  }
  templateArr.push(content.slice(start));
  return {
    template: templateArr.join(''),
    script: pageScript,
    style: styleString
  }
};
