import Image, { type StaticImageData } from "next/image";

import bitsPilaniLogo from "@/app/uni-logo/bits pilani (1).png";
import carnegieMellonLogo from "@/app/uni-logo/carniegue (1).png";
import harvardLogo from "@/app/uni-logo/harvard (1).png";
import iiscLogo from "@/app/uni-logo/iisc (1).png";
import iitBombayLogo from "@/app/uni-logo/iit bomaby (1).png";
import iitDelhiLogo from "@/app/uni-logo/iit delhi (1).png";
import manipalLogo from "@/app/uni-logo/manipal (1).png";
import oxfordLogo from "@/app/uni-logo/oxford (1).png";
import stanfordLogo from "@/app/uni-logo/stanford (1).png";
import vitLogo from "@/app/uni-logo/vit (1).png";

type University = {
  name: string;
  logo: StaticImageData;
  logoSize?: number;
  logoClassName?: string;
};

const universities: University[] = [
  { name: "Carnegie Mellon", logo: carnegieMellonLogo },
  { name: "Harvard", logo: harvardLogo },
  { name: "BITS Pilani", logo: bitsPilaniLogo },
  { name: "Oxford", logo: oxfordLogo },
  { name: "IIT Delhi", logo: iitDelhiLogo },
  { name: "Manipal", logo: manipalLogo },
  { name: "IIT Bombay", logo: iitBombayLogo },
  { name: "VIT", logo: vitLogo },
  { name: "Stanford", logo: stanfordLogo, logoSize: 60, logoClassName: "mix-blend-multiply" },
  { name: "IISc Bangalore", logo: iiscLogo },
];

function UniversityLogo({
  name,
  logo,
  logoSize = 80,
  logoClassName = "",
}: {
  name: string;
  logo: StaticImageData;
  logoSize?: number;
  logoClassName?: string;
}) {
  return (
    <div className="group flex h-full min-h-[156px] cursor-default flex-col items-center justify-center p-4 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <Image
          src={logo}
          alt={name}
          width={logoSize}
          height={logoSize}
          className={`object-contain grayscale opacity-70 transition-all duration-300 ease-in-out group-hover:scale-[1.05] group-hover:grayscale-0 group-hover:opacity-100 ${logoClassName}`}
        />
      </div>
      <span className="mt-2 text-xs leading-[1.5] text-[#7C8798] transition-colors duration-150 group-hover:text-[#5B677A]">
        {name}
      </span>
    </div>
  );
}

export function UniversityStrip() {
  return (
    <section className="border-y border-[#E2E8F0] bg-[#FFFFFF] px-5 py-10 md:px-12 md:py-12">
      <div className="mx-auto mb-10 max-w-[680px] text-center">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
          Trusted by learners
        </p>
        <h2 className="text-[34px] font-medium leading-tight tracking-[-0.5px] text-[#0F1117]">
          <span className="block">10,000+ students</span>
          <span className="mt-2 block text-[16px] font-normal leading-[1.7] tracking-normal text-[#64748B] md:text-[18px]">
            across top universities worldwide
          </span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-[980px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {universities.map((university) => (
          <UniversityLogo
            key={university.name}
            name={university.name}
            logo={university.logo}
            logoSize={university.logoSize}
            logoClassName={university.logoClassName}
          />
        ))}
      </div>
    </section>
  );
}
