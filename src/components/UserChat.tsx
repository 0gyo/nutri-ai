interface UserChatProps {
  message: string;
}

export default function UserChat({ message }: UserChatProps) {
  return (
    <div className="flex py-[10px] px-4 bg-[#3A6BE1] shadow-md rounded-[32px_4px_32px_32px] max-w-[calc(100%-50px)] ml-[62px]">
      <p className="font-medium text-[14px] leading-[28px] text-white break-words"
        style={{ letterSpacing: '-2%' }}>
        {message}
      </p>
    </div>
  );
}
