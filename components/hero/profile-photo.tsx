import Image from 'next/image';
import { profilePhotoExists } from '@/lib/utils/assets';
import { ASSETS } from '@/lib/constants/site';

export function ProfilePhoto() {
  const hasPhoto = profilePhotoExists();

  return (
    <div className="relative aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-2xl bg-surface/50 border border-white/[0.08] shadow-2xl">
      {hasPhoto ? (
        <Image
          src={ASSETS.profilePhoto}
          alt="Portrait of Chauhan Mohammed Hasnain"
          width={400}
          height={500}
          priority
          sizes="(max-width: 768px) 280px, 400px"
          className="h-full w-full object-cover object-[center_15%] transition-transform duration-500 hover:scale-[1.02]"
        />
      ) : (
        <div
          role="img"
          aria-label="Monogram HMH"
          className="flex h-full w-full items-center justify-center border border-white/[0.06] rounded-2xl"
        >
          <span className="text-4xl font-bold tracking-widest text-text-secondary">HMH</span>
        </div>
      )}
    </div>
  );
}
