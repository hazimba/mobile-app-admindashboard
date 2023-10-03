import moment from 'moment';

const DATE_PATTERN_FORMAT = 'DD/MM/YYYY';
const INPUT_DATE_FORMAT = 'yyyy-MM-DD';
const TIME_WITHOUT_AM_OR_PM_PATTERN_FORMAT = 'HH:mm:ss';
const TIME_PATTERN_FORMAT = 'h:mm A';
const DATE_AND_TIME = 'DD/MM/YYYY h:mm A';


function formatDate(date){
    if(!date){
        return 'No Date'
    }

    return moment(date).format(DATE_PATTERN_FORMAT);
}


function formatDateToInputDate(date){
    if(!date){
        return null
    }

    return moment(date, DATE_PATTERN_FORMAT).format(INPUT_DATE_FORMAT);
}



function formatTimeFromDate(dateTime){

    console.log("DATETIME", dateTime)
    if(!dateTime){
        return 'No Date and Time'
    }

    const dateAndTime = moment(dateTime, `${DATE_PATTERN_FORMAT} ${TIME_PATTERN_FORMAT}`).toDate();
    
    const time = moment(dateAndTime.getTime()).format(TIME_PATTERN_FORMAT);
    
    if(isYesterday(dateAndTime)){
        return 'Yesterday';        
    }

    if(isMoreThanYesterday(dateAndTime)){
        return moment(dateAndTime).format(DATE_AND_TIME);
    }
    
    return time;
}


function isYesterday(date){
    const yesterday = moment().subtract(1, 'day');

    if(moment(date).isSame(yesterday, 'day')){
        return true;
    }

    return false;
}

function isMoreThanYesterday(date){
    const today = moment().toDate();
    const moreThanYesterday = moment().subtract(2, 'day');

    if(!moment(today).isSame(date, 'day') || moment(date).isSame(moreThanYesterday, 'day')){
        return true;
    }

    return false;
}

export { DATE_PATTERN_FORMAT, TIME_WITHOUT_AM_OR_PM_PATTERN_FORMAT, formatDate, formatTimeFromDate, formatDateToInputDate };