import PaitentForms from "@/components/forms/PaitentForms";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  const date = new Date();
  return (
    <div className="flex h-screen max-h-screen">

      {/* Todo : OTP verification | PassKey Verifications  */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Link href="/">

            <Image
              src="/assets/icons/logo-full.svg"
              alt="patient"
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit"
            />

          </Link>
          < PaitentForms />
          <div className="mt-8 font-bold flex justify-between">
            <p className="text-dark-600 xl:text-left">
              © {date.getFullYear()}  Careplus
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>

          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="side-img w-[50%]"

      />
    </div>
  );
}
