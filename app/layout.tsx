import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body>{children}</body> */}
      {/* <body>要素にInterを追加することで、アプリケーション全体にフォントが適用されます。
      ここでは、フォントを滑らかにする Tailwind antialiased クラスも追加しています。
      このクラスを使用する必要はありませんが、フォントに良いタッチを加えます。 */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
