import CardWrapper from '@/app/ui/dashboard/cards';
import { poppinss } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${poppinss.className} mb-4 text-xl md:text-2xl`}>
        選んだ絵から、物語を作成！
      </h1>
      <>
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}
