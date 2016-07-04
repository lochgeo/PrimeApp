$(document).ready(function () {
    $("#btn1").click(calcPrime);
    $("#btn2").click(calcChild);

    function calcPrime() {
        var n, i, j, k, ms1, ms2, lookBack, lastPrime;
        var isPrime = {
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
            isPrime[i] = false;

        for (i = 3; i <= Math.sqrt(n); i += 2) {
            k = Math.floor((n - lookBack) / i);
            k = (k < 3) ? 3 : k;
            if (i > 8) {
                if (i % 3 != 0 && i % 5 != 0 && i % 7 != 0) {
                    for (j = i * k; j <= n; j += i)
                        isPrime[j] = false;
                }
            } else {
                for (j = i * k; j <= n; j += i)
                    isPrime[j] = false;
            }
        }

        lastPrime = -1;
        for (i = n - lookBack; i <= n; i++) {
            if (!(i in isPrime)) {
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

    function calcChild() {
        var str1, str2;
        var i, j, k, ms1, ms2;

        $('#results').empty();
        $('#time').empty();

        str1 = $("#input2").val();
        str2 = $("#input3").val();

        var date = new Date();
        ms1 = date.getTime();

        var str1 = [...str1];
        var str2 = [...str2];
        var lcs = {};

        for (i = 0; i <= str1.length; i++) {
            lcs[i] = {};
            for (j = 0; j <= str2.length; j++)
                lcs[i][j] = 0;
        }


        for (i = 1; i <= str1.length; i++) {
            for (j = 1; j <= str2.length; j++) {
                if (str1[i - 1] == str2[j - 1])
                    lcs[i][j] = lcs[i - 1][j - 1] + 1;
                else
                    lcs[i][j] = lcs[i][j - 1] > lcs[i - 1][j] ? lcs[i][j - 1] : lcs[i - 1][j];
            }
        }

        var lcsStr1 = '';

        for (i = str1.length, j = str2.length; i > 0, j > 0;) {
            curr = lcs[i][j];
            up = lcs[i - 1][j];
            left = lcs[i][j - 1];

            if (curr == up) i = i - 1;
            if (curr == left) j = j - 1;

            if (curr == up || curr == left)
                continue;
            else {
                lcsStr1 = str1[i - 1] + lcsStr1;
                i = i - 1;
                j = j - 1;
            }
        }


        date = new Date();
        ms2 = date.getTime();

        $("#time").append("elapsed=" + (ms2 - ms1) + "ms<br>");
        $("#results").append(lcsStr1 + "<br>");
    }
});

function calcChild2(str1, str2) {
    var i, j, k, ms1, ms2;
    var lcs = {};

    for (i = 0; i <= str1.length; i++) {
        lcs[i] = {};
        for (j = 0; j <= str2.length; j++)
            lcs[i][j] = 0;
    }

    for (i = 1; i <= str1.length; i++) {
        for (j = 1; j <= str2.length; j++) {
            if (str1[i - 1] == str2[j - 1])
                lcs[i][j] = lcs[i - 1][j - 1] + 1;
            else
                lcs[i][j] = lcs[i][j - 1] > lcs[i - 1][j] ? lcs[i][j - 1] : lcs[i - 1][j];
        }
    }

    return lcs[i - 1][j - 1];

    /*    var lcsStr1 = '';
    
        for (i = str1.length, j = str2.length; i > 0, j > 0;) {
            curr = lcs[i][j];
            up = lcs[i - 1][j];
            left = lcs[i][j - 1];
    
            if (curr == up) i = i - 1;
            if (curr == left) j = j - 1;
    
            if (curr == up || curr == left)
                continue;
            else {
                lcsStr1 = str1[i - 1] + lcsStr1;
                i = i - 1;
                j = j - 1;
            }
        }
    
        return lcsStr1;*/
}