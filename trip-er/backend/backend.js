import express from 'express'
import openAI from 'openai'
import cors from 'cors'
import bodyParser from 'body-parser';

const openai = new openAI({
  apiKey: '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',
});

const app = express();
const port = 5123;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.send("Server is up & running");
});

app.post('/api/chat', async (req, res) => {
  const question = req.body["prompt"];
  const response = await getAnswer(question);
  res.send(response);

});

app.listen(port, ()=>{
    console.log("Server is started",port);
});

async function getAnswer(question) {
  console.log(question);
    var chat = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:personal:travel-gpt:95dtfUqE",
  messages: [
    {
      "role": "system",
      "content": "you are a helpful travel assistant and you are helping a user plan a trip. Here's the itinerary for your trip:"
    },
    {
      "role": "system",
      "content": "Day 1:\n- Arrival in Chennai\n- Check into a romantic hotel or resort\n- Visit Marina Beach for a romantic walk during sunset\n- Have a special dinner at a nice restaurant"
    },
    {
      "role": "system",
      "content": "Day 2:\n- Visit the Arignar Anna Zoological Park for a fun day together\n- Explore the Theosophical Society for some peaceful time in nature\n- Enjoy a traditional South Indian lunch\n- In the evening, visit the Kapaleeshwarar Temple for a cultural experience"
    },
    {
      "role": "system",
      "content": "Day 3:\n- Take a boat ride in the Pulicat Lake for a relaxing morning\n- Visit the Valluvar Kottam monument\n- Explore the street markets for some souvenir shopping\n- Have a romantic dinner cruise on the Chennai coastline"
    }
    
    ,
    {
      "role": "user",
      "content": `<${question}>` 
    }
  ],
  temperature: 1,
  max_tokens: 1000,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

  return chat;
  }
