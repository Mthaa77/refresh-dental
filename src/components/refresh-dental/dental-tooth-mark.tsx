import type { SVGProps } from 'react';

type DentalToothMarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export default function DentalToothMark({ title, ...props }: DentalToothMarkProps) {
  return (
    <svg viewBox="0 0 96 112" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {title ? <title>{title}</title> : null}
      <path
        d="M48 10C28.7 10 15 22.4 15 41.3c0 14.7 6.3 24.8 10.4 34.2 3.3 7.6 5.6 21.2 12 24.3 6.2 3 7.1-15.8 10.6-23.3 3.5 7.5 4.4 26.3 10.6 23.3 6.4-3.1 8.7-16.7 12-24.3C74.7 66.1 81 56 81 41.3 81 22.4 67.3 10 48 10Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M31 37.5c4.1-7.1 10-10.5 17-10.5s12.9 3.4 17 10.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M34 53c4.3 3.8 8.9 5.7 14 5.7S57.7 56.8 62 53" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="35" cy="43" r="2.8" fill="currentColor" />
      <circle cx="61" cy="43" r="2.8" fill="currentColor" />
    </svg>
  );
}
