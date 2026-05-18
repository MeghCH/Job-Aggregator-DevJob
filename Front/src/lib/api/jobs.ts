const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = {
  async getRecruiterJobs() {
    const res = await fetch(`${API_URL}/api/jobs/recruiter`, {
      credentials: "include",
    });
    return res.json();
  },

  async getAll() {
    const res = await fetch(`${API_URL}/api/jobs`);
    return res.json();
  },

  async createJob(data: {
    title: string;
    description?: string;
    salary_min?: number;
    salary_max?: number;
    currency?: string;
    experience_years?: number;
    remote_type?: "remote" | "hybrid" | "onsite";
    location?: string;
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

  async getById(id: string | number, source?: string) {
    const params = source ? `?source=${encodeURIComponent(source)}` : "";
    const res = await fetch(`${API_URL}/api/jobs/${encodeURIComponent(id)}${params}`);
    return res.json();
  },

  async summarizeJob(description: string) {
    const res = await fetch(`${API_URL}/api/jobs/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ description }),
    });
    return res.json();
  },

  async analyzeJob(description: string) {
    const res = await fetch(`${API_URL}/api/jobs/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ description }),
    });
    return res.json();
  },

  async deleteJob(id: string | number) {
    const res = await fetch(`${API_URL}/api/jobs/${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },
};