# HTML-to-AST Converter

This project is an HTML-to-AST (Abstract Syntax Tree) converter. It takes HTML code as input and generates a hierarchical representation of the HTML structure in the form of an AST. The AST can be further analyzed or transformed for various purposes, such as parsing, linting, code generation, or other static analysis tasks.

## Features

- Converts HTML code into an Abstract Syntax Tree (AST).
- Supports parsing of HTML5 syntax.
- Handles common HTML elements, attributes, and entities.
- Provides a straightforward and intuitive API for usage.
- Can be extended to support custom tags or attributes.
- Works both on the client-side and server-side.

## Installation

To use this project, follow these steps:

```bash
git clone https://github.com/christiananagnostou/html-ast.git
cd html-ast
npm install
```

## Usage

The project provides a simple API to convert HTML to an AST. Here's an example of how to use it:

```javascript
const { convertToAST } = require('./html-ast');

const htmlCode = '<div><p>Hello, World!</p></div>';
const ast = convertToAST(htmlCode);

console.log(ast);
```

The convertToAST function takes an HTML string as input and returns the corresponding AST object. The AST structure represents the HTML elements and their relationships in a hierarchical manner.


Save the changes and use the modified converter.

## Contributing
Contributions to this project are welcome! If you find any bugs, have suggestions for improvement, or want to add new features, please feel free to open an issue or submit a pull request. Make sure to follow the project's code style and guidelines.
