'use client';
import { notoSansJp } from '@/app/ui/fonts';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import { showAlertModal } from '@/app/ui/dashboard/AlertModalManager';
import { AlertModalManager } from '@/app/ui/dashboard/AlertModalManager';
import { cardItem, CardItem } from '@/app/lib/cardItem';

export default function CardWrapper() {
  // setMessages: 「メッセージ」の状態をローカルで更新します。
  //     これは、クライアント上でメッセージを編集し、手動で「reload」メソッドをトリガーして AI 応答を再生成する場合に便利です。
  // reload: 指定されたチャット履歴の最後の AI チャット応答を再読み込みします。
  //     最後のメッセージがアシスタントからのものでない場合、アシスタントは API に新しい応答を生成するよう要求します。
  // append: ユーザーメッセージをチャットリストに追加します。
  //     これにより、アシスタントの応答を取得するための API 呼び出しがトリガーされます。
  //     @param message 追加するメッセージ
  //     @param options API 呼び出しに渡す追加のオプション
  const {
    append,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    setMessages,
    isLoading,
    stop,
  } = useChat({
    api: `/api/chat`,
  });

  // シャッフルしたカードを設定するための状態管理を設定
  const [shuffledItems, setShuffledItems] = useState([
    { name: '', title: '', image: '' },
  ]);
  // カードをシャッフルする
  function shuffleArray(array: CardItem[]) {
    for (let i = array.length - 1; i > 0; i--) {
      // ランダムなインデックスを生成
      const j = Math.floor(Math.random() * (i + 1));
      // 現在の要素とランダムな要素を交換
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    setShuffledItems(shuffleArray(cardItem));
  }, []);

  // クリックされたカードを識別するための状態管理を設定
  type SelectedCard = {
    index: number;
    name: string;
  };
  // 選択されたカードの index と name を保持する
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

  // カードがクリックされたときに実行される関数
  // クリックされたカードの index と name を selectedCards 配列に追加または削除します。
  const handleCardClick = (index: number, name: string) => {
    console.log('handleCardClickクリック');
    setSelectedCards((prevSelectedCards) => {
      const isAlreadySelected = prevSelectedCards.some(
        (card) => card.index === index,
      );
      if (isAlreadySelected) {
        return prevSelectedCards.filter((card) => card.index !== index);
      } else {
        return [...prevSelectedCards, { index, name }];
      }
    });
  };

  // 全てのカードの選択をクリアする
  const resetCards = () => {
    console.log('resetCardsクリック');
    setSelectedCards([]);
  };

  // 「送信」ボタンを追加し、そのボタンがクリックされたときの処理
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setMessages([]);
    console.log('selectedCards.length-1:', selectedCards.length);
    // カードの枚数チェックし、3枚でなければアラートを出す
    const showAlert = () => {
      showAlertModal({
        title: 'カードの選択がまちがってます！',
        message: 'カードは３つえらんでね',
      });
    };
    if (selectedCards.length !== 3) {
      showAlert();
      event.preventDefault();
      setIsSubmitted(false);
    } else {
      const cardStr = selectedCards
        .map(
          (card, index) =>
            `「${card.name}」` + (index < selectedCards.length - 1 ? '、' : ''),
        )
        .join('');
      const message = `# 前提: あなたは8歳向けの物語を作成する児童文学小説作家のプロとして振る舞ってください。
    # 質問: ${cardStr} を使って簡単な物語を書いてください。
    - 物語の内容は、8歳の男の子向けに、わかりやすい文章を作るよう心がけてください。
    - 文字数は700字以内にしてください。
    - 物語は「起承転結」（英語でdramatic structure）になるようにしてください。
    - 物語に登場する人の名前は日本人の名前にしてください。
    - 8歳の男の子が声に出して読めるように、できるだけ簡潔な文章を書くようにしてください。`;
      // setInput(cardStr);

      // AIの実行を止める（これがAIを起動させている！）
      append({ id: 'bbb', role: 'user', content: message });

      // AIの実行を止める（→これ消してもAIうごく。というかこれは不要）
      // handleSubmit(event);

      console.log('formSubmitクリック:event:', event);

      event.preventDefault();
      setIsSubmitted(true);
    }
  };

  const handleReturn = () => {
    if (isLoading) {
      stop();
    }
    setSelectedCards([]);
    setMessages([]);
    // カードをシャッフルし直す
    setShuffledItems([]);
    setShuffledItems(shuffleArray(cardItem));
    setIsSubmitted(false);
  };

  return (
    <>
      <AlertModalManager />
      {/* カードを選択する画面 */}
      {!isSubmitted && (
        <>
          <form onSubmit={formSubmit}>
            <h2>
              好きなカードを{' '}
              <a className="underline font-bold text-red-600">3つ </a>
              クリックして、「送信」ボタンを押してね！
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {shuffledItems.map((item, index) => (
                <button
                  type="button"
                  className={`rounded-xl p-2 shadow-sm ${
                    selectedCards.some((card) => card.index === index)
                      ? 'bg-red-500'
                      : 'bg-gray-50'
                  }`}
                  key={index}
                  onClick={() => handleCardClick(index, item.name)}
                >
                  <div
                    className={`${notoSansJp.className} truncate rounded-xl bg-white px-3 py-6 text-center text-2xl`}
                  >
                    <h3
                      className={`${notoSansJp.className} text-sm font-medium `}
                    >
                      {item.title}
                    </h3>
                    <Image
                      src={`/image/${item.image}`}
                      width={200}
                      height={200}
                      sizes="80vw"
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                      alt="fruit apple"
                    />
                  </div>
                </button>
              ))}
            </div>
            {selectedCards.map((card, index) => (
              <input
                key={index}
                type="hidden"
                name={`selectedCard_${index}`}
                value={card.name}
              />
            ))}

            {/* フッター要素 */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
              <div className="flex justify-evenly">
                <button
                  type="reset"
                  onClick={resetCards}
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  カードをえらびなおす
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  そうしんする
                </button>
              </div>
            </div>
          </form>
        </>
      )}

      {/* 送信ボタンクリック後の画面 */}
      {isSubmitted && (
        <div>
          <h2>選択されたカード:</h2>
          <ul>
            {selectedCards.map((card) => (
              <li key={card.index}>{card.name}</li>
            ))}
          </ul>
          <ul className="divide-gray-200 divide-y mt-4">
            {messages.map((m, index) => (
              <li className="whitespace-pre-wrap" key={index}>
                {m.role === 'user' ? '' : m.content}
                {/* {m.role === 'user' ? 'User: ' : 'AI: '} */}
                {/* {m.content} */}
              </li>
            ))}
          </ul>
          <button
            onClick={handleReturn}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            戻ってカードをえらびなおす
          </button>
        </div>
      )}
    </>
  );
}
