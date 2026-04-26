interface ConsultationDoctorPageProps {
    params: Promise<{ id: string }>;
}

export default async function ConsultationDoctorPage({
    params,
}: ConsultationDoctorPageProps) {
    const { id } = await params;

    return (
        <div>
            <h1>This is {id} Page</h1>
        </div>
    );
}
