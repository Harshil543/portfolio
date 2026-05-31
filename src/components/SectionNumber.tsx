interface SectionNumberProps {
  number: string;
}

export function SectionNumber({ number }: SectionNumberProps) {
  return (
    <div className="flex items-center gap-2 mb-6" aria-hidden="true">
      <span className="w-1 h-1 bg-highlight" />
      <span className="font-mono text-[11px] text-highlight tracking-wider">
        {number}
      </span>
    </div>
  );
}
