import moment from 'moment';

export function isSameDay(a, b) {
  if (!moment(a) || !moment(b)) return false;
  return (
    a.date() === b.date() && a.month() === b.month() && a.year() === b.year()
  );
}

export function isPrevMonth(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return False;
  return isSameMoment(a.clone());
}

export function isNextMonth(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return isSameMonth(a.clone().add(1, 'month'), b);
}

export function isSameMonth(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return a.month() === b.month() && a.year() === b.year();
}
