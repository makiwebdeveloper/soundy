export function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
    .filter((a) => a)
    .join(":");
}

export function formatTimeToSeconds(timeString: string): number {
  const timeParts = timeString.split(":").map(Number);

  if (timeParts.length < 2 || timeParts.some(isNaN)) {
    throw new Error("Invalid time format");
  }

  while (timeParts.length < 3) {
    timeParts.unshift(0);
  }

  const [hours, minutes, seconds] = timeParts;

  return hours * 3600 + minutes * 60 + seconds;
}
