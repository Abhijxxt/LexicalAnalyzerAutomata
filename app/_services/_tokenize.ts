export default function Tokenize(word: string) {
    const tokens = [
        ["#", "DIRECTIVE", "SYMBOL"],
        ["include", "MODULE", "KEYWORD"],
        ["<", "LESS_THAN", "OPERATOR"],
        [">", "GREATER_THAN", "OPERATOR"],
        [".", "DOT", "OPERATOR"],
        ["int", "INTEGER", "DATA_TYPE"],
        ["float", "FLOAT", "DATA_TYPE"],
        ["char", "CHARACTER", "DATA_TYPE"],
        ["double", "DOUBLE", "DATA_TYPE"],
        ["(", "LEFT_PAREN","SYMBOL"],
        [")", "RIGHT_PAREN", "SYMBOL"],
        ["{", "LEFT_BRACE", "SYMBOL"],
        ["}", "RIGHT_BRACE", "SYMBOL"],
        [";", "SEMICOLON", "SYMBOL"],
        [",", "COMMA", "SYMBOL"],
        ["printf", "PRINT", "KEYWORD"],
        ['"', "QUOTE", "SYMBOL"],
        ["=", "ASSIGNMENT", "OPERATOR"],
        ["+", "ADDITION", "OPERATOR"],
        ["-", "MINUS", "OPERATOR"],
        ["*", "MULTIPLY", "OPERATOR"],
        ["/", "DIVIDE", "OPERATOR"],
        ["%", "MODULUS", "OPERATOR"],
        ["\n", "NEWLINE", "SPECIAL_CHARACTER"],
        ["\t", "SPACING", "SPECIAL_CHARACTER"],
        ["!", "EXCLAMATION", "OPERATOR"],
        ["if", "IF_STATEMENT", "KEYWORD"],
        ["else", "ELSE_STATEMENT", "KEYWORD"],
        ["return", "RETURN_STATEMENT", "KEYWORD"],
    ];

    for(let i=0; i<tokens.length; i++) {
        if(word === tokens[i][0]) {
            return {token: tokens[i][1], type: tokens[i][2]};
        }
    };
    return {token: word, type: "IDENTIFIER"};
}