var userLang = navigator.language || navigator.userLanguage;
var file = "";

if (typeof (Storage) !== "undefined" && localStorage.getItem("currentLocale") !== null && localStorage.getItem("currentLocaleDate") !== null) {
    if (isExpired(localStorage.getItem("currentLocaleDate"))) {
        localStorage.removeItem("currentLocale");
        localStorage.removeItem("currentLocaleDate");
        localStorage.clear();
    } else {
        userLang = localStorage.getItem("currentLocale");
    }
}

if (userLang === "fr") {
    file = "locales/fr.json";
    $("html").attr("lang", "fr");
} else {
    userLang = "en";
    file = "locales/en.json";
    $("html").attr("lang", "en");
}

$(function() {

    var cnt = 0;
    var size = $("[w3-include-html]").length;
    $("[w3-include-html]").each(function(index) {
        cnt++;

        if (cnt < size) {
            $(this).load($(this).attr("w3-include-html"));
        } else {
            $(this).load($(this).attr("w3-include-html"), function() {
                loadData();
            });
        }

        $(this).removeAttr("w3-include-html");
    });

    function loadData() {
        if (file !== "") {

            $.getJSON(file, function(data) {
                var locData = data.values;
                if (locData !== null) {
                    $(document).find(".locale-select a[data-locale='" + userLang + "']").prepend('<i class="fa fa-check" aria-hidden="true"></i>');

                    $("[data-locale-text]").each(function(index) {
                        var key = $(this).attr("data-locale-text").trim().toLowerCase();
                        var res = getProperty(locData, key);

                        if (res !== "") {
                            $(this).html(res);
                        }
                    });

                    $("[data-locale-title]").each(function(index) {
                        var key = $(this).attr("data-locale-title").trim().toLowerCase();
                        var res = getProperty(locData, key);
                        if (res !== "") {
                            $(this).attr("title", res);
                        }
                    });

                    $("[data-locale-bgimg]").each(function(index) {
                        var key = $(this).attr("data-locale-bgimg").trim().toLowerCase();
                        var res = getProperty(locData, key);
                        if (res !== "") {
                            $(this).css("background-image", "url(" + res + ")");
                        }
                    });
                }
            });

            $("body").on("click", "#setEn, #setFr", function(e) {
                e.preventDefault();

                var newLocale = $(this).attr("data-locale").trim().toLowerCase();

                if (newLocale === "fr" || newLocale === "en") {

                    if (typeof (Storage) !== "undefined") {

                        var currentLocale = localStorage.getItem("currentLocale");

                        if (currentLocale !== newLocale) {
                            localStorage.setItem("currentLocale", newLocale);
                            localStorage.setItem("currentLocaleDate", Date.now());
                            setTimeout(function() {
                                window.location.reload(true);
                            });
                        }
                    }
                }

            });
            
            var coded = "pSzOTpO@lPCo7SzcOGBoS.pSl";
            var key = "XW8kCd0Opna7SAxUYjH6sELmieuFNbB3JyzTvfVgQrKqtc91loPGI5R42hMZwD";
            var shift = coded.length;
            var link = "";
            for (i = 0; i < coded.length; i++) {
                if (key.indexOf(coded.charAt(i)) == -1) {
                    ltr = coded.charAt(i);
                    link += (ltr);
                } else {
                    ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length;
                    link += (key.charAt(ltr));
                }
            }
            $("#author").text($("#author").text() + (new Date()).getFullYear());
            $("#contact").html("<a href='mailto:" + link + "'><i class='fa fa-envelope' aria-hidden='true'></i> <span data-locale-text='contactus'>Contact us</span></a>");
        }
    }

});

function getProperty(obj, prop) {
    if (prop.includes('.')) {
        var parts = prop.split('.');

        if (Array.isArray(parts)) {
            var last = parts.pop(), l = parts.length, i = 1, current = parts[0];

            while ((obj = obj[current]) && i < l) {
                current = parts[i];
                i++;
            }

            if (obj) {
                return obj[last];
            }
        } else {
            throw 'parts is not valid array';
        }
    } else {
        return obj[prop];
    }
}

function isExpired(secondDate) {
    var oneDay = 24 * 60 * 60 * 1000;
    var days = Math.round(Math.abs((Date.now() - new Date(parseInt(secondDate)).getTime()) / (oneDay)));
    return days >= 30;
}
