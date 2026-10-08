// A simple left-to-right process diagram. It stacks vertically on narrow screens.
export default function Flow({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return (
    <ol
      aria-label="How it fits together"
      className={`flex flex-col items-stretch md:items-center ${compact ? '' : 'md:flex-row'}`}
    >
      {steps.map((step, i) => (
        <li
          key={step}
          className={`flex flex-col items-center ${compact ? '' : 'md:flex-row md:flex-1'}`}
        >
          <span
            className={`w-full border-2 border-ink bg-paper px-4 text-center font-semibold leading-snug ${
              compact ? 'py-2 text-sm' : 'py-4 text-base md:flex-1'
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className={`bg-ink ${compact ? 'h-3 w-0.5' : 'h-6 w-0.5 md:h-0.5 md:w-8 md:shrink-0'}`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
