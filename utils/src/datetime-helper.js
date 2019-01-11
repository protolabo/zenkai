export const DateTimeHelper = {
    /**
     * Returns a value indicating the day of the week with monday = 0
     * @param {Date} date 
     */
    dayOfWeek: function (date) {
        var d = date.getDay();
        return d == 0 ? 6 : d - 1;
    },
    // Compare 2 times and returns
    //  1 if t1 > t2
    //  0 if t1 = t2
    // -1 if t1 < t2
    compareTime: function (t1, t2) {
        var arr1 = t1.split(':');
        var arr2 = t2.split(':');

        // hour comparison
        if (+arr1[0] > +arr2[0])
            return 1;
        else if (+arr1[0] < +arr2[0])
            return -1;
        else {
            // minute comparison
            if (+arr1[1] > +arr2[1])
                return 1;
            else if (+arr1[1] < +arr2[1])
                return -1;
            else {
                if (arr1.length == arr2.length && arr1.length == 3) {
                    // second comparison
                    if (+arr1[2] > +arr2[2])
                        return 1;
                    else if (+arr1[2] < +arr2[2])
                        return -1;
                }

                return 0;
            }
        }
    },
    parseTime: function (n) {
        var hh = +n | 0;
        var mm = '00';
        if (!this.isInt(+n))
            mm = (n + '').split('.')[1] * 6;
        return hh + ':' + mm;
    }
}

// Returns a date using the format "YYYY-mm-dd"
function shortDate(myDate) {
    var d = new Date(myDate);
    var dd = d.getDate();
    var mm = d.getMonth() + 1; // January = 0
    var yyyy = d.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    d = yyyy + '-' + mm + '-' + dd;

    return d;
}

// Returns a date and time using the format "YYYY-mm-dd hh:MM"
function longDate(myDate) {
    var d = new Date(myDate);
    var hh = d.getHours();
    var MM = d.getMinutes();

    if (MM < 10) MM = '0' + MM;
    d = shortDate(d) + ' ' + hh + ':' + MM;

    return d;
}

// Convertie une date de string (YYYY-MM-DD) en format Date
function parseDate(strDate) {
    var arrDate = strDate.split('-');
    return new Date(arrDate[0], arrDate[1] - 1, arrDate[2], 0, 0, 0, 0);
}

// Convertie une date de string (YYYY-MM-DD hh:mm) en format Date
function parseDateTime(strDate) {
    var arrDateTime = strDate.split(' ');
    var arrTime = arrDateTime[1].split(':');
    var d = parseDate(arrDateTime[0]).setHours(+arrTime[0], +arrTime[1]);
    return new Date(d);
}