'use client';

import { useState, useEffect, useRef } from 'react';
import backgroundChat from "@/images/backgroundChat.svg";

import ChatButton from "@/components/ChatButton";
import Header from "@/components/Header";
import UserChat from "@/components/UserChat";
import BotChat from "@/components/BotChat";
import BotThinking from "@/components/BotThinking";
import BotChatFinalPicture from '@/components/BotChatPicture';

export default function Chat() {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot', text: string, image_link?: string, isBotResponding?: boolean }[]>([]);
  const [isBotResponding, setIsBotResponding] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const hasExecutedRef = useRef(false);

  const handleSendMessage = async (message: string) => {
    if (message.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: message },
        { sender: 'bot', text: '', isBotResponding: true },
      ]);
  
      setIsBotResponding(true);
  
      let conversation_id = sessionStorage.getItem('conversation_id');
      if (!conversation_id) {
        conversation_id = null;
      }
  
      let nickname = sessionStorage.getItem('name');
      if (!nickname) {
        nickname = 'none';
      }
  
      try {
        const requestBody: {user_prompt: string, nickname: string, conversation_id?: string} = {
          user_prompt: message,
          nickname: nickname,
          ...(conversation_id && { conversation_id: conversation_id }),
        };
        
        const response = await fetch('https://7yjeklbteaxyxviubjjltp7gfe0fdmor.lambda-url.ap-northeast-2.on.aws/conversation', {
          method: 'POST',
          mode: "cors",
          body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.conversation_id) {
          sessionStorage.setItem('conversation_id', data.conversation_id);
        }

        // 대화가 종료되었을 때, 상품 이미지를 보여준다.
        if (data.image_link) {
          sessionStorage.removeItem('conversation_id');
          conversation_id = null;
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1] = {
              sender: 'bot',
              text: data.info,
              image_link: data.image_link
            };

            return newMessages;
          });
        } else {
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1] = {
              sender: 'bot',
              text: data.response,
            };
            return newMessages;
          });
        }
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
    if (!hasExecutedRef.current) {
      const storedChat = sessionStorage.getItem('chat');
      
      let conversation_id = sessionStorage.getItem('conversation_id');
      if (conversation_id) {
        sessionStorage.removeItem('conversation_id');
      }

      if (storedChat) {
        const sendMessage = async () => {
          await handleSendMessage(storedChat);
          sessionStorage.removeItem('chat');
        };
        hasExecutedRef.current = true;
        sendMessage();
      }
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
                  <div className='gap-6'>
                    <BotChat message={message.text} />
                    {message.image_link && <BotChatFinalPicture link={message.image_link} />}
                  </div>
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
