import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

export function PostMeta({
  date,
  readingTime,
  author,
  className,
}: {
  date: string;
  readingTime: string;
  author?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-faint",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="size-3.5" strokeWidth={1.75} aria-hidden />
        <time dateTime={date}>{formatDate(date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3.5" strokeWidth={1.75} aria-hidden />
        {readingTime}
      </span>
      {author && <span>{author}</span>}
    </div>
  );
}
