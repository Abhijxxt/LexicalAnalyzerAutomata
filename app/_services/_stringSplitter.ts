export default function StringSplitter(fileData: string | null): string[] | null {
  if (!fileData) {
    return null;
  }

  // Step 1: Split file into lines
  const lines = fileData.split(/\r?\n/);

  // Step 2: Remove comments after //
  const uncommented = lines
    .map(line => line.split('//')[0].trim())
    .filter(line => line !== '');

  // Step 3: Join uncommented code into one string
  const joined = uncommented.join(' ');

  // Step 4: Tokenize — split on spaces, symbols, punctuation, !, or escaped newline (\n)
  const tokens = joined
    // split on punctuation, whitespace, or special chars — keeping them
    .split(/(\b|!|\\n|\s+|[(){};<>#"'=+\-*/%!&,])/)
    .map(token => token.trim())
    .filter(token => token !== '');

  return tokens;
}
