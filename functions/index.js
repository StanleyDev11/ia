const functions = require("firebase-functions");
const { OpenAI } = require("openai");
const cors = require("cors")({ origin: true });

const openai = new OpenAI({
  apiKey: functions.config().openai.key, // stocké en variable d'env
});

exports.generatePitch = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Méthode non autorisée");
    }

    const idea = req.body.idea;

    try {
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-4o", // ou gpt-3.5-turbo
        messages: [
          {
            role: "system",
            content: "Tu es un assistant qui aide à créer un pitch de projet basé sur le Lean Canvas.",
          },
          {
            role: "user",
            content: `Voici mon idée : ${idea}`,
          },
        ],
        temperature: 0.7,
      });

      res.json({ pitch: chatResponse.choices[0].message.content });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur de génération de pitch");
    }
  });
});
