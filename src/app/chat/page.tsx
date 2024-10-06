'use client';

import { useState, useEffect, useRef } from 'react';
import backgroundChat from "@/images/backgroundChat.svg";

import ChatButton from "@/components/ChatButton";
import Header from "@/components/Header";
import UserChat from "@/components/UserChat";
import BotChat from "@/components/BotChat";
import BotThinking from "@/components/BotThinking";

export default function Chat() {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot', text: string, isBotResponding?: boolean }[]>([]);
  const [isBotResponding, setIsBotResponding] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (message: string) => {
    if (message.trim() !== '') {
      // 사용자 메시지 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: message },
        // 봇의 "생각 중" 메시지 추가
        { sender: 'bot', text: '', isBotResponding: true },
      ]);
  
      // 봇이 응답 중임을 표시
      setIsBotResponding(true);
  
      let conversation_id = sessionStorage.getItem('conversation_id');
      // conversation_id가 없으면 null로 설정
      if (!conversation_id) {
        conversation_id = null;
      }
  
      let nickname = sessionStorage.getItem('name');
      if (!nickname) {
        nickname = 'none';
      }
  
      try {
        console.log('message:', message);
        console.log('nickname:', nickname);
        console.log('conversation_id:', conversation_id);
        
        // 요청 바디 생성
        const requestBody: {user_prompt: string, nickname: string, conversation_id?: string} = {
          user_prompt: message,
          nickname: nickname,
          // conversation_id가 null이 아닐 때만 포함
          ...(conversation_id && { conversation_id: conversation_id }),
        };
        
        console.log('requestBody:', requestBody);
        const response = await fetch('https://7yjeklbteaxyxviubjjltp7gfe0fdmor.lambda-url.ap-northeast-2.on.aws/conversation', {
          method: 'POST',
          mode: "cors",
          body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('data:', data);

        if (data.conversation_id) {
          sessionStorage.setItem('conversation_id', data.conversation_id);
        }
        
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = {
            sender: 'bot',
            text: data.response,
          };
          return newMessages;
        });
      } catch (error) {
        console.error('Error fetching bot response:', error);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = {
            sender: 'bot',
            text: '죄송합니다. 응답을 가져오는 중에 문제가 발생했습니다.',
          };
          return newMessages;
        });
      } finally {
        setIsBotResponding(false);
      }
    }
  };
  

  useEffect(() => {
    const storedChat = sessionStorage.getItem('chat');

    if (storedChat) {
      const sendMessage = async () => {
        await handleSendMessage(storedChat);
        sessionStorage.removeItem('chat');
      };
      sendMessage();
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundChat.src})`,
        backgroundAttachment: 'fixed',
      }}
    > 
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="absolute top-[80px] bottom-[140px] left-0 right-0 flex justify-center overflow-y-scroll overflow-x-hidden p-2 pb-12"
      >
        <div className="w-[764px] flex flex-col gap-6">
          {/* Render each message */}
          {messages.map((message, index) => (
            <div key={index} className={message.sender === 'user' ? 'self-end' : 'self-start'}>
              {message.sender === 'user' ? (
                <UserChat message={message.text} />
              ) : (
                message.isBotResponding ? (
                  <BotThinking />
                ) : (
                  <BotChat message={message.text} />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div className="fixed bottom-0 left-0 w-full pb-8 flex justify-center items-center z-10">
        <div className="flex flex-col w-[764px] h-[60px]">
          <ChatButton onSendMessage={handleSendMessage} disabled={isBotResponding} />
        </div>
      </div>
    </div>
  );
}
