type CandidateCardProps = {
  name: string;
  title: string;
  experience: string;
  tags: string[];
  availability: string;
  location: string;
  appliedTo: string;
  sentAt: string;
};

export default function CandidateCard({
  name,
  title,
  experience,
  tags,
  availability,
  location,
  appliedTo,
  sentAt,
}: CandidateCardProps) {
  return (
    <div className="flex items-start justify-between border border-indigo-100 bg-indigo-50/40 rounded-xl px-6 py-5 hover:border-indigo-300 transition-colors cursor-pointer">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">
          {title} · {experience}
        </p>

        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-brand-500 text-white px-2.5 py-1 rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-400">
          {availability} · {location}
        </p>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0 ml-6">
        <span className="text-sm font-semibold text-indigo-600">
          {appliedTo}
        </span>
        <span className="text-xs bg-green-400 text-white px-3 py-1 rounded-full font-medium">
          Disponible
        </span>
        <span className="text-xs text-indigo-400">Envoyé le {sentAt}</span>
      </div>
    </div>
  );
}
