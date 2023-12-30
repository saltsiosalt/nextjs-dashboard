// import OpenAI from 'openai';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const openAi = new OpenAI({
//   apiKey: process.env.NEXT_OPENAI_API_KEY,
// });

// // 応答データの型定義を作成
// type ResponseData = {
//   text: string;
// };

// // APIリクエストに送信される body の型定義を作成
// interface GenerateNextApiRequest extends NextApiRequest {
//   body: {
//     prompt: string;
//   };
// }

// export const POST = async (
//   // req: GenerateNextApiRequest,
//   // res: NextApiResponse<ResponseData>,
//   request: Request,
// ): Promise<Response> => {
//   // try {
//   console.log('openAI実行前');
//   // OpenAI API にプロンプトを送信して回答を生成
//   const completion = await openAi.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content:
//           'あなたは１０歳向けの物語を作成する小説家のプロとして振る舞ってください。',
//       },
//       {
//         role: 'user',
//         content:
//           '「りんご」「ティラノザウルス」「鉛筆」を使って簡単な小説を書いてください。',
//       },
//     ],
//   });

//   console.log('openAI実行後');
//   console.log(completion.choices[0]);

//   // 生成された回答を取得
//   const response =
//     completion.choices[0].message.content || 'Sorry, there was an error.';
//   // res.status(200).json({ text: response });
//   return Response.json(response);
//   // } catch (error) {
//   //   // res.status(500);
//   // }
// };

import OpenAI from 'openai';
import ChatCompletionMessageParam from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// オプションですが推奨: エッジ ランタイムで実行します。
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  // リクエストの本文から「メッセージ」を抽出します。
  const { messages } = await req.json();
  console.log('openAI実行前1 :messages', messages);
  // console.log('openAI実行前1 :addMessages', addMessages[0].role);
  // console.log('openAI実行前1 :addMessages', addMessages[0].content);
  // const aaa = addMessages[0].role;

  // let defaultMessages: any = [
  //   {
  //     role: 'system',
  //     content:
  //       'あなたは１０歳向けの物語を作成する小説家のプロとして振る舞ってください。',
  //   },
  // {
  //   role: 'user',
  //   content:
  //     '「りんご」「トリケラトプス」「鉛筆」を使って簡単な小説を書いてください。',
  // },
  // ];
  // defaultMessages.push(addMessages);
  // console.log('openAI実行前2 :defaultMessages', defaultMessages);

  // プロンプトに基づいて OpenAI API に応答をリクエストします
  const response = await openai.chat.completions.create({
    // model: 'gpt-3.5-turbo',
    model: 'gpt-4',
    stream: true,
    messages: messages,
    // messages: messages,
    // messages: [
    //   {
    //     role: 'system',
    //     content:
    //       'あなたは１０歳向けの物語を作成する小説家のプロとして振る舞ってください。',
    //   },
    //   {
    //     role: 'user',
    //     content:
    //       '「りんご」「トリケラトプス」「鉛筆」を使って簡単な小説を書いてください。',
    //   },
    // ],
  });
  console.log('openAI実行後1');

  // 応答をわかりやすいテキストストリームに変換する
  const stream = OpenAIStream(response);
  console.log('openAI実行後2');
  // ストリームで応答する
  return new StreamingTextResponse(stream);
}
