function rLoad(options) {
    var Url = rescUrl;
    var msk = document.createElement("div");
    var fileref;

    for (var k = 0; k < options.length; k++) {
        switch (true) {
            case options[k].indexOf(".css") > 0:
                fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", Url + options[k]);
                break;

            case options[k].indexOf(".js") > 0:
                fileref = document.createElement("script");
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", Url + options[k]);
                break;
        }
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}
