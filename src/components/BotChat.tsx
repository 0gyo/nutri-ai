import Image from 'next/image';
import botProfile from '@/images/botProfile.svg';

interface BotChatProps {
  message: string;
}

export default function BotChat({ message }: BotChatProps) {
  const TextWithLinks = ({ text }: { text: string }) => {
    // Regular expression to capture URLs inside parentheses
    const urlPattern = /\((https?:\/\/[^\s]+)\)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    // Iterate over all matches for URLs within parentheses
    while ((match = urlPattern.exec(text)) !== null) {
      const url = match[1];
      const matchStart = match.index;
      const matchEnd = match.index + match[0].length;

      // Push the preceding text
      parts.push(text.substring(lastIndex, matchStart));

      // Add the link (without the parentheses)
      parts.push(<a key={match.index} href={url} target="_blank" rel="noopener noreferrer">{url}</a>);

      lastIndex = matchEnd; // Update last index to the end of the match
    }

    // Push the remaining text after the last match
    parts.push(text.substring(lastIndex));

    return <div style={{ whiteSpace: 'pre-line' }}>{parts}</div>;
  };

  return (
    <div className="flex items-start gap-3">
      {/* Bot Profile as Image */}
      <div className="relative w-[28px] h-[28px] flex-shrink-0">
        <Image src={botProfile} alt="Bot Profile" className="rounded-full" />
      </div>

      {/* Chat Box */}
      <div className="flex gap-2 bg-white max-w-[100%]"
      style={{ whiteSpace: "pre-line" }}>
        <div className="font-medium text-[16px] leading-[28px] text-[#4D4D4D] break-words"
        style={{ letterSpacing: '-2%' }}>
          <TextWithLinks text={message} />
        </div>
      </div>
    </div>
  );
}
