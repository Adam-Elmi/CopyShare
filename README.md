![CopyShare Logo](CopyShare.png)
___
**CopyShare** is a lightweight JavaScript library that provides easy and versatile clipboard operations. It allows you to copy text, code, images, video URLs, and links to the clipboard, with built-in error handling and history management.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
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

```html
<script type="module">
   import { copyText } from 'https://cdn.jsdelivr.net/npm/copy-share@1.1.0/copyShare.min.js';
        
            document.getElementById('btn').onclick = () => {
                copyText(document.getElementById('text').value);
        };
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
copyCode('console.log("Hello, world!");');

```

# Documentation
- - [API](API.md)
- [CopyShare Website](https://copy-share-docs.vercel.app)
