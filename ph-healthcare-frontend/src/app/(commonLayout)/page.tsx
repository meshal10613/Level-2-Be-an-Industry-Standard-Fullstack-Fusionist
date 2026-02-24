import Link from "next/link";
import { Button } from "../../components/ui/button";

export default async function Home() {
    return (
        <div>
            <Link href="/ngos">
                <Button variant="outline">Click Me</Button>
            </Link>
        </div>
    );
}
