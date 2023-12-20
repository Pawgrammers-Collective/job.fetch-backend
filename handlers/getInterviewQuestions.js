const openai = require("openai");
const openAIKey = process.env.OPENAI_API_KEY;

const openAIInstance = new openai({
  apiKey: openAIKey,
});


async function getInterviewQuestions(request, response){

 try {
  
  const completion = await openAIInstance.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Give me a new interview question based on the STAR method, tailored to a software developer`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  response.send(completion.choices[0].message.content);
 } catch (e) {
  console.log("no questions for you :(", e)
 }
}

module.exports = getInterviewQuestions;