'use client';
import { notoSansJp } from '@/app/ui/fonts';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CardWrapper() {
  type CardItem = {
    name: string;
    title: string;
    image: string;
  };

  const cardItem: CardItem[] = [
    { name: 'りんご', title: 'りんご', image: 'fruit_apple.png' },
    {
      name: 'ティラノサウルス',
      title: 'ティラノサウルス',
      image: 'Tyrannosaurus.png',
    },
    { name: 'イグアノドン', title: 'イグアノドン', image: 'Iguanodon.png' },
    {
      name: 'トリケラトプス',
      title: 'トリケラトプス',
      image: 'Triceratops.png',
    },
    {
      name: 'エドモントサウルス',
      title: 'エドモントサウルス',
      image: 'dinosaur_edmontosaurus.png',
    },
    {
      name: 'ブラキオサウルス',
      title: 'ブラキオサウルス',
      image: 'Brachiosaurus.png',
    },
    {
      name: 'アパトサウルス',
      title: 'アパトサウルス',
      image: 'Apatosaurus.png',
    },
    {
      name: 'アンキロサウルス',
      title: 'アンキロサウルス',
      image: 'dinosaur_ankylosaurus.png',
    },
    {
      name: 'ヴェロキラプトル',
      title: 'ヴェロキラプトル',
      image: 'Velociraptor.png',
    },
    {
      name: 'パキケファロサウルス',
      title: 'パキケファロサウルス',
      image: 'dinosaur_pachycephalosaurus.png',
    },
    {
      name: 'パラサウロロフス',
      title: 'パラサウロロフス',
      image: 'dinosaur_parasaurolophus.png',
    },
    { name: 'デイノニクス', title: 'デイノニクス', image: 'Deinonychus.png' },
    { name: 'プテラノドン', title: 'プテラノドン', image: 'Pteranodon.png' },
    {
      name: 'スピノサウルス',
      title: 'スピノサウルス',
      image: 'spinosaurus.png',
    },
    {
      name: 'ケラトサウルス',
      title: 'ケラトサウルス',
      image: 'dinosaur_ceratosaurus.png',
    },
    { name: 'すべりだい', title: 'すべりだい', image: 'suberidai.png' },
    {
      name: '公園の水飲み場',
      title: '公園の水飲み場',
      image: 'kouen_mizunomiba.png',
    },
    { name: '公園', title: '公園', image: 'tatemono_kouen.png' },
    { name: 'えんぴつ', title: 'えんぴつ', image: 'pen_enpitsu_mark.png' },
    { name: 'ノート', title: 'ノート', image: 'book_note_empty.png' },
    {
      name: 'スパゲッティ',
      title: 'スパゲッティ',
      image: 'food_spaghetti_bolognese_meatsauce.png',
    },
    {
      name: 'ナポリタン',
      title: 'ナポリタン',
      image: 'food_spaghetti_neapolitan.png',
    },
    {
      name: 'カレーライス',
      title: 'カレーライス',
      image: 'food_curry_dorodoro.png',
    },
    { name: '食パン', title: '食パン', image: 'bread_syokupan.png' },
    {
      name: 'ピザトースト',
      title: 'ピザトースト',
      image: 'pan_pizza_toast.png',
    },
    {
      name: 'うんどうかい',
      title: 'うんどうかい',
      image: 'school_undoukai.png',
    },
    { name: '犬', title: '犬', image: 'dog_akitainu.png' },
    { name: '猫', title: '猫', image: 'cat11_moyou_sabatora_moyou_white.png' },
    { name: 'さんすう', title: 'さんすう', image: 'textbook_h_sansu.png' },
    { name: 'こくご', title: 'こくご', image: 'textbook_h_kokugo.png' },
    { name: 'りか', title: 'りか', image: 'textbook_h_rika.png' },
    { name: 'しゃかい', title: 'しゃかい', image: 'textbook_h_syakai.png' },
    { name: '海', title: '海', image: 'umi_beach.png' },
    { name: 'うきわ', title: 'うきわ', image: 'ukiwa.png' },
    { name: 'プール', title: 'プール', image: 'suiei_seoyogi.png' },
    { name: '木', title: '木', image: 'tree_yellowgreen.png' },
    {
      name: '料理する人',
      title: '料理する人',
      image: 'cooking_chef_man_asia.png',
    },
    {
      name: 'パティシエ',
      title: 'パティシエ',
      image: 'kid_job_boy_patissier.png',
    },
    { name: 'シェフ', title: 'シェフ', image: 'kid_job_boy_chef.png' },
    { name: '給食', title: '給食', image: 'kyusyoku_boy_mask.png' },
    {
      name: 'ザトウクジラ',
      title: 'ザトウクジラ',
      image: 'whale_06_zatoukujira.png',
    },
  ];

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
    setSelectedCards([]);
  };

  // 「送信」ボタンを追加し、そのボタンがクリックされたときの処理
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReturn = () => {
    setIsSubmitted(false);
  };

  return (
    <>
      {/* カードを選択する画面 */}
      {!isSubmitted && (
        <>
          <h2>好きなカードをクリックして、「送信」ボタンを押してね！</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shuffledItems.map((item, index) => (
              <button
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
                    className={`${notoSansJp.className} text-sm font-medium break-words`}
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
          {/* フッター要素 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
            <div className="flex justify-evenly">
              <button
                onClick={resetCards}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                カードをえらびなおす
              </button>
              <button
                onClick={handleSubmit}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                そうしんする
              </button>
            </div>
          </div>
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
