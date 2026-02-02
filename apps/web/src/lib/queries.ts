"server-only";
export const getHealth = async () => {
  const res = await fetch(`${process.env.BACKEND_ORIGIN}/api/v1/health`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Health check failed");
  return res.json();
};
