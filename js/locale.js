var locData = null;
var userLang = navigator.language || navigator.userLanguage;

var file = "";

if (typeof (Storage) !== "undefined"
        && localStorage.getItem("currentLocale") !== null
        && localStorage.getItem("currentLocaleDate") !== null) {
    if (isExpired(new Date(localStorage.getItem("currentLocaleDate")))) {
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
    file = "locales/en.json";
    $("html").attr("lang", "en");
}

if (file !== "") {
    $.getJSON(file, function(data) {
        locData = data.values;
    });
}
$(function() {
    if (locData !== null) {

        $("[data-locale-text]").each(function(index) {
            var key = $(this).attr("data-locale-text").trim().toLowerCase();
            $(this).html(locData[key]);
        });

        $("[data-locale-title]").each(function(index) {
            var key = $(this).attr("data-locale-title").trim().toLowerCase();
            $(this).attr("title", locData[key]);
        });

        $("[data-locale-bgimg]").each(function(index) {
            var key = $(this).attr("data-locale-bgimg").trim().toLowerCase();
            $(this).css("background-image", "url(" + locData[key] + ")");
        });
    }
});

function isExpired(secondDate) {
    var oneDay = 24 * 60 * 60 * 1000;
    var days = Math.round(Math.abs((Date.now() - new Date(parseInt(localStorage
            .getItem("currentLocaleDate"))).getTime())
            / (oneDay)));
    return days >= 30;
}
