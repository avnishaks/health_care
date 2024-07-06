import PaitentForms from "@/components/forms/PaitentForms";
import Image from "next/image";


export default function Home() {
  return (
   <div className="flex h-screen max-h-screen">
     <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[496px]">
        <Image 
        src="/assets/icons/logo-full.svg"
        alt="patient"
        height={1000}
        width={1000}
        className="mb-12 h-10 w-fit"   
        />
        <h1 className="text-white"> Hello </h1>
        < PaitentForms/>
      </div>
     </section>
   </div>
  );
}
