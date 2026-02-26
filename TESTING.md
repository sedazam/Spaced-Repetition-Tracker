# Testing

Date tested: 26 February 2026

This file documents how each rubric item was tested for this project.

## Rubric coverage

### 1) The website contains a drop-down listing exactly 5 users

- **How tested:** Opened the app, inspected the `Select User` dropdown options.
- **Evidence:** Options shown are `User 1`, `User 2`, `User 3`, `User 4`, `User 5`.
- **Result:** Pass

### 2) No user is selected on page load

- **How tested:** Reloaded the page and checked the default selected option.
- **Evidence:** Placeholder option `--Select a user--` is selected initially.
- **Result:** Pass

### 3) All users have no agenda when first loading with clear localStorage; data persists across reloads

- **How tested:** In browser devtools, cleared localStorage for the site. Selected each user and checked agenda. Added topic for one user, refreshed page, re-selected same user.
- **Evidence:** Initially users show no agenda message. After adding data and refreshing, stored agenda remains for that user.
- **Result:** Pass

### 4) Selecting a user loads that user’s agenda from storage

- **How tested:** Added data for `User 1`, switched to `User 2`, then back to `User 1`.
- **Evidence:** Agenda displayed after switching matches stored data for selected user.
- **Result:** Pass

### 5) Selecting a user displays the relevant user’s agenda

- **How tested:** Added different topics for multiple users and switched users from dropdown.
- **Evidence:** Each user sees only their own topics/dates.
- **Result:** Pass

### 6) If no agenda exists for selected user, message is displayed

- **How tested:** Selected a user with no stored data.
- **Evidence:** Message shown in agenda area: `No upcoming topics for user X`.
- **Result:** Pass

### 7) Form contains topic input, date picker, submit button

- **How tested:** Inspected UI form fields.
- **Evidence:** Form has text input (`Topic Name`), date input (`Date`), and submit button (`Add Topic`).
- **Result:** Pass

### 8) Date picker defaults to today on first page load

- **How tested:** Reloaded page and checked date input value before interaction.
- **Evidence:** Date value equals today’s local date.
- **Result:** Pass

### 9) Form validates topic name and selected date are set

- **How tested:** Tried submitting empty topic and empty date (via devtools removal/reset where needed), and without selected user.
- **Evidence:** Browser `required` validation blocks empty required fields; app shows alert if user not selected.
- **Result:** Pass

### 10) Submitting form adds topic for selected user only, with 1 week/1 month/3 months/6 months/1 year dates

- **How tested:** Followed rubric manual test for `Functions in JS` with date `19 July 2027`.
- **Evidence:** Generated dates:
  - `2027-07-26`
  - `2027-08-19`
  - `2027-10-19`
  - `2028-01-19`
  - `2028-07-19`
- **Result:** Pass

### 11) After creating a new topic, updated agenda is shown including the new topic

- **How tested:** Submitted form and immediately checked agenda list.
- **Evidence:** New topic revisions appear without page reload.
- **Result:** Pass

### 12) Lighthouse accessibility score is 100

- **How tested:** Ran Lighthouse in Chrome DevTools (`Accessibility`, mode: `Snapshot`) for each main view.
- **Evidence:** Accessibility score reached 100.
- **Result:** Pass

### 13) At least one non-trivial unit test exists

- **How tested:** Ran unit tests with `npm test`.
- **Evidence:** Tests include non-trivial date-calculation logic (`getRevisionDates`) and edge case (`month-end`).
- **Result:** Pass

## Rubric manual scenarios (README)

### Scenario A (User 1)

- **Steps used:**
  1.  Select `User 1`
  2.  Topic: `Functions in JS`
  3.  Date: `19 July 2027`
  4.  Submit
- **Expected dates observed:**
  - `26 July 2027`
  - `19 August 2027`
  - `19 October 2027`
  - `19 January 2028`
  - `19 July 2028`
- **Result:** Pass

### Scenario B (User 2)

- **Steps used:**
  1.  Select `User 2`
  2.  Add `Variables in Python`, date `5 November 2027`, submit
  3.  Add `Functions in Python`, date `5 October 2027`, submit
- **Expected chronological agenda observed:**
  - `Functions in Python, 12 October 2027`
  - `Functions in Python, 5 November 2027`
  - `Variables in Python, 12 November 2027`
  - `Variables in Python, 5 December 2027`
  - `Functions in Python, 5 January 2028`
  - `Variables in Python, 5 February 2028`
  - `Functions in Python, 5 April 2028`
  - `Variables in Python, 5 May 2028`
  - `Functions in Python, 5 October 2028`
  - `Variables in Python, 5 November 2028`
- **Result:** Pass

### Scenario C (User 3, past-date filtering)

- **Steps used:**
  1.  Select `User 3`
  2.  Add `Codewars`
  3.  Set date to exactly one month ago
  4.  Submit
- **Evidence:** 1-week revision date is excluded when in the past; remaining future dates are shown in chronological order.
- **Result:** Pass

### Cross-user data isolation re-check

- **How tested:** Revisited Users 1, 2, and 3 after all scenarios.
- **Evidence:** Each user retained only their own expected agenda.
- **Result:** Pass

## Unit test output

Command run:

`npm test`

Output summary:

- `pass 4`
- `fail 0`
- Tests include:
  - `User count is correct`
  - `getRevisionDates returns 5 dates`
  - `getRevisionDates returns correct dates for 2027-07-19`
  - `getRevisionDates handles month-end correctly`
