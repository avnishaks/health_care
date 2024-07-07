import RegisterForms from '@/components/forms/RegisterForms'
import { getUser } from '@/lib/actions/patient.action';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {

    const user = await getUser(userId);
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Link href="/">

                        <Image
                            src="/assets/icons/logo-full.svg"
                            alt="patient"
                            height={1000}
                            width={1000}
                            className="mb-12 h-10 w-fit"
                        />

                    </Link>

                    <RegisterForms user={user} />

                    <p className="copyright py-12">© 2024 CarePluse</p>
                </div>
            </section>

            <Image
                src="/assets/images/register-img.png"
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[40%]"
            />
        </div>
    )
}

export default Register