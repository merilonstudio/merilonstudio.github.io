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
    if (file !== "") {
        
        $("#setEn, #setFr").click(function(e) {
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
