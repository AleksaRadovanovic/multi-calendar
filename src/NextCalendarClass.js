import NxCalendar from './NxCalendar.js'
import moment from 'moment'
export default class NextCalendarClass{

	constructor() {
		this.id = '';
        this.startMonth = moment();
        this.markedDays = null;
        this.showMonths = 12;
        this.labels = ['Lu', 'Ma','Me', 'Gi', 'Ve', 'Sa', 'Do']
        this.matrix = { x: 4, y: 3};
        this.element_click_callbck = null;
        this.left_click_callbck = null;
        this.right_click_callbck = null;
    }

    recalcPositions = () => {
        
        this.initComponentDimensions();
    
        $( window ).resize(() => {
            this.initComponentDimensions();
        });
    }

    initComponentDimensions(){
        let dayLabelFont = $('.cal-calendar-container').width() * 0.033;
        let monthFont = $('.cal-calendar-container').width() * 0.032;
        
        let dayFont = $('#nx-timeline-container').width() * 0.015;
        if(dayFont < 15)
            $('.cal-day-a').css({ 'font-size': dayFont });

        if(dayLabelFont < 12 && dayLabelFont > 10)
            $('.cal-day-label').css({ 'font-size': dayLabelFont });
        else if(dayLabelFont > 12) 
            $('.cal-day-label').css({ 'font-size': 12 });
        else 
            $('.cal-day-label').css({ 'font-size': 10 });

        if(monthFont < 13 && monthFont > 11)
            $('.cal-month-label').css({ 'font-size': dayLabelFont });
        else if(monthFont > 13) 
            $('.cal-month-label').css({ 'font-size': 14 });
        else 
            $('.cal-month-label').css({ 'font-size': 11 });
    }

    handleArrowLeft = (date) => {
        this.startMonth = date;

        if(this.left_click_callbck){
            let startDate = moment(date).startOf('month').format('YYYY/MM/DD');
            let visibleMonths = this.matrix.x * this.matrix.y < 12 ? this.matrix.x * this.matrix.y : 12;
            let endDate = moment(date).add(visibleMonths, 'M').format('YYYY/MM/DD');
            let obj = { 
                startDate,
                endDate
            };

            this.left_click_callbck(obj);
        }

        this.initComponentDimensions();

    }

    handleArrowRight = (date) => {
        this.startMonth = date;

        if(this.right_click_callbck){
            let startDate = moment(date).startOf('month').format('YYYY/MM/DD');
            let visibleMonths = this.matrix.x * this.matrix.y < 12 ? this.matrix.x * this.matrix.y : 12;
            let endDate = moment(date).add(visibleMonths, 'M').format('YYYY/MM/DD');
            let obj = { 
                startDate,
                endDate
            };

            this.right_click_callbck(obj);
        }

        this.initComponentDimensions();

    }

    getStartAndEndDate(){
        let date = this.startMonth;

        let startDate = moment(date).startOf('month').format('YYYY/MM/DD');
        let visibleMonths = this.matrix.x * this.matrix.y < 12 ? this.matrix.x * this.matrix.y : 12;
        let endDate = moment(date).add(visibleMonths - 1, 'M');
        let obj = { 
            startDate,
            endDate: moment(endDate).endOf('month').format('YYYY/MM/DD')
        };

        return obj;
    }

    init() {  
        this.initDomElem(true);
    }

    initDomElem(forceRecalc){ 
        var props = {
            labels: this.labels,
            startMonth: moment(moment(this.startMonth).set('date',2)),
            matrix: this.matrix,
            showMonths: this.showMonths,
            markedDays: this.markedDays,
            onElementSelected : this.element_click_callbck,
            onLeftArrowClick : this.handleArrowLeft,
            onRightArrowClick : this.handleArrowRight,
        };
        
        const domContainer = document.querySelector('#' + this.id);     
        ReactDOM.render(React.createElement(NxCalendar, props), domContainer);

        if (forceRecalc)
           this.recalcPositions(domContainer);
    }
}