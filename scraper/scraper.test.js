const scraper = require('./index');
const { isEqual } = require('date-fns');
const moment = require('moment-timezone');
test('should return properly formatted sailing', () => {
  const date = '2010-12-13';
  const example = ['boat', '12:00', '12:01', '12:45', 'On Time'];
  const res = scraper.makeSailing(example, date);
  expect(res).toHaveProperty('vessel');
  expect(res).toHaveProperty('sailingStatus');
  expect(res).toHaveProperty('scheduledDeparture');
  expect(res).toHaveProperty('actualDeparture');
  expect(res).toHaveProperty('eta');
  //   console.log(res);
});

test('should validate and concat datetime strings for sailings AM', () => {
  const date = '2010-12-13';
  const time = '11:23 AM';
  const res = scraper.validateTime(date, time);
  // console.log(res);
  // console.log(typeof res);
  expect(isEqual(res, new Date('2010-12-13T11:23').toJSON())).toEqual(true);
  expect(typeof res).toEqual('string');
});

test('should validate and concat datetime strings for sailings PM', () => {
  const date = '2010-12-13';
  const time = '11:23 PM';
  const res = scraper.validateTime(date, time);
  // console.log(res);
  // console.log(typeof res);
  expect(isEqual(res, new Date('2010-12-13T23:23').toJSON())).toEqual(true);
  expect(typeof res).toEqual('string');
});

test('should return null for sailings without time', () => {
  const date = '2010-12-13';
  const time = '';
  const res = scraper.validateTime(date, time);
  expect(res).toEqual(null);
});

test('should return different times for different timezones', () => {
  const date = '2010-12-13';
  const time = '11:23 PM';
  const res = scraper.validateTime(date, time);
  const testTime = moment
    .tz(date.concat(' ', time), 'YYYY-MM-DD hh:mm a', 'America/Toronto')
    .utc()
    .format();
  // console.log(res);
  // console.log(testTime);
  // console.log(typeof res);
  expect(isEqual(res, testTime)).toEqual(false);
  expect(typeof res).toEqual('string');
});
