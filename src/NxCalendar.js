import moment, { parseTwoDigitYear } from "moment";
import NxCalDay from "./components/NxCalDay.js";
import NxCalHeader from "./components/NxCalHeader.js";
import NxCalWeekDays from "./components/NxCalWeekDays.js";

export default class NxCalendar extends React.Component {
  
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();

    this.state = {
      selected_cell: 0,
      container_height: 0,
      startMonth: this.props.startMonth,
      container_width: 0,
      show_month: [1,12],
      markedDays: {},
    };
  }

  componentDidMount() {
    this.setState({startMonth: this.props.startMonth, markedDays: this.props.markedDays })
  }

  async componentDidUpdate(prevProps){
    if(prevProps.startMonth.format('YYYY MM DD') !== this.props.startMonth.format('YYYY MM DD'))
      await this.setState({ startMonth: this.props.startMonth});

    if(JSON.stringify(this.state.markedDays) !== JSON.stringify(this.props.markedDays)){
      await this.setState({ markedDays: this.props.markedDays})
    }
  }

  componentWillUnmount() {
  }

  handleElementSelected = (sel_element) => {
    this.props.onElementSelected(sel_element);
  }

  generateFullCalendar(){
    return (
        <>
          {
            [...new Array(this.props.matrix.y)].map((_, i) =>(
              this.genereateRow(i)
            )) 
          }
        </>
    )
  }

  genereateRow(number){
    let { x } = this.props.matrix;
    let { showMonths } = this.props;
    let { startMonth } = this.state;

    let startMonthNum = parseInt(startMonth.format('M')) - 1;
    let month = number === 0 ? startMonthNum : startMonthNum + number * x;
    let currMonthNum = number * x;

    return (
      <div key={number}>
        <NxCalHeader 
          color="gray" 
          number={number} 
          year={startMonth.format('YYYY')}
          cols={x} 
          showMonths={showMonths} 
          startMonthNum={month} 
          decreaseMonths={this.handleDecreaseMonth} 
          increaseMonths={this.handleIncreaseMonth}/>

        <div className="cal-row-content" >
              {
                [...new Array(x)].map((_, i) => currMonthNum + i < showMonths ? (
                    <div className="cal-calendar-container" key = {i}>
                      {this.generateCalendar(moment(startMonth).set('month', month + i))}
                    </div>
                  )
                  : <div className="cal-calendar-container" key = {i}></div>
                ) 
              }
        </div>
      </div>
    )
  }

  generateCalendar(month){

    return (
      <>
        <NxCalWeekDays labels={this.props.labels} onWeekDaysClick={(day) => this.onWeekColumnSelected(day, month)}/>
        {this.generateMonthDaysCopy(month)}
      </>
    )
  }

  generateMonthDaysCopy(month){
    let { startMonth } = this.state;

    let daysNum = month.daysInMonth();
    let monthDaysJSX = [];
    let startMonthDay = parseInt(moment(month).format('d'));

    if(startMonthDay === 0 ) startMonthDay = 7;
    if(startMonthDay === 1 ) startMonthDay = 8;

    for (let i = 1; i <= daysNum + startMonthDay - 2; i+=7) {
      let c = 0;
      if(i < startMonthDay){
        for ( c = i; c < startMonthDay - 1; c++) {
        }
        c--
      }
        monthDaysJSX.push(
          <div className="cal-week-row" key={moment(month).format('M') + i}>
            {this.generateWeekCopy(i === 1 ? i : i - (startMonthDay - 2), daysNum, month)}
          </div>
        );
    }

    return monthDaysJSX;
  }

  generateWeekCopy(startDay, daysNum, month){
    let weekJSX = [];
    let startMonthDay = parseInt(moment(month).format('d'));
    if(startMonthDay === 0 ) startMonthDay = 7;
    if(startMonthDay === 1 ) startMonthDay = 8;

    let c = 0;

    if(startDay === 1 && startDay < startMonthDay){
      for ( c = startDay; c < startMonthDay - 1; c++) {
        weekJSX.push(<NxCalDay key={moment(month).format('M') + 'key' + c*100} mark={null} onDaySelected={(day) => this.onDaySelected(day, month)} onWeekRowSelected={(day) => this.onWeekRowSelected(startDay, month)} day={c} />)
      }

      c--
    }

    for (let i = startDay; i < startDay + 7 - c; i++) {
      if(i <= daysNum )
        weekJSX.push( 
          <NxCalDay key={moment(month).format('M') + 'key' + i} mark={this.isMarkedDay(i,month)} onDaySelected={async (day) => await this.onDaySelected(day, month)} onWeekRowSelected={(day) => this.onWeekRowSelected(startDay, month)}  day={i} visible/>
        );
      else
        weekJSX.push( 
          <NxCalDay key={moment(month).format('M') + 'key' + i} mark={this.isMarkedDay('',month)} onDaySelected={async (day) => await this.onDaySelected(day, month)} onWeekRowSelected={(day) => this.onWeekRowSelected(startDay, month)}  day={i} />
        );
    }

    return weekJSX;
  }

  isMarkedDay = (id,month) => {
    let date = moment(month).set("date",id)
    let { markedDays } =this.state;
    if(markedDays[date.format('YYYY/MM/DD')]){
      return markedDays[date.format('YYYY/MM/DD')];
    }

    return null;
  }

  async onDaySelected(day , month){
    let marked = this.state.markedDays;
    let dayDate = moment(month).set('date',day).format('YYYY/MM/DD');

    if(!marked) 
        marked = { [dayDate] : { color: '#02bbd5'}};
      else if(!marked[dayDate])
        marked[dayDate] = { color: '#02bbd5'};
      else 
        marked[dayDate] = null;

    await this.setState({ markedDays: marked})
  }

  async onWeekRowSelected(startDay , month){
    let markedDates = moment(month).set('date',startDay);
   

    let daysInMonth = markedDates.daysInMonth();
    let marked = this.state.markedDays;
    let markingDays = [];
    let isWeekSelected = true;

    for (let i = startDay; i < startDay + 7 && i <= daysInMonth && markedDates.week() === moment(month).set('date',startDay).week(); i++) {
      markedDates.set('date',i)
      let dayDate = [markedDates.format('YYYY/MM/DD')];

      markingDays.push(dayDate);

      if(marked && !marked[dayDate])
        isWeekSelected = false;
    }

    markingDays.forEach(dayDate => {
      if(!marked) 
        marked = { [dayDate] : { color: '#02bbd5'}};
      else if(!marked[dayDate])
        marked[dayDate] = { color: '#02bbd5'};
      else if(isWeekSelected && !marked[dayDate].disable)
        marked[dayDate] = null;
    });

    await this.setState({ markedDays: marked})
  }

  onWeekColumnSelected = async (day, month) => {
    let date = moment(month);
    let marked = this.state.markedDays;
    let isWeekSelected = true;
    let markingDays = [];
    let monthNum = parseInt(month.format('M'));
    let monthStartDay = parseInt(month.format('d'));

    if(monthStartDay === 0 ) monthStartDay = 7;
    if(monthStartDay === 1 ) monthStartDay = 8;

    for (let i = day - monthStartDay + 3; parseInt(date.format('M')) === monthNum && i <= month.daysInMonth(); i+=7) {
      if( i <= 0 )
        i+=7;

      date.set("date",i);
      let markedDate = moment(date).format('YYYY/MM/DD');
      markingDays.push(markedDate);

      if(marked && !marked[markedDate])
        isWeekSelected = false;
    }

    markingDays.forEach(dayDate => {
      if(!marked) 
        marked = { [dayDate] : { color: '#02bbd5'}};
      else if(!marked[dayDate])
        marked[dayDate] = { color: '#02bbd5'};
      else if(isWeekSelected && !marked[dayDate].disable)
        marked[dayDate] = null;
    });

    await this.setState({ markedDays : marked})
  }
  
  handleDecreaseMonth = async () => {
    let startMonthNum = parseInt(this.state.startMonth.format('M')) - 1;
    let startMonth = moment(this.state.startMonth).set('month', startMonthNum - 1);

    await this.setState({ startMonth });
    this.props.onLeftArrowClick(startMonth);
  }  
  
  handleIncreaseMonth = async () => {
    let startMonthNum = parseInt(this.state.startMonth.format('M')) - 1;
    let startMonth = moment(this.state.startMonth).set('month', startMonthNum + 1);

    await this.setState({ startMonth });
    this.props.onLeftArrowClick(startMonth);
  }

  calculateVisibleDays = (month) => {

    let startDay = month.startOf('month').format('d');
    let monthDays = [];
    let days = 1;

    for (let i = 0; i < 5; i++) {

        let weekDays = [];
        for (let j = 1; j <= 7; j++) {

            if(i == 0 && j < startDay)
                weekDays.push('');
            else 
                weekDays.push(days++);
        }
        monthDays.push(weekDays);
    }

    return  monthDays;
}
  render() {

    return (
      <div
        className='nx-calendar-container'
      >
         
         {this.generateFullCalendar()}

      </div>
    );
  }
}
