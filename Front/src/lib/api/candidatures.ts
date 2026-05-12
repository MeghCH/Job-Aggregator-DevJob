const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getMyApplications() {
  const res = await fetch(`${API_URL}/api/applications`, {
    credentials: "include",
  });
  return res.json();
}
