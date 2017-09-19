$(function() {

    $("#author").text($("#author").text() + " - " + (new Date()).getFullYear());

    $("#setEn, #setFr").click(function(e) {
        e.preventDefault();

        var newLocale = $(this).text().trim().toLowerCase();

        if (newLocale === "fr" || newLocale === "en") {

            if (typeof (Storage) !== "undefined") {

                var currentLocale = localStorage.getItem("currentLocale");

                if (currentLocale !== newLocale) {
                    localStorage.setItem("currentLocale", newLocale);
                    localStorage.setItem("currentLocaleDate", Date.now());
                    setTimeout(function(){
                        window.location.reload(true);
                    });
                }
            }
        }

    });

});
