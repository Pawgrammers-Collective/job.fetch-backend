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
      console.log(request.body.jobDescription);
      console.log(request.body.coverletter.coverLetter);
      let coverLetter = request.body.coverletter.coverLetter;
      let jobDescription = request.body.jobDescription;
      let userEmail = request.user.email;
      let save = {
        coverletter: coverLetter,
        jobDescription: jobDescription,
        email: userEmail
      }
      let addedSavedCover = await SavedAI.create(save)

      response.status(201).send(addedSavedCover)

    } catch (e) {
      response.status(500).send({message: 'ai save not working', error: e.message});
    }
  }
}

module.exports = { getAI, saveAI };
