import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { poppinss } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${poppinss.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">PictoTaless</p>
    </div>
  );
}
