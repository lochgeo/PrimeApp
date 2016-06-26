$(document).ready(function() {
    $("#btn1").click(calcPrime);

    function calcPrime() {
        var n, i, j, k, ms1, ms2, lookBack, lastPrime;
        var notPrime = {
            0: false,
            1: false
        };

        n = $("#input1").val();
        lookBack = 100000;
        $('#results').empty();
        $('#time').empty();

        $("#time").append("Twin Primes between " + (n - lookBack) + " and " + n + "<br>");

        var date = new Date();
        ms1 = date.getTime();

        k = (n % 2 == 0) ? (n - lookBack) : (n - lookBack - 1);
        k = (k < 4) ? 4 : k;

        for (i = k; i <= n; i += 2)
            notPrime[i] = false;

        for (i = 3; i <= Math.sqrt(n); i += 2) {
            k = Math.floor((n - lookBack) / i);
            k = (k < 3) ? 3 : k;
            if (i > 8) {
                if (i % 3 != 0 && i % 5 != 0 && i % 7 != 0) {
                    for (j = i * k; j <= n; j += i)
                        notPrime[j] = false;
                }
            } else {
                for (j = i * k; j <= n; j += i)
                    notPrime[j] = false;
            }
        }

        lastPrime = -1;
        for (i = n - lookBack; i <= n; i++) {
            if (!(i in notPrime)) {
                if (i - lastPrime == 2) {
                    $("#results").append(lastPrime + ", " + i + "<br>");
                }
                lastPrime = i;
            }
        }

        date = new Date();
        ms2 = date.getTime();

        $("#time").append("elapsed=" + (ms2 - ms1) + "ms<br>");
    }
});
