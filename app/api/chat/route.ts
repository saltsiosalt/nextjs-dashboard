import OpenAI from 'openai';
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

  // プロンプトに基づいて OpenAI API に応答をリクエストします
  const response = await openai.chat.completions.create({
    // model: 'gpt-3.5-turbo',
    model: 'gpt-4',
    stream: true,
    messages: messages,
  });
  console.log('openAI実行後1');

  // 応答をわかりやすいテキストストリームに変換する
  const stream = OpenAIStream(response);
  console.log('openAI実行後2');
  // ストリームで応答する
  return new StreamingTextResponse(stream);
}
