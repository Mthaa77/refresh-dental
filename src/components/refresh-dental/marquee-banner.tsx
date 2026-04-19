'use client';

export default function MarqueeBanner() {
  const items = [
    '5-Star Google Rating',
    '500+ Happy Patients',
    'HPCSA Registered',
    'All Medical Aids Accepted',
    'Interest-Free Payments',
    'Same-Day Emergencies',
    "Centurion's Premier Dental Practice",
    '10+ Years Experience',
  ];

  const separator = '  ◆  ';
  const content = items.join(separator);
  // Duplicate content for seamless infinite loop
  const doubled = `${content}${separator}${content}${separator}`;

  return (
    <div
      className="w-full py-3 shadow-gold overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #E8D5B0, #C9A96E, #E8D5B0)' }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee-scroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `,
        }}
      />
      <div className="flex whitespace-nowrap">
        <div
          className="flex items-center"
          style={{
            animation: 'marquee-scroll 30s linear infinite',
          }}
          aria-hidden="true"
        >
          <span className="font-jost text-sm font-medium tracking-wide text-espresso select-none">
            {doubled}
          </span>
        </div>
        <div
          className="flex items-center"
          style={{
            animation: 'marquee-scroll 30s linear infinite',
          }}
          aria-hidden="true"
        >
          <span className="font-jost text-sm font-medium tracking-wide text-espresso select-none">
            {doubled}
          </span>
        </div>
      </div>
    </div>
  );
}
