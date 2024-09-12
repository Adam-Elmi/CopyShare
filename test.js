import { JSDOM } from 'jsdom';
import copyShare from './index.js';

// Set up JSDOM environment
const { window } = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
global.window = window;
global.document = window.document;
global.navigator = window.navigator;
global.fetch = window.fetch;

// Pretend the Clipboard API
global.navigator.clipboard = {
    writeText: async (text) => {
        console.log(`Pretend clipboard writeText: ${text}`);
    },
    write: async (items) => {
        console.log(`Pretend clipboard write: ${items}`);
    }
    
};


async function runTests() {
    // Test copyText method
    await copyShare.copyText('Hello World');
    console.log('Test copyText:');
    console.log('Success Message:', copyShare._successMessage);
    console.log('History:', copyShare.history);
    console.log('_'.repeat(35));

    // Test copyCode method
    await copyShare.copyCode('console.log("Hello World");');
    console.log('Test copyCode:');
    console.log('Success Message:', copyShare._successMessage);
    console.log('History:', copyShare.history);
    console.log('_'.repeat(35));
    
    // Test copyVideoUrl method
    await copyShare.copyVideoUrl('https://example.com/video.mp4');
    console.log('Test copyVideoUrl:');
    console.log('Success Message:', copyShare._successMessage);
    console.log('History:', copyShare.history);
    console.log('_'.repeat(35));

    // Test copyLink method
    await copyShare.copyLink('https://example.com');
    console.log('Test copyLink:');
    console.log('Success Message:', copyShare._successMessage);
    console.log('History:', copyShare.history);
    console.log('_'.repeat(35));

        // Test copyImage method
        copyShare.copyImage('https://via.placeholder.com/150.png');
        console.log('Test copyImage:');
        console.log('Success Message: Image copied successfully!');

        // Check if image URL is in history
        const imageUrl = 'https://via.placeholder.com/150.png';
        const isImageUrlInHistory = copyShare.history.some(item => item.content === imageUrl);

        if (isImageUrlInHistory) {
            console.log('Note: Image URL copied as URL in history.');
        } else {
            console.log('Note: Image copied as element so it is not included in history.');
        }

        console.log('History:', copyShare.history);
        console.log('_'.repeat(35));


    // Test copyHistory method
    console.log('Test copyHistory:');
    copyShare.copyHistory(); // logs the history in console so it does not need another console
    console.log('_'.repeat(35));

    // Test copyClear method
    copyShare.copyClear();
    console.log('Test copyClear:');
    console.log('History:', copyShare.history);
    console.log('_'.repeat(35));
};

runTests();
