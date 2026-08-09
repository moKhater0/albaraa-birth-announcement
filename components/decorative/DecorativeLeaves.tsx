export function DecorativeLeaves({ className = "" }: { className?: string }) {
  return (
    <svg className={`decorative-leaves ${className}`} viewBox="0 0 150 100" aria-hidden="true">
      <path d="M16 91C43 69 60 48 76 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M44 65C22 65 16 50 16 50c19-4 29 3 28 15ZM57 48c-8-19 4-30 4-30 13 13 12 24-4 30ZM67 31c7-18 21-18 21-18-1 17-8 23-21 18Z" fill="currentColor" opacity=".82"/>
      <path d="M77 88c18-14 35-29 51-56" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M101 59c-17 1-21-11-21-11 13-5 22-1 21 11Zm14-15c-4-14 6-22 6-22 9 10 7 18-6 22Z" fill="currentColor" opacity=".64"/>
    </svg>
  );
}
