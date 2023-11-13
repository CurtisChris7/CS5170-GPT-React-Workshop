import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: "<PUT YOUR API KEY HERE>"
});

const getGptResonse =  async (messages) => await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
});

export default getGptResonse;