
(function() {

    // --- utilities

    function hasClass(el, name) {
        return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
    }
    function addClass(el, name) {
        if (!hasClass(el, name)) {
            el.className += (el.className ? ' ' : '') +name;
        }
    }
    function removeClass(el, name) {
        if (hasClass(el, name)) {
            el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
        }
    }

    // --- states controls

    var pageStates = [
        'show-operatorselection',
        'show-directsubscribe',
        'show-doubleconfirmation',
        'show-subscriptionpolling',
        'show-numberentry',
        'show-pinentry',
        'show-mo',
        'show-congrats',
        'show-error'
    ];
    var container = document.getElementById('container');
    window.state = function(string) {
        if (string == null || string == '' || string == '?' || string == 'help') {
            console.log(
                "You can use the following command:\n\n" +
                "- Operator Selection: \t\tstate('show-operatorselection')\n" +
                "- Default: \t\t\t\t\tstate('show-directsubscribe')\n" +
                "- Double Confirmation: \t\tstate('show-doubleconfirmation')\n" +
                "- Subscription Polling: \tstate('show-subscriptionpolling')\n" +
                "- Number Entry: \t\t\tstate('show-numberentry')\n" +
                "- PIN Entry: \t\t\t\tstate('show-pinentry')\n" +
                "- MO Message: \t\t\t\tstate('show-mo')\n" +
                "- Congrats: \t\t\t\tstate('show-congrats')\n" +
                "- Error: \t\t\t\t\tstate('show-error')"
            );
        }
        else {
            for(var i=0; i<pageStates.length; i++) {
                removeClass(container, pageStates[i]);
            }
            addClass(container, string);
        }
    }

    // --- animation controls

    window.animation = function(boolean) {
        if (boolean === false) {
            addClass(container, 'stop-all-animations');
        }
        else if (boolean === true) {
            removeClass(container, 'stop-all-animations');
        }
        else {
            console.log(
                "You can use the following command:\n\n" +
                "- Animations On: \t\t\tanimation(true)\n" +
                "- Animations Off: \t\t\tanimation(false)\n"
            );
        }
    }

    // --- dynamic contents controls

    function getFileName() {

        // when page load, check if url is index ["", "index.html"] or not
        // ref: http://befused.com/javascript/get-filename-url

        var url = document.location.href;
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        return url;

    }

    var isIndex = getFileName();

    if (isIndex == "" || isIndex == "index.html") {

        // load default.html and attach it to subscr-flow-states div
        // ref: http://stackoverflow.com/a/17636635/7702792

        function attachdefault() {
            var sfc = document.getElementById('subscr-flow-states'),
            pageRequest = new XMLHttpRequest();
            pageRequest.onreadystatechange = function() { 
                if (pageRequest.readyState == 4 && pageRequest.status == 200) {
                    sfc.innerHTML = pageRequest.responseText;
                }
            }
            pageRequest.open("GET", "./default.html", true);
            pageRequest.setRequestHeader('Content-type', 'text/html');
            pageRequest.send();
        }
        attachdefault();

        // load texts.json and replace [text-here] with correct value
        // ref: http://stackoverflow.com/a/43044968/7702792

        var jsonRequest = new XMLHttpRequest();
        jsonRequest.onreadystatechange = function() {
            if (jsonRequest.readyState == 4 && jsonRequest.status == 200) {

                var jsonData = JSON.parse(jsonRequest.responseText);

                var data = {};
                jsonData.map(function(d) {
                    data[d.PageTextKeyName] = d.PageTextValueName;
                });

                var matchText = function(node, regex, callback, excludeElements) {
                    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'canvas']);
                    var child = node.firstChild;
                    if(!child)
                        return node;
                    do {
                        switch (child.nodeType) {
                            case 1:
                                if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1)
                                    continue;
                                matchText(child, regex, callback, excludeElements);
                                break;
                            case 3:
                                child.data = child.data.replace(regex, callback);
                                break;
                        }
                    } while (!!(child = child.nextSibling));
                    return node;
                };

                matchText(document.body, /\[(.*?)\]/gi, function(match) {
                    var key = match.substring(1, match.length-1);
                    return (!!data[key]) ? data[key] : match;
                });

            }
        }
        // jsonRequest.open('GET', 'http://172.30.0.166:7870/api/Lpp/pagetexts/Filter?countryCode=tr&operators=300&service=MobileAcademy&languageCode=tr');
        // jsonRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        jsonRequest.open('GET', '../../../../../data/texts.json');
        jsonRequest.setRequestHeader("Content-Type", "application/json");
        jsonRequest.send();

    }

})();
