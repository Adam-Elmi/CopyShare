# CopyShare API Documentation

This document provides detailed information on the CopyShare library's API, including parameters, return values, and example usage.

## Table of Contents

- [copyText](#copytext)
- [copyCode](#copycode)
- [copyImage](#copyimage)
- [copyVideoUrl](#copyvideourl)
- [copyLink](#copylink)
- [copyHistory](#copyhistory)
- [copyClear](#copyclear)

## Methods
### `copyText`
**Syntax**

```js
copyText(text);
```
- **Parameters**: 
    - text (string): The plain text that you want to copy to the clipboard.
## Example
```js
copyText('Hello World');
```
___
### `copyCode`
**Syntax**

```js
copyCode(code);
```
- **Parameters**: 
    - code (string): The code snippet you want to copy to the clipboard.
## Example
```js
copyCode('console.log("Hello, world!");');
```
___
### `copyImage`
**Syntax**
```js
copyImage(imageUrl);
```
- **Parameters**: 
    - imageUrl (string): The image URL you want to copy to the clipboard.
## Example
```js
copyImage('https://example.com/image.png');
```
___
### `copyVideoUrl`
**Syntax**
```js
copyVidoeUrl(vidoeUrl);
```
- **Parameters**: 
    - vidoeUrl (string): The URL of the video you want to copy to the clipboard.
## Example
```js
copyVideoUrl('https://example.com/video.mp4');
```
___
### `copyLink`
**Syntax**
```js
copyLink(link);
```
- **Parameters**: 
    - link (string): The HTML link you want to copy to the clipboard.
## Example
```js
copyLink('https://example.com');
```
___
### `copyHistory`
**Syntax**
```js
method.then(() => copyHistory());
```
- **Parameters**: 
    - method (Promise): The method (e.g., copyText, copyCode) that returns a promise. 

## Example
```js
copyText('Hello, World!').then(() => copyHistory());
```
___
### `copyClear`
**Syntax**
```js
copyClear();
```
- **Parameters**:  
  - Does not accept any parameters.
## Example
```js
copyClear(); // History is cleared
```
___

[Read our official documentation](https://copy-share-docs.vercel.app)
