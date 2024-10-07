import Image from "next/image";
import logo1 from "@/images/logo1.svg";
import background from "@/images/background.svg";

import InputButton from "@/components/InputButton";
import RecommendButton from "@/components/RecommendButton";

export default function Search() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="absolute top-[250px]">
        <div className="flex flex-col items-center justify-center w-[672px] h-[164px] gap-4">
          <Image src={logo1} alt="NutriAI" className="w-[278px] h-[84px]" />
          <InputButton route="search" />
        </div>
        <div className="flex gap-x-3 pt-2">
          <RecommendButton text="요즘 자꾸 두통이 생기는 거 같아" />
          <RecommendButton text="손을 많이 썼더니 손이 저려" />
          <RecommendButton text="피곤하고 집중력이 떨어진 거 같아" />
        </div>
      </div> 
    </div>
  );
}
