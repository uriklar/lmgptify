import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const prisma = new PrismaClient();

function getFirst10Words(str: string) {
  return str.split(" ").slice(0, 10).join(" ");
}

export async function GET() {
  return NextResponse.json({ data: "Hello World" });
}

export async function POST(req: Request, res: Response) {
  const { prompt } = await req.json();

  console.log(prompt);

  if (!prompt) {
    return NextResponse.json({ error: "Please provide a prompt" });
  }

  try {
    const completion = await openai.createChatCompletion({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 150,
    });

    const choice = completion.data.choices[0].message;

    const newSearch = await prisma.search.create({
      data: {
        slug: slugify(getFirst10Words(prompt)),
        prompt: prompt,
        answer: choice?.content || "",
      },
    });

    return NextResponse.json({ data: newSearch.slug });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      NextResponse.json({ error: error });
    } else {
      NextResponse.json({ error: "An unknown error occurred" });
    }
  }
  ``;
}
