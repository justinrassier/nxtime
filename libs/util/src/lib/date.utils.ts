type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
export type DateData = { date: Date; dayofWeek: DayOfWeek };
export function getWeekDataFromDate(date: Date): DateData[] {
  // set the day passed in to midnight, as we don't want to deal with times
  date.setHours(0, 0, 0, 0);
  const localDayOfWeek = date.getDay();
  const mondayOfTheWeek = new Date(
    new Date(date).setDate(date.getDate() - localDayOfWeek + 1)
  );
  const result: DateData[] = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(mondayOfTheWeek);
    day.setDate(mondayOfTheWeek.getDate() + i);
    result.push({
      date: day,
      dayofWeek: convertDayOfWeekToString(day.getDay()),
    });
  }
  return result;
}
export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function convertDayOfWeekToString(dayOfWeek: number): DayOfWeek {
  switch (dayOfWeek) {
    case 0:
      return 'SUN';
    case 1:
      return 'MON';
    case 2:
      return 'TUE';
    case 3:
      return 'WED';
    case 4:
      return 'THU';
    case 5:
      return 'FRI';
    case 6:
      return 'SAT';
    default:
      throw new Error('No matching day of the week');
  }
}
