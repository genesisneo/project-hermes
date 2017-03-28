
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

    if (window.location.pathname.indexOf('index.html') != -1 || window.location.pathname.indexOf('default.html') != -1) {

        var jsonRequest = new XMLHttpRequest();
        jsonRequest.open('GET', '../../../../data/texts.json');
        jsonRequest.setRequestHeader("Content-Type", "application/json");
        jsonRequest.onload = function() {

            // http://stackoverflow.com/questions/43044137

            var jsonData = JSON.parse(jsonRequest.responseText);

            var data = {};
            jsonData.map(function(d) {
                data[d.PageTextKeyName] = d.PageTextValueName;
            });

            var matchText = function(node, regex, callback, excludeElements) {
                excludeElements || (excludeElements = ['script', 'style', 'iframe', 'canvas', 'input', 'label']);
                var child = node.firstChild;
                do {
                    switch (child.nodeType) {
                        case 1:
                            if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) {
                                continue;
                            }
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
        jsonRequest.send();

    }

})();
