import { AppointmentForm } from "@/components/forms/AppointmentForms";
import { getPatient } from "@/lib/actions/patient.action";
import Image from "next/image";
import Link from "next/link";


const Appointment = async ({ params: { userId } }: SearchParamProps) => {
    const patient = await getPatient(userId);

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Link href="/">

                        <Image
                            src="/assets/icons/logo-full.svg"
                            alt="patient"
                            height={1000}
                            width={1000}
                            className="mb-12 h-10 w-fit"
                        />

                    </Link>

                    <AppointmentForm
                        patientId={patient?.$id}
                        userId={userId}
                        type="create"
                    />

                    <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
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
    );
};

export default Appointment;