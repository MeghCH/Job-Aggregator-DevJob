import Link from "next/link";

type JobCardCompanyProps = {
  title: string;
  company: string;
  location: string;
  salary: string;
  contractType: string;
  tags: string[];
  postedAt: string;
  remote: string;
  publishedAt: string;
  href?: string;
};

export default function JobCardCompany({
  title,
  company,
  location,
  salary,
  contractType,
  tags,
  postedAt,
  remote,
  publishedAt,
  href,
}: JobCardCompanyProps) {
  const className = "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 border border-indigo-100 bg-indigo-50/40 rounded-xl px-4 sm:px-6 py-4 sm:py-5 hover:border-indigo-300 transition-colors cursor-pointer";

  const inner = (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">
          {company} · {location}
        </p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-indigo-500 text-white px-2.5 py-1 rounded-md font-medium">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500">{postedAt} / {remote}</p>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 shrink-0 sm:ml-6 flex-wrap">
        <span className="text-sm font-semibold text-indigo-600">{salary}</span>
        <span className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full font-medium">{contractType}</span>
        <span className="text-xs text-indigo-600">Publié le {publishedAt}</span>
      </div>
    </>
  );

  if (href) {
    return <Link href={href} className={className}>{inner}</Link>;
  }

  return <div className={className}>{inner}</div>;
}
