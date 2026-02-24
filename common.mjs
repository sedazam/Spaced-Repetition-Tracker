export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

export function getRevisionDates(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  function addDays(y, m, d, days) {
    const date = new Date(year, month - 1, days);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function addMonths(y, m, d, months) {
    let newMonth = m + months;
    let newYear = y;
    while (newMonth > 12) {
      newMonth -= 12;
      newYear += 1;
    }
    const maxDay = new Date(newYear, newMonth, 0).getDate();
    const newDay = Math.min(d, maxDay);
    return `${newYear}-${String(newMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`;
  }

  return [
    addDays(year, month, day, 7),
    addMonths(year, month, day, 1),
    addMonths(year, month, day, 3),
    addMonths(year, month, day, 6),
    addMonths(year, month, day, 12),
  ];
}
