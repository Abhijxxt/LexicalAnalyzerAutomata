export default function Tokenize(word: string) {
    const tokens = [
        ["#", "DIRECTIVE"],
        ["include", "MODULE"],
        ["<", "LESS_THAN"],
        [">", "GREATER_THAN"],
        [".", "DOT"],
        ["int", "INTEGER"],
        ["float", "FLOAT"],
        ["char", "CHARACTER"],
        ["double", "DOUBLE"],
        ["(", "LEFT_PAREN"],
        [")", "RIGHT_PAREN"],
        ["{", "LEFT_BRACE"],
        ["}", "RIGHT_BRACE"],
        [";", "SEMICOLON"],
        [",", "COMMA"],
        ["printf", "PRINT"],
        ['"', "QUOTE"],
        ["=", "ASSIGNMENT"],
        ["+", "ADDITION"],
        ["-", "MINUS"],
        ["*", "MULTIPLY"],
        ["/", "DIVIDE"],
        ["%", "MODULUS"],
        ["\n", "NEWLINE"],
        ["!", "EXCLAMATION"],
        ["if", "IF_STATEMENT"],
        ["else", "ELSE_STATEMENT"],
        ["return", "RETURN_STATEMENT"],
    ];

    for(let i=0; i<tokens.length; i++) {
        if(word === tokens[i][0]) {
            return tokens[i][1];
        }
    };
    return word;
}