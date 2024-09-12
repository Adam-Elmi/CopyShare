![CopyShare Logo](/assets/CopyShare.png)

___

**CopyShare** is a lightweight JavaScript library that provides easy and versatile clipboard operations. It allows you to copy text, code, images, video URLs, and links to the clipboard, with built-in error handling and history management.


[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md) ![Version](https://img.shields.io/npm/v/copy-share) [![License](https://img.shields.io/npm/l/copy-share)](LICENSE)



## Features



- **Copy Text**: Safely copy plain text to the clipboard.

- **Copy Code**: Copy code snippets with syntax sanitization.

- **Copy Image**: Copy images directly to the clipboard or as URLs.

- **Copy Video URL**: Copy video URLs to the clipboard.

- **Copy Link**: Copy HTML links to the clipboard.

- **History Management**: Track copied items and clear history.



## Installation



To install CopyShare, use npm:



```bash

npm install copy-share

```



## Quick Start

To quickly start using CopyShare in your web project:

1. Add this script tag to your HTML:

```html
<script type="module">
   import { copyText } from 'https://cdn.jsdelivr.net/npm/copy-share/copyShare.min.js';

   // Get the button element
   const btn = document.querySelector('#btn');

   // Add click event listener to the button
   btn.addEventListener('click', () => {
       // Get the text from the input element
       const text = document.querySelector('#text').value;
       // Copy the text to clipboard using copyText function
       copyText(text);
   });
</script>
```

# Usage

### `Option 1: Import the Entire Library`:

You can import the entire library and use the methods via the copyShare object:

```js

import copyShare from 'copy-share';



copyShare.copyText('Hello, Adam!');



```

### `Option 2: Use Named Imports`:

Alternatively, you can import specific methods directly:

```js

import { copyText, copyCode } from 'copy-share';



copyText('Hello, Adam!');

copyCode('console.log("Hello, world!");', 'javascript');



```



# Documentation

- [API](API.md)

- [CopyShare Website](https://copy-share-docs.vercel.app)
