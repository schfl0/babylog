export function capitalizeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function formatDate(date) {
  return date.toLocaleString("de-CH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatTime(dateStr) {
  return new Date(dateStr).toTimeString().slice(0, 5);
}

export function calculateDuration(startDate) {
  if (!startDate) return null;
  const diffMs = Date.now() - new Date(startDate).getTime();
  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
