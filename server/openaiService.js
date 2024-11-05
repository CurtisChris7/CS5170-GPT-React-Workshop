/**
 * Used for connecting to OpenAI.
 * Provides connection, and response function wrapper
 * @author Christopher Curtis
 */
import OpenAI from 'openai';
import fs from 'fs';

// Creates an OpenAI connection using the provided api key
const openai = new OpenAI({
    apiKey: "<YOUR API KEY HERE>"
});

/**
 * Function for getting a response from the gpt model.
 * Uses the provided message history
 * @param messages the message history to load in
 * @returns gpt response object
 */
const getGptResonse =  async (messages) => await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
});

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

const getImageResponse =  async (messages, path) => await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
    {
        role: "user", 
        content: [
            {
                "type": "text",
                "text": "Describe this image"
              },
            { 
                "type": "image_url",
                "image_url": {
                    "url": "data:image/jpeg;base64," + base64_encode(path),
            }
        }] 
    }, 
     ...messages],
});

export { getGptResonse, getImageResponse };