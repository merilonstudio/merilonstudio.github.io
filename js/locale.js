var locData = null;
var userLang = navigator.language || navigator.userLanguage;

var file = "";
var currentLocale = "";

if (typeof (Storage) !== "undefined"
        && localStorage.getItem("currentLocale") !== "") {
    localStorage.getItem("currentLocale")

    currentLocale = localStorage.getItem("currentLocale");
    userLang = localStorage.getItem("currentLocale");
}

if (userLang === "fr") {
    file = "locales/fr.json";
    $("html").attr("lang", "fr");
    currentLocale = "fr";
} else {
    file = "locales/en.json";
    $("html").attr("lang", "en");
    currentLocale = "en";
}

if (typeof (Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    localStorage.setItem("currentLocale", currentLocale);
} else {
    // Sorry! No Web Storage support..
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
            $(this).text(locData[key]);
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
