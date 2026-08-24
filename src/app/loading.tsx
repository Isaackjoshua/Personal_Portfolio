export default function Loading() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <p className="font-mono text-sm text-faint" role="status">
        <span className="text-accent">$</span> loading
        <span
          aria-hidden
          className="ml-1 inline-block h-3.5 w-[7px] translate-y-px bg-accent animate-caret"
        />
        <span className="sr-only">Loading</span>
      </p>
    </div>
  );
}
