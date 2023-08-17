export const parseMarkdownCode = (
  markdown: string,
  lang = "javascript"
): string => {
  // parse code block from markdown ```typescript

  const codeBlockRegex = new RegExp(`\`\`\`${lang}([\\s\\S]*?)\`\`\``, "g");
  const codeBlockMatch = codeBlockRegex.exec(markdown);

  if (codeBlockMatch) {
    return codeBlockMatch[1];
  }

  return "";
};
