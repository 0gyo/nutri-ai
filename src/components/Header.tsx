import Image from 'next/image';
import Link from 'next/link';
import logo4 from '@/images/logo4.svg';
import homeIcon from '@/images/homeIcon.svg';

export default function Header() {
  return (
    <header className="w-full h-[60px] bg-white border-b-4 border-[#6892F9] flex items-center justify-between px-10">
      {/* 로고 중앙 정렬 및 클릭 시 홈으로 이동 */}
      <div className="flex-1 flex justify-center">
        <Link href="/search">
          <Image src={logo4} alt="NutriAI" className="w-[94px] h-[30px] cursor-pointer" />
        </Link>
      </div>

      {/* 홈 아이콘 오른쪽 끝에 배치 및 클릭 시 홈으로 이동 */}
      <div className="flex items-center">
        <Link href="/search">
          <Image src={homeIcon} alt="Home" className="w-[18px] h-[20px] cursor-pointer" />
        </Link>
      </div>
    </header>
  );
}
