import { Button } from "../../components/ui/button";

export default async function Home() {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return (
        <div>
            <Button variant="outline">Click me</Button>
        </div>
    );
}
