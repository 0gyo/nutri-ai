'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import sendButton from '@/images/sendButton.svg';
import sendButtonHover from '@/images/sendButtonHover.svg';
import sendButtonClick from '@/images/sendButtonClick.svg';

interface ChatButtonProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export default function ChatButton({ onSendMessage, disabled }: ChatButtonProps) {
  const [buttonState, setButtonState] = useState('default');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // input에 대한 참조 생성

  useEffect(() => {
    // 일정 주기로 포커스 유지
    const interval = setInterval(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100); // 100ms마다 포커스를 설정

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
  }, []);

  const handleClick = () => {
    if (!disabled) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) setButtonState('hover');
  };

  const handleMouseLeave = () => {
    if (!disabled) setButtonState('default');
  };

  const handleMouseDown = () => {
    if (!disabled) setButtonState('click');
  };

  const handleMouseUp = () => {
    if (!disabled) setButtonState('default');
  };

  const getButtonImage = () => {
    if (buttonState === 'hover') return sendButtonHover;
    if (buttonState === 'click') return sendButtonClick;
    return sendButton;
  };

  return (
    <div
      className="relative flex items-center justify-between w-[769px] h-[60px] bg-white rounded-[27px] shadow-md"
      style={{
        background: 'linear-gradient(113deg, #99B2FF 0%, #466AD9 50%, #2D458C 100%)',
        padding: '2px',
        borderRadius: '26px',
      }}
    >
      <div className="flex items-center justify-between w-full h-full bg-white rounded-[24px]">
        <input
          type="text"
          placeholder="요즘 신경쓰이는 몸 상태는 무엇인가요?"
          className="text-[#909AAF] font-medium text-[16px] leading-[28px] flex-grow outline-none bg-transparent px-6"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef} // input에 ref를 연결
          disabled={disabled}
        />
        <button
          className="flex justify-center items-center w-[52px] h-[46px] bg-[#3A6BE1] rounded-[30px] mx-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
          disabled={disabled}
        >
          <Image src={getButtonImage()} alt="Send" className="w-full h-full" />
        </button>
      </div>
    </div>
  );
}
