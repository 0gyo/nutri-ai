'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type RecommendButtonProps = {
  text: string;
};

export default function RecommendButton({ text }: RecommendButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (text.includes('두통')) {
      sessionStorage.setItem('chat', '요즘 자주 두통이 생기는데, 특히 오후나 저녁에 심해져. 스트레스 때문인지 눈의 피로 때문인지 모르겠어요. 이런 증상을 완화하는 데 도움이 될 만한 영양제가 있을까요?');
    }
    else if (text.includes('손')) {
      sessionStorage.setItem('chat', '최근에 손이 자주 저리고 감각이 둔해지는 느낌이에요. 이런 증상을 예방하거나 개선하는 데 좋은 영양제를 추천해 주실 수 있나요?');
    }
    else if (text.includes('피곤')) {
      sessionStorage.setItem('chat', '요즘 들어 평소보다 쉽게 피곤해지고 집중력도 떨어지는 것 같아요. 충분히 자도 개운하지 않고 낮에도 계속 졸립더라구요. 활력을 되찾는 데 도움이 될 만한 영양제가 있을까요?');
    }
    else {
      sessionStorage.setItem('chat', text);
    }

    router.push("/chat");
  };

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      className={`flex items-center justify-center px-2 py-5 w-[216px] h-[68px] rounded-[27px] ${
        isClicked
          ? 'bg-gray_500 border-2 border-gray_400 text-white'
          : 'bg-gray_100 border-2 border-gray_200 text-gray_500 hover:bg-blue_600 hover:border-[#99B2FF] hover:text-white'
      }`}
    >
      <p className="font-medium text-[12px] leading-[14px]">
        {text}
      </p>
    </button>
  );
}
