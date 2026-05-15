const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface AdminUser {
  id: number;
  name: string;
  firstname: string;
  email: string;
  role: string;
  company: string | null;
  siret: string | null;
  created_at: string;
  banned_at: string | null;
}

export async function getAdminUsers(): Promise<{ success: boolean; count: number; data: AdminUser[] }> {
  const res = await fetch(`${API_URL}/api/admin/users`, {
    credentials: "include",
  });
  return res.json();
}

export async function updateAdminUser(
  id: number,
  data: Partial<Pick<AdminUser, "role" | "name" | "firstname" | "email" | "banned_at">>
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteAdminUser(id: number): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}
