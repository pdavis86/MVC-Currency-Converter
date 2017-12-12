var exchangeRates = {};

getGbpToEur = function () {
    var request = new XMLHttpRequest();
    request.open('POST', '/home/GetGbpToEur', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            //console.log(data);

            exchangeRates.gbpToEur = data;

        } else {
            // We reached our target server, but it returned an error
            console.log('Something went wrong!');

        }
    };

    request.onerror = function () {
        // There was a connection error of some sort

        console.log('Connection error!');

    };

    request.send();
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {

    getGbpToEur();

    var elsCurrencyFrom = document.querySelectorAll('.currency-converter-form .currency-from');
    var elsCurrencyTo = document.querySelectorAll('.currency-converter-form .currency-to');

    elsCurrencyFrom[0].addEventListener('input', function (e) {
        //console.log('change made', e.target.value, exchangeRates.gbpToEur);
        elsCurrencyTo[0].value = (e.target.value * exchangeRates.gbpToEur).toFixed(2);
    });

    elsCurrencyTo[0].addEventListener('input', function (e) {
        //console.log('change made', e.target.value, exchangeRates.gbpToEur);
        elsCurrencyFrom[0].value = (e.target.value / exchangeRates.gbpToEur).toFixed(2);
    });
});