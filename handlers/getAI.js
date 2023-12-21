const openai = require("openai");
const openAIKey = process.env.OPENAI_API_KEY;
const SavedAI = require('../models/coverletter')
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

async function saveAI(request, response) {
  let filter = {};
  if (request.user) {
    filter.email = request.user.email

    try {
      console.log(request.body);
      let coverLetter = request.body.coverLetter;
      let userEmail = request.user.email;
      let save = {
        coverletter: coverLetter,
        email: userEmail
      }
      let addedSavedCover = await SavedAI.create(save)

      response.status(201).send(addedSavedCover)

    } catch (e) {
      response.send('ai save not working', e)
    }
  }
}

module.exports = { getAI, saveAI };
