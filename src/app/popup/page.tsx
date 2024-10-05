import Image from "next/image";
import logo2 from "@/images/logo2.svg";
import backgroundPopup from "@/images/backgroundPopup.svg";
import InputButton from "@/components/InputButton";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      {/* 블러 처리된 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backgroundPopup.src})`,
          filter: 'blur(16px)', // 블러 효과 추가
          zIndex: -1, // 내용이 블러 위에 배치되도록
        }}
      ></div>

      {/* 블러가 없는 내용 */}
      <div className="flex flex-col items-start pt-[140px] pl-[320px]">
        <p className="text-[44px] font-semibold leading-[44px]" style={{ letterSpacing: '-0.02em' }}>
          안녕하세요! <br />
          저는 영양제 추천 AI
        </p>
        <div className="flex items-center pb-2">
          <Image src={logo2} alt="NutriAI" />
          <p className="text-[44px] font-semibold leading-[44px]" style={{ letterSpacing: '-0.02em' }}>입니다.</p>
        </div>
        <p className="font-normal text-[24px] leading-[24px] pb-[36px]" style={{ letterSpacing: '-0.02em' }}>어떻게 불러드릴까요?</p>
        <InputButton route="popup" />
      </div>
    </div>
  );
}
