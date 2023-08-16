export const parseMarkdownCode = (markdown: string): string => {
  // parse code block from markdown ```typescript

  const codeBlockRegex = /```javascript([\s\S]*?)```/g;
  const codeBlockMatch = codeBlockRegex.exec(markdown);

  if (codeBlockMatch) {
    return codeBlockMatch[1];
  }

  return "";
};
