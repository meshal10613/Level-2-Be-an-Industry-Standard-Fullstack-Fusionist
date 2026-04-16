import LoginForm from "../../../../components/modules/Auth/LoginForm";

interface LoginParams {
    searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginParams) {
	const params = await searchParams;
	const redirectPath = params.redirect;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <LoginForm redirectPath={redirectPath} />
        </div>
    );
}
