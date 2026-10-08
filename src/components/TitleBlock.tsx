export interface TitleBlockRow {
  label: string;
  value: string;
}

// The boxed information panel found in the corner of a drawing sheet.
export default function TitleBlock({
  rows,
  className = '',
}: {
  rows: TitleBlockRow[];
  className?: string;
}) {
  return (
    <dl className={`border-2 border-ink bg-paper text-sm ${className}`}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[6.5rem_1fr] border-t border-ink first:border-t-0"
        >
          <dt className="label border-r border-ink px-3 py-2 text-graphite">{row.label}</dt>
          <dd className="px-3 py-2">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
