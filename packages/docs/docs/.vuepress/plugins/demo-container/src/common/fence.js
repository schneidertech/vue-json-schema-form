//  fence
module.exports = md => {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    //  fence  :::demo
    const prevToken = tokens[idx - 1];
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);
    if (token.info === 'html' && isInDemoContainer) {
      return `<template><pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></template>`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
};
