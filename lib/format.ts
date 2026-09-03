export function formatDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(
    new Date(`${date}T12:00:00Z`),
  );
}

function compactTime(time: string, includePeriod: boolean): string | undefined {
  const match = time.trim().match(/^(\d{1,2})(:\d{2})?\s*([ap])\.?m\.?$/i);
  if (!match) return undefined;
  return `${match[1]}${match[2] ?? ""}${includePeriod ? match[3].toLowerCase() + "m" : ""}`;
}

export function formatEventDateTime(date: string, time: string): string {
  const dateLabel = formatDate(date, { month: "short", day: "numeric", year: "numeric" })
    .replace(/^Sep\b/, "Sept");
  if (time === "Time not recorded") return dateLabel;

  const range = time.split(/\s*[–—-]\s*/);
  if (range.length !== 2) return `${dateLabel} - ${time}`;

  const firstPeriod = range[0].trim().match(/([ap])\.?m\.?$/i)?.[1].toLowerCase();
  const secondPeriod = range[1].trim().match(/([ap])\.?m\.?$/i)?.[1].toLowerCase();
  const first = compactTime(range[0], firstPeriod !== secondPeriod);
  const second = compactTime(range[1], true);
  if (!first || !second) return `${dateLabel} - ${time}`;

  return `${dateLabel} - ${first}-${second}`;
}
