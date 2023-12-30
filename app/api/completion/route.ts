import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// OpenAI API クライアントを作成します (これはエッジ フレンドリーです!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});

// 最高のパフォーマンスを得るためにランタイムをエッジに設定します
export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // プロンプトが表示されたら、OpenAI にストリーミングの完了を要求します
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    stream: true,
    temperature: 0.6,
    max_tokens: 300,
    prompt: `独自の特徴を持つビジネスのスローガンを 3 つ作成します。
 
    仕事: 猫のいる本屋さん
    スローガン: 「喉を鳴らすページ」、「本とひげ」、「小説と鼻づまり」
    仕事: ロッククライミングができるジム
    スローガン: 「最高のパフォーマンス」、「新たな高みに到達」、「自分らしくフィットして登頂」
    仕事: ${prompt}
    スローガン:`,
  });
  // 応答をわかりやすいテキストストリームに変換する
  const stream = OpenAIStream(response);
  // ストリームで応答する
  return new StreamingTextResponse(stream);
}
