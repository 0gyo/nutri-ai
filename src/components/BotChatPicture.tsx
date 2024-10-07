import Image from 'next/image';
import botProfile from '@/images/botProfile.svg';

interface BotChatPictureProps {
  link: string;
}

export default function BotChatPicture({ link }: BotChatPictureProps) {
  return (
    <div className="flex items-start gap-3 pt-4">
      {/* Bot Profile as Image */}
      <div className="relative w-[28px] h-[28px] flex-shrink-0">
        <Image src={botProfile} alt="Bot Profile" className="rounded-full" />
      </div>

      {/* Chat Box */}
      <div className="flex p-4 gap-2 bg-white border border-[#6892F9] shadow-md rounded-[4px_32px_32px_32px] max-w-[100%]"
      style={{ whiteSpace: "pre-line" }}>
        {/* Picture in Chat */}
        <div className="w-[332px] h-[332px] rounded-[13px] overflow-hidden">
          <Image
            src={link}
            alt="Chat Image"
            className="w-full h-full object-contain"
            width={332} // 적절한 너비 추가
            height={332} // 적절한 높이 추가
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
