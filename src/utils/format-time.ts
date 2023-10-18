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

export function formatRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime(); // Use getTime() to get the time in milliseconds.

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years >= 1) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (days >= 1) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours >= 1) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes >= 1) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
}
