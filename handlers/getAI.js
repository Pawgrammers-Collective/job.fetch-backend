const openai = require("openai");
const openAIKey = process.env.OPENAI_API_KEY;

const openAIInstance = new openai({
  apiKey: openAIKey,
});

async function getAI(request, response) {
  jobTitle = request.query.jobTitle;
  jobDescription = request.query.jobDescription;

  const completion = await openAIInstance.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Create a cover letter with this title : ${jobTitle} and description: ${jobDescription}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  response.send(completion);
  console.log(completion.choices[0]);
}

module.exports = getAI;