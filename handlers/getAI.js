const openai = require("openai");
const openAIKey = process.env.OPENAI_API_KEY;

const openAIInstance = new openai({
  apiKey: openAIKey,
});

async function getAI(request, response) {
  try {
    const jobTitle = request.query.jobTitle;
    const jobDescription = request.query.jobDescription;

    const completion = await openAIInstance.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Create a cover letter with this title: ${jobTitle} and description: ${jobDescription}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const coverLetterContent = completion.choices[0].message.content;

    

    response.status(200).send({
      coverLetter: coverLetterContent,
    });
  } catch (e) {
    response.status(500).send('Error generating and saving cover letter', e);
  }
}

module.exports = getAI;
