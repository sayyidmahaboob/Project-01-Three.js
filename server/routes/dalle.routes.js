import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

// getting the key
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// merging the instance
const openai = new OpenAIApi(config);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

// using post method to post new request and get response
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    //   getting the images through response
    const response = await openai.createImage({
      prompt,
      n: 1, //no of images
      size: "1024x1024", //image size
      response_format: "b64_json", //image format
    });

    //   saving the image response
    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
