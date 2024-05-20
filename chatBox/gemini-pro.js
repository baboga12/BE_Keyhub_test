const dotenv = require('dotenv'); // Import dotenv for environment variables
dotenv.config(); // Load environment variables from a `.env` file

const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import GoogleGenerativeAI class

const apiKey = process.env.API_KEY; // Access API key from environment variable

const genAI = new GoogleGenerativeAI(apiKey); // Create GoogleGenerativeAI instance

const run = async (req,res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return res.status(200).json(
        {
            success: true,
            statusCode: 200,
            message: 'AI content generated',
            result: text,
        })
  } catch (err) {
    console.log(err);
    console.log('--------------------------------------------------------------------------------------------------------------------');
    return res.status(500).json(
        {
            success: false,
            statusCode: 500, 
            message: 'Error from Gemini AI',
            result: null,
        })
  }
}

module.exports = {run}; // Export the run function