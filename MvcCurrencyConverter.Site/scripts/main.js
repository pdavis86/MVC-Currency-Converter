var currencyConverter = {};

currencyConverter.getGbpToEur = function () {

    var elRate = document.querySelectorAll('.currency-converter-rate')[0];
    var elRateDate = document.querySelectorAll('.currency-converter-rate-date')[0];
    var elError = document.querySelectorAll('.currency-converter-form .error')[0];

    elError.innerHTML = '';

    currencyConverter.currFrom = 'GBP';
    currencyConverter.currTo = 'EUR';
    currencyConverter.lastRequest = new Date();
    
    var request = new XMLHttpRequest();
    request.open('POST', 'home/GetGbpToEur', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            currencyConverter.gbpToEur = data;
            elRate.innerHTML = currencyConverter.gbpToEur;
            elRateDate.innerHTML = currencyConverter.lastRequest.toShortDateTime();

        } else {
            // We reached our target server, but it returned an error
            console.log('Something went wrong!', request.statusText);
            elError.innerHTML = 'Sorry, something went wrong trying to get the rate. Please try again later.';
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
        console.log('Connection error!');
        elError.innerHTML = 'Sorry, something is wrong with the sonnection to our servers. Please try again later.';
    };

    request.send();
}

currencyConverter.getGbpToEurAgain = function () {
    var milisecondDiff = new Date() - currencyConverter.lastRequest;
    if (milisecondDiff > 5000) {
        currencyConverter.getGbpToEur();
    }
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {

    currencyConverter.getGbpToEur();

    var elsCurrencyFrom = document.querySelectorAll('.currency-from')[0];
    var elsCurrencyTo = document.querySelectorAll('.currency-to')[0];

    document.querySelectorAll('.currency-from-label')[0].innerHTML = currencyConverter.currFrom;
    document.querySelectorAll('.currency-to-label')[0].innerHTML = currencyConverter.currTo;

    elsCurrencyFrom.addEventListener('input', function (e) {
        elsCurrencyTo.value = (e.target.value * currencyConverter.gbpToEur).toFixed(2);
        currencyConverter.getGbpToEurAgain();
    });

    elsCurrencyTo.addEventListener('input', function (e) {
        elsCurrencyFrom.value = (e.target.value / currencyConverter.gbpToEur).toFixed(2);
        currencyConverter.getGbpToEurAgain();
    });

});