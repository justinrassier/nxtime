import { getWeekDataFromDate } from './date.utils';
describe('Date Utils', () => {
  it('works', () => {
    const today = new Date('2025-3-22');
    const data = getWeekDataFromDate(today);

    expect(data).toMatchInlineSnapshot(`
      [
        {
          "date": 2025-03-17T05:00:00.000Z,
          "dayofWeek": "MON",
        },
        {
          "date": 2025-03-18T05:00:00.000Z,
          "dayofWeek": "TUE",
        },
        {
          "date": 2025-03-19T05:00:00.000Z,
          "dayofWeek": "WED",
        },
        {
          "date": 2025-03-20T05:00:00.000Z,
          "dayofWeek": "THU",
        },
        {
          "date": 2025-03-21T05:00:00.000Z,
          "dayofWeek": "FRI",
        },
        {
          "date": 2025-03-22T05:00:00.000Z,
          "dayofWeek": "SAT",
        },
        {
          "date": 2025-03-23T05:00:00.000Z,
          "dayofWeek": "SUN",
        },
      ]
    `);
  });
});
