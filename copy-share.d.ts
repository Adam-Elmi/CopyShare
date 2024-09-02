// copy-share.d.ts
declare module 'copy-share' {
    export function copyText(text: string): void;
    export function copyImage(imageUrl: string): void;
    export function copyVideoUrl(imageUrl: string): void;
    export function copyCode(code: string): void;
    export function copyLink(url: string): void;
}
