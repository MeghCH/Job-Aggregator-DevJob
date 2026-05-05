const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = {
  async getAll() {
    const res = await fetch(`${API_URL}/api/jobs`);
    return res.json();
  },

  async createJob(data: {
    id: string;
    company_id: string;
    title: string;
    description?: string;
    salary_min?: number;
    salary_max?: number;
    currency?: string;
    experience_years?: number;
    remote_type?: "remote" | "hybrid" | "onsite";
    skills?: string[];
  }) {
    const res = await fetch(`${API_URL}/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
