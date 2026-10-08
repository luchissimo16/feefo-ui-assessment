interface StarIconProps {
  className?: string;
  title?: string;
}

/** Decorative five-point star. Colour and size are controlled by CSS. */
export function StarIcon({ className, title }: StarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      focusable="false"
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9L12 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}
