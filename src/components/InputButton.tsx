'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import sendButton from '@/images/sendButton.svg';
import sendButtonHover from '@/images/sendButtonHover.svg';
import sendButtonClick from '@/images/sendButtonClick.svg';

interface InputButtonProps {
  route: string;
}

export default function InputButton({ route }: InputButtonProps) {
  const [buttonState, setButtonState] = useState('default');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleClick = () => {
    if (route === 'popup') {
      sessionStorage.setItem('name', inputValue);
      if (inputValue === '') {
        alert('닉네임을 입력해주세요.');
        return;
      }
      router.push('/search');
    }
    else {
      sessionStorage.setItem('chat', inputValue);
      router.push('/chat');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleMouseEnter = () => {
    setButtonState('hover');
  };

  const handleMouseLeave = () => {
    setButtonState('default');
  };

  const handleMouseDown = () => {
    setButtonState('click');
  };

  const handleMouseUp = () => {
    setButtonState('hover');
  };

  const getButtonImage = () => {
    if (buttonState === 'hover') return sendButtonHover;
    if (buttonState === 'click') return sendButtonClick;
    return sendButton;
  };

  return (
    <div
      className="relative flex items-center justify-between w-[672px] h-[52px] px-3 py-2 bg-white rounded-[27px] shadow-[0_0_4px_rgba(70,106,217,0.25)]"
      style={{
        background: 'linear-gradient(113deg, #99B2FF 0%, #466AD9 50%, #2D458C 100%)',
        padding: '2px',
        borderRadius: '26px',
      }}
    >
      <div className="flex items-center justify-between w-full h-full bg-white rounded-[24px]">
        {route === 'search' ? (
          <input
            type="text"
            placeholder="요즘 신경쓰이는 몸 상태는 무엇인가요?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-black placeholder-gray_500 text-left placeholder:text-center font-medium text-[16px] leading-[28px] flex-grow outline-none bg-transparent px-6"
          />
        ) : route == 'chat' ? (
          <input
            type="text"
            placeholder="요즘 신경쓰이는 몸 상태는 무엇인가요?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-black placeholder-gray_500 font-medium text-[16px] leading-[28px] flex-grow outline-none bg-transparent px-6"
          />
        ) : (
          <input
            type="text"
            placeholder="만나서 반가워요! 닉네임을 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-black placeholder-gray_500 font-medium text-[16px] leading-[28px] flex-grow outline-none bg-transparent px-6"
          />)
        }
        <button
          className="flex justify-center items-center w-[48px] h-[42px] bg-[#3A6BE1] rounded-[30px] mx-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
        >
          <Image src={getButtonImage()} alt="Send" className="w-full h-full" />
        </button>
      </div>
    </div>
  );
}
