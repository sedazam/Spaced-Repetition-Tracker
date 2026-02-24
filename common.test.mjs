import { getUserIds, getRevisionDates } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("getRevisionDates returns 5 dates", () => {
  const dates = getRevisionDates("2027-07-19");
  assert.equal(dates.length, 5);
});

test("getRevisionDates returns correct dates for 2027-07-19", () => {
  const dates = getRevisionDates("2027-07-19");
  assert.equal(dates[0], "2027-07-26");
  assert.equal(dates[1], "2027-08-19");
  assert.equal(dates[2], "2027-10-19");
  assert.equal(dates[3], "2028-01-19");
  assert.equal(dates[4], "2028-07-19");
});

test("getRevisionDates handles month-end correctly", () => {
  const dates = getRevisionDates("2027-01-31");
  assert.equal(dates[1], "2027-02-28");
});
