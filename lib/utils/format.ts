export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}
