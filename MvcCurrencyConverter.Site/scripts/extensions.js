Date.prototype.toShortDateTime = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var mins = this.getMinutes();
    var secs = this.getSeconds();

    var dateSection = [
        (dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        this.getFullYear()
    ].join('/');

    var timeSection = [
        this.getHours(),
        (mins > 9 ? '' : '0') + mins,
        (secs > 9 ? '' : '0') + secs,
    ].join(':');

    return dateSection + ' ' + timeSection;
};