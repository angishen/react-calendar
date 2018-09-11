import { Component } from 'react';
import moment from 'moment/moment';
import momentPropTypes from 'react-moment-proptypes';
import { isPrevMonth, isNextMonth } from '../utils/momentUtils';

const propTypes = {
  initialMonth: momentPropTypes.momentObj,
  onMonthChange: PropTypes.func,
  numberOfMonths: PropTypes.number
};

const defaultProps = {
  initialMonth: moment(),
  numberOfMonths: 1,
  onDayClick() {},
  onMonthChange() {},
  onYearChange() {},
};

function getMonths(initialMonth, numberOfMonths) {
  // create clone of moment obj
  let month = initialMonth.clone();

  const months = [];
  for (let i = 0; i < numberOfMonths; i += 1) {
    months.push(month);
    month = month.clone().add(1, 'month');
  }
  return months;
}

class CalendarMonthGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths)
    };

    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    this.locale = moment.locale();
  }

  componentDidMount() {
    this.removeEventListener = addEventListener(
      this.container,
      'transitionend',
      this.onTransitionEnd
    );
  }

  componentWillReceiveProps(nextProps) {
    const { initialMonth, numberOfMonths } = nextProps;
    const { months } = this.state;

    // pull initialMonths and numberOfMonths off props object and rename them
    // prevInitialMonth and prevNumberOfMonths, resp.
    const {
      initialMonth: prevInitialMonth,
      numberOfMonths: prevNumberOfMonths
    } = this.props;

    // moment.js function isSame() compares two moment object and checks if same
    const hasMonthChanged = !prevInitialMonth.isSame(initialMonth, 'month');
    const hasNumberOfMonthsChanged = prevNumberOfMonths !== numberOfMonths;

    let newMonths = months;

    if (hasMonthChanged && !hasNumberOfMonthsChanged) {
      if (isNextMonth(prevInitalMonth, initialMonth)) {
        newMonths = months.slice(1);
        newMonths.push(months[months.length - 1].clone().add(1, 'month'));
      } else if (isPrevMonth(prevInitialMonth, initalMonth)) {
        newMonths = months.slice(0, months.length - 1);
        newMonths.unshift(months[0].clone().subtract(1, 'month'));
      } else {
        newMonths = getMonths(initialMonth, numberOfMonths);
      }
    }

    if (hasNumberOfMonthsChanged) {
      newMonths = getMonths(initialMonth, numberOfMonths);
    }

    const momentLocale = moment.locale();
    if (this.locale !== momentLocal) {
      this.locale = momentLocal;
      newMonths = newMonths.map(m => m.locale(this.locale));
    }

    this.setState({
      months: newMonths
    });
  }

  componentWillUnmount() {
    if (this.removeEventListener) this.removeEventListener();
  }

  onMonthSelect(currentMonth, newMonthVal) {
    const newMonth = currentMonth.clone();
    const { onMonthChange } = this.props;
    const { months } = this.state;
    let initialMonthSubtraction = months.indexOf(currentMonth);
    newMonth
      .set('month', newMonthVal)
      .subtract(initialMonthSubtraction, 'months');
    onMonthChange(newMonth);
  }

  onYearSelect(currentMonth, newYearVal) {
    const newMonth = currentMonth.clone();
    const { onYearChange } = this.props;
    const { months } = this.state;
    let initialMonthSubtraction = months.indexOf(currentMonth);
    newMonth
      .set('year', newYearVal)
      .subtract(initialMonthSubtraction, 'months');
    onYearChange(newMonth);
  }

  setContainerRef(ref) {
    this.container = ref;
  }
}

CalendarMonthGrid.propTypes = propTypes;
