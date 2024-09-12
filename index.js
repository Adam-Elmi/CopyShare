class CopyShare {
    constructor() {
        this._successMessage = null;
        this._errorMessage = null;
        this.history = [];

        // Bind methods to `this`
        this.copyText = this.copyText.bind(this);
        this.copyImage = this.copyImage.bind(this);
        this.copyVideoUrl = this.copyVideoUrl.bind(this);
        this.copyCode = this.copyCode.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.getHistory = this.getHistory.bind(this);
        this.copyClear = this.copyClear.bind(this);
    }

    sanitizeText(text) {
        return text.replace(/[<>&"']/g, match => {
            const escape = {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return escape[match];
        });
    }

    async copyText(text) {
        if (!text) {
            console.error("The text parameter is missing or empty.");
            this.notify('The text parameter is missing or empty.!', 'error');
            return;
        }
        const mimeType = 'text/plain';
        const sanitizedText = this.sanitizeText(text);
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(sanitizedText);
                this._successMessage = `Text is copied: ${sanitizedText}`;
                console.log(this._successMessage);
                this.history.push({ type: mimeType, content: sanitizedText });
                this.notify('Text is copied to clipboard!');
            } catch (err) {
                this._errorMessage = `Failed to copy the text into clipboard: ${err}`;
                console.error(this._errorMessage);
                this.notify('Failed to copy!', 'error');
            }
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = sanitizedText;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this._successMessage = `Text is copied: ${sanitizedText}`;
                console.log(this._successMessage);
                this.history.push({ type: mimeType, content: sanitizedText });
                this.notify('Text is copied to clipboard!');
            } catch (err) {
                this._errorMessage = `Failed to copy the text: ${err}`;
                console.error(this._errorMessage);
                this.notify('Failed to copy!', 'error');
            }
            document.body.removeChild(textarea);
        }
    }

    async copyCode(code, language = '') {
        if (!code) {
            console.error("The code parameter is missing or empty.");
            this.notify('The code parameter is missing or empty!', 'error');
            return;
        }
        const mimeType = this.getCodeMimeType(language);
        const sanitizedCode = this.sanitizeText(code);
        const formattedCode = this.formatCode(sanitizedCode, language);
        
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(formattedCode);
                this._successMessage = `Code is copied: ${formattedCode}`;
                console.log(this._successMessage);
                this.history.push({ type: 'code', language, content: formattedCode });
                this.notify('Code is copied to clipboard!');
            } catch (err) {
                this._errorMessage = `Failed to copy the code text into clipboard: ${err}`;
                console.error(this._errorMessage);
                this.notify('Failed to copy!', 'error');
            }
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = formattedCode;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this._successMessage = `Code is copied: ${formattedCode}`;
                console.log(this._successMessage);
                this.history.push({ type: 'code', language, content: formattedCode });
                this.notify('Code is copied to clipboard!');
            } catch (err) {
                this._errorMessage = `Failed to copy the code: ${err}`;
                console.error(this._errorMessage);
                this.notify('Failed to copy!', 'error');
            }
            document.body.removeChild(textarea);
        }
    }

    formatCode(code, language) {
        // Basic formatting: indentation and language comment
        const indent = '    ';
        const formattedCode = code.split('\n').map(line => indent + line).join('\n');
        return `// Language: ${language}\n${formattedCode}`;
    }

    getCodeMimeType(language) {
        const mimeTypes = {
            'javascript': 'application/javascript',
            'python': 'text/x-python',
            'html': 'text/html',
            'css': 'text/css',
            'json': 'application/json',
            'xml': 'application/xml',
            'sql': 'application/sql',
            'php': 'application/php',
            'ruby': 'application/ruby',
            'java': 'application/java',
            'csharp': 'application/csharp',
            'typescript': 'application/typescript',
            'go': 'application/go',
            'rust': 'application/rust',
            'kotlin': 'application/kotlin',
            'swift': 'application/swift',
            'r': 'application/r',
            'scala': 'application/scala',
            'haskell': 'application/haskell',
            'elixir': 'application/elixir',
            'erlang': 'application/erlang',
            'lua': 'application/lua',
            'perl': 'application/perl',
        };
        return mimeTypes[language.toLowerCase()] || 'text/plain';
    }

    sanitizeUrl(link) {
        try {
            const url = new URL(link);
            if (url.protocol === 'https:' || url.protocol === 'http:') {
                return url.toString();
            }
        } catch {
            return '';
        }
        return '';
    };

    async copyImage(imageUrl) {
        if (!imageUrl) {
            console.error("The image URL parameter is missing or empty.");
            this.notify('The image URL parameter is missing or empty!', 'error');
            return;
        }
        const mimeType = "image/png";
        const sanitizedUrl = this.sanitizeUrl(imageUrl);
        if (navigator.clipboard) {
            this.history.push({ type: mimeType, content: sanitizedUrl });
            try {
                const response = await fetch(sanitizedUrl);
                if (!response.ok) throw new Error("Network response was not ok");
                const blob = await response.blob();
                const img = document.createElement("img");
                img.src = URL.createObjectURL(blob);
                
                await new Promise(resolve => {
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob(async (pngBlob) => {
                            try {
                                await navigator.clipboard.write([new ClipboardItem({ [mimeType]: pngBlob })]);
                                this._successMessage = "Image copied successfully!";
                                console.log(this._successMessage);
                                this.notify('Image is copied to clipboard');
                            } catch (err) {
                                this._errorMessage = `Failed to copy the image: ${err}`;
                                console.error(this._errorMessage);
                                this.notify('Failed to copy!', 'error');
                            }
                            resolve();
                        }, mimeType);
                    };
                });
            } catch (err) {
                this._errorMessage = `Failed to fetch or process the image: ${err}`;
                console.error(this._errorMessage);
                try {
                    await navigator.clipboard.writeText(sanitizedUrl);
                    this._successMessage = "Image URL copied successfully!";
                    console.log(this._successMessage);
                    this.history.push({ type: mimeType, content: sanitizedUrl });
                    this.notify('Image URL is copied to clipboard!');
                } catch (err) {
                    this._errorMessage = `Failed to copy the image URL: ${err}`;
                    console.error(this._errorMessage);
                    this.notify('Failed to copy!', 'error');
                }
            }
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = sanitizedUrl;
            document.body.appendChild(textarea);
            textarea.select();
            this.history.push({ type: mimeType, content: sanitizedUrl });
            try {
                document.execCommand('copy');
                this._successMessage = "Image URL copied successfully!";
                console.log(this._successMessage);
                this.notify('Image URL is copied to clipboard!');
            } catch (err) {
                this._errorMessage = `Failed to copy the image URL: ${err}`;
                console.error(this._errorMessage);
                this.notify('Failed to copy!', 'error');
            }
            document.body.removeChild(textarea);
        }
    }

    async copyVideoUrl(videoUrl) {
        if (!videoUrl) {
            console.error("The video URL parameter is missing or empty.");
            this.notify('The video URL parameter is missing or empty!', 'error');
            return;
        }
        const mimeType = 'video/mp4';
        const sanitizedUrl = this.sanitizeUrl(videoUrl);
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(sanitizedUrl);
                this._successMessage = "Video URL copied successfully!";
                console.log(this._successMessage);
                this.history.push({ type: mimeType, content: sanitizedUrl });
                this.notify('Video URL is copied to clipboard!');
            } catch (err) {
                this._errorMessage = `Failed to copy the video URL: ${err}`;
                console.error(this._errorMessage);
                this.notify('Failed to copy!', 'error');
            }
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = sanitizedUrl;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this._successMessage = "Video URL copied successfully!";
                console.log(this._successMessage);
                this.history.push({ type: mimeType, content: sanitizedUrl });
                this.notify('Video URL is copied to clipboard!');
            } catch (err) {
                this._errorMessage = `Failed to copy the video URL: ${err}`;
                console.error(this._errorMessage);
                this.notify('Failed to copy!', 'error');
            }
            document.body.removeChild(textarea);
        }
    }

    async copyLink(link) {
        if (!link) {
            console.error("The provided link is missing or empty.");
            this.notify('The provided link is missing or empty!', 'error');
            return;
        }
        const mimeType = 'text/html';
        const sanitizedLink = this.sanitizeUrl(link);
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(sanitizedLink);
                this._successMessage = "Link URL copied successfully!";
                console.log(this._successMessage);
                this.history.push({ type: mimeType, content: sanitizedLink });
                this.notify('Link URL is copied to clipboard!');
            } catch (err) {
                this._errorMessage = `Failed to copy the link URL: ${err}`;
                console.error(this._errorMessage);
                this.notify('Failed to copy!', 'error');
            }
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = sanitizedLink;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this._successMessage = "Link URL copied successfully!";
                console.log(this._successMessage);
                this.history.push({ type: mimeType, content: sanitizedLink });
                this.notify('Link URL is copied to clipboard!');
            } catch (err) {
                this._errorMessage = `Failed to copy the link URL: ${err}`;
                console.error(this._errorMessage);
                this.notify('Failed to copy!', 'error');
            }
            document.body.removeChild(textarea);
        }
    }

    getHistory() {
        return [...this.history];
    }

    copyClear() {
        this.history.length = 0;
        this.notify('History cleared!', 'clear')
    }

    notify(message, type = 'success') {
        // Create the notify element
        const div = document.createElement('div');
        const notifyElement = document.createElement('p');
        notifyElement.textContent = message;
        
        // Colors
        const colors = {
            success: '#40A578',
            error: '#EE4E4E',
            clear: '#FFC94A'
        };

        // Apply inline styles
        div.style.cssText = `
            width: fit-content;
            padding: 0 10px;
            background-color: ${colors[type]};
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            opacity: 1;
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 99999;
            transform: translate(-50%, -50%);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        `
        notifyElement.style.cssText = `
            text-align: center;
            line-height: 2;
            color: white;
            font-size: 10px; 
        `;

        div.appendChild(notifyElement);
        document.body.appendChild(div);
    
        // Fade out and move up
        setTimeout(() => {
            div.style.opacity = '0';
            div.style.transform = 'translate(-50%, -60%)';
        }, 1000);
    
        // Remove the element after the transition
        setTimeout(() => {
            document.body.removeChild(div);
        }, 1500);
    }

    getCodeMimeType(language) {
        const mimeTypes = {
            'javascript': 'application/javascript',
            'python': 'text/x-python',
            'html': 'text/html',
            'css': 'text/css',
            // Add more language-specific MIME types as needed
        };
        return mimeTypes[language.toLowerCase()] || 'text/plain';
    }
};

const copyShare = new CopyShare();
const { copyText, copyImage, copyVideoUrl, copyCode, copyLink, copyHistory, copyClear } = copyShare;
export { copyText, copyImage, copyVideoUrl, copyCode, copyLink, copyHistory, copyClear };
export default copyShare;
