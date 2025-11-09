export default function StringSplitter(fileData: string | null): string[] | null {
  if (!fileData) {
    return null;
  }

  // Step 1: Remove multiline comments (/* ... */)
  const noMultiComments = fileData.replace(/\/\*[\s\S]*?\*\//g, "");

  // Step 2: Split file into lines
  const lines = noMultiComments.split(/\r?\n/);

  // Step 3: Remove single-line comments (//)
  const uncommented = lines
    .map(line => line.split('//')[0].trim())
    .filter(line => line !== '');

  // Step 4: Join uncommented code into one string
  const joined = uncommented.join(' ');

  // Step 5: Tokenize — split on symbols, punctuation, operators, etc.
  const tokens = joined
    // split on punctuation, whitespace, or special chars — keeping them
    .split(/(\b|!|\\n|\s+|[(){};<>#"'=+\-*/%!&,])/)
    .map(token => token.trim())
    .filter(token => token !== '');

  return tokens;
}
