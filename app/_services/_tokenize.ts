export default function Tokenize(word: string) {
const tokens = [
  // Directives
  ["#", "DIRECTIVE", "SYMBOL"],
  ["include", "INCLUDE_DIRECTIVE", "KEYWORD"],
  ["define", "DEFINE_DIRECTIVE", "KEYWORD"],
  ["undef", "UNDEF_DIRECTIVE", "KEYWORD"],
  ["ifdef", "IFDEF_DIRECTIVE", "KEYWORD"],
  ["ifndef", "IFNDEF_DIRECTIVE", "KEYWORD"],
  ["endif", "ENDIF_DIRECTIVE", "KEYWORD"],
  ["pragma", "PRAGMA_DIRECTIVE", "KEYWORD"],

  // Data types
  ["int", "INTEGER", "DATA_TYPE"],
  ["float", "FLOAT", "DATA_TYPE"],
  ["char", "CHARACTER", "DATA_TYPE"],
  ["double", "DOUBLE", "DATA_TYPE"],
  ["long", "LONG", "DATA_TYPE"],
  ["short", "SHORT", "DATA_TYPE"],
  ["void", "VOID", "DATA_TYPE"],
  ["signed", "SIGNED", "DATA_TYPE"],
  ["unsigned", "UNSIGNED", "DATA_TYPE"],
  ["struct", "STRUCT", "DATA_TYPE"],
  ["union", "UNION", "DATA_TYPE"],
  ["enum", "ENUM", "DATA_TYPE"],
  ["typedef", "TYPEDEF", "KEYWORD"],

  // Control flow
  ["if", "IF_STATEMENT", "KEYWORD"],
  ["else", "ELSE_STATEMENT", "KEYWORD"],
  ["switch", "SWITCH_STATEMENT", "KEYWORD"],
  ["case", "CASE_STATEMENT", "KEYWORD"],
  ["default", "DEFAULT_STATEMENT", "KEYWORD"],
  ["break", "BREAK_STATEMENT", "KEYWORD"],
  ["continue", "CONTINUE_STATEMENT", "KEYWORD"],
  ["return", "RETURN_STATEMENT", "KEYWORD"],
  ["goto", "GOTO_STATEMENT", "KEYWORD"],

  // Loops
  ["for", "FOR_LOOP", "KEYWORD"],
  ["while", "WHILE_LOOP", "KEYWORD"],
  ["do", "DO_LOOP", "KEYWORD"],

  // Operators
  ["=", "ASSIGNMENT", "OPERATOR"],
  ["+", "ADDITION", "OPERATOR"],
  ["-", "SUBTRACTION", "OPERATOR"],
  ["*", "MULTIPLICATION", "OPERATOR"],
  ["/", "DIVISION", "OPERATOR"],
  ["%", "MODULUS", "OPERATOR"],
  ["!", "LOGICAL_NOT", "OPERATOR"],

  // Bitwise operators
  ["&", "BITWISE_AND", "OPERATOR"],
  ["|", "BITWISE_OR", "OPERATOR"],
  ["^", "BITWISE_XOR", "OPERATOR"],
  ["~", "BITWISE_NOT", "OPERATOR"],
  
  // Punctuation & symbols
  ["(", "LEFT_PAREN", "SYMBOL"],
  [")", "RIGHT_PAREN", "SYMBOL"],
  ["{", "LEFT_BRACE", "SYMBOL"],
  ["}", "RIGHT_BRACE", "SYMBOL"],
  ["[", "LEFT_BRACKET", "SYMBOL"],
  ["]", "RIGHT_BRACKET", "SYMBOL"],
  [";", "SEMICOLON", "SYMBOL"],
  [",", "COMMA", "SYMBOL"],
  [".", "DOT", "SYMBOL"],
  [":", "COLON", "SYMBOL"],
  ["?", "QUESTION_MARK", "SYMBOL"],
  ["<", "LEFT_ARROW", "SYMBOL"],
  [">", "RIGHT_ARROW", "SYMBOL"],

  // Literals and constants
  ['"', "DOUBLE_QUOTE", "SYMBOL"],
  ["'", "SINGLE_QUOTE", "SYMBOL"],
  ["true", "BOOLEAN_TRUE", "KEYWORD"],
  ["false", "BOOLEAN_FALSE", "KEYWORD"],
  ["NULL", "NULL_VALUE", "KEYWORD"],

  // Common functions
  ["printf", "PRINTF", "KEYWORD"],
  ["scanf", "SCANF", "KEYWORD"],
  ["main", "MAIN_FUNCTION", "IDENTIFIER"],
  ["sizeof", "SIZEOF_OPERATOR", "KEYWORD"],

  
  // Special characters
  ["\\n", "NEWLINE", "SPECIAL_CHARACTER"],
  ["\\t", "TAB", "SPECIAL_CHARACTER"],
];

    for(let i=0; i<tokens.length; i++) {
        if(word === tokens[i][0]) {
            return {token: tokens[i][1], type: tokens[i][2]};
        }
    };
    return {token: word, type: "IDENTIFIER"};
}