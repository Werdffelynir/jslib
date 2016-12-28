////////////////////////////////////////////////////////////////////////
// Date Methods

var Ut = window.Ut || {};   // <<< DELETE THIS STRING

Ut.Date = {};

Ut.Date.msInDay = 864e5;

Ut.Date.msInHour = 36e5;

Ut.Date.msInMinute = 6e4;

Ut.Date.time = function(date){
    return date instanceof Date ? date.getTime() : (new Date).getTime()
};

/**
 * Add days to some date
 * @param day           number of days. 0.04 - 1 hour, 0.5 - 12 hour, 1 - 1 day
 * @param startDate     type Date, start date
 * @returns {*}  type Date
 */
Ut.Date.addDays = function (day, startDate){
    var date = startDate ? new Date(startDate) : new Date();
    date.setTime(date.getTime() + (day * 86400000));
    return date;
};

/**
 * Time between Dates
 * <pre>
 *     var from = new Date('2016-08-01 20:30');
 *     var to = new Date('2016-08-10 07:55');
 *     Ut.Date.betweenDates(from, to); // Object { day: 8, hour: 11, minute: 25 }
 * </pre>
 * @namespace Ut.Date.betweenDates
 * @param dateFrom
 * @param dateTo
 * @returns {{day: number, hour: number, minute: number}}
 */
Ut.Date.betweenDates = function(dateFrom, dateTo){
    dateFrom = dateFrom || new Date();
    dateTo = dateTo || new Date();
    var diffMs = (dateTo - dateFrom),
        diffDays = Math.round(diffMs / 864e5),
        diffHrs = Math.round((diffMs % 864e5) / 36e5),
        diffMins = Math.round(((diffMs % 864e5) % 36e5) / 6e4);
    return {day: diffDays, hour: diffHrs, minute: diffMins};
};
