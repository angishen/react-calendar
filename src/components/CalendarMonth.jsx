import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

import CalendarWeek from './CalendarWeek';

import { isSameDay } from '../utils/momentUtils';
import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';

const defaultProps = {
  enableOutsideDays: false,
  month: moment(),
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onMonthSelect() {},
  onYearSelect() {},
  renderMonthText: null,
  renderCalendarDay: props => <CalendarDay {...props} />,
  renderDayContents: null,
};

class CalendarMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: getCalendarMonthWeeks(
        props.month,
        props.enableOutsideDays,
        props.firstDayOfWeek == null
          ? moment.localeData().firstDayOfWeek()
          : props.firstDayOfWeek
      )
    };
  }

  componentWillReceiveProps(nextProps) {
    const { month, enableOutsideDays, firstDayOfWeek } = nextProps;
    const {
      month: prevMonth,
      enableOutsideDays: prevEnableOutsideDays,
      firstDayOfWeek: prevFirstDayOfWeek
    } = this.props;
    if (
      !month.isSame(prevMonth) ||
      enableOutsideDays !== prevEnableOutsideDays ||
      firstDayOfWeek !== prevFirstDayOfWeek
    ) {
      this.setState({
        weeks: getCalendarMonthWeeks(
          month,
          enableOutsideDays,
          firstDayOfWeek == null
            ? moment.localeData().firstDayOfWeek
            : firstDayOfWeek
        )
      });
    }
  }

  render() {
    const {
      month,
      monthFormat,
      onDayClick,
      onDayMouseEnter,
      onDayMouseLeave,
      onMonthSelect,
      onYearSelect,
      renderCalendarDay,
      renderMonthElement,
      renderMonthText
    } = this.props;

    const { weeks } = this.state;
    const monthTitle = renderMonthText
      ? renderMonthText(month)
      : month.format(monthFormat);

    return (
      <div>
        <div>
          {renderMonthElement ? (
            renderMonthElement({ month, onMonthSelect, onYearSelect })
          ) : (
            <strong>{monthTitle}</strong>
          )}
        </div>
        <table>
          <tbody>
            weeks.map((week, i) => (
            <CalendarWeek key={i}>
              {week.map((day, dayOfWeek) =>
                renderCalendarDay({
                  key: dayOfWeek,
                  day,
                  daySize,
                  isFocused,
                  onDayMouseEnter,
                  onDayMouseLeave,
                  onDayClick,
                  renderDayContents,
                  isOutsideDay: !day || day.month() !== month.month()
                })
              )}
            </CalendarWeek>
          </tbody>
        </table>
      </div>
    );
  }
}
