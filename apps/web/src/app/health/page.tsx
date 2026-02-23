import { getHealth } from "@/lib/queries";

export default async function Health() {
    const health = await getHealth();

    return (
        <main>
            Health status:
            <pre>{JSON.stringify(health, null, 2)}</pre>
        </main>
    );
}
