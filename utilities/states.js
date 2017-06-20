
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
        'show-directsubscribe',
        'show-doubleconfirmation',
        'show-numberentry',
        'show-pinentry',
        'show-mo',
        'show-congrats',
        'show-subscriptionpolling'
    ];
    var pageOverlayStates = [
        'show-alreadysubscribed',
        'show-blocker',
        'show-immediatesubscribe',
        'show-redirectservice',
        'show-redirectxhrreturn',
        'show-popup'
    ];
    var container = document.getElementById('container');
    window.state = function(string) {
        if (string == null || string == '?' || string == 'help') {
            console.log(
                "You can use the following command:\n\n" +
                "- Direct Subscribe: \t\tstate('show-directsubscribe')\n" +
                "- Double Confirmation: \t\tstate('show-doubleconfirmation')\n" +
                "- Number Entry: \t\t\tstate('show-numberentry')\n" +
                "- PIN Entry: \t\t\t\tstate('show-pinentry')\n" +
                "- MO Message: \t\t\t\tstate('show-mo')\n" +
                "- Congrats: \t\t\t\tstate('show-congrats')\n" +
                "- Subscription Polling: \tstate('show-subscriptionpolling')\n" +
                "- Already Subscribed: \t\tstate('show-alreadysubscribed')\n" +
                "- Blocker: \t\t\t\t\tstate('show-blocker')\n" +
                "- Immediate Subscribe: \t\tstate('show-immediatesubscribe')\n" +
                "- Redirect Service: \t\tstate('show-redirectservice')\n" +
                "- Redirect XHR Return: \t\tstate('show-redirectxhrreturn')\n" +
                "- Pop Up: \t\t\t\t\tstate('show-popup')\n" + 
                "- Remove Overlay: \t\t\tstate('')"
            );
        }
        else if (string == '' || string == 'show-alreadysubscribed' || string == 'show-blocker' || string == 'show-immediatesubscribe' || string == 'show-redirectservice' || string == 'show-redirectxhrreturn' || string == 'show-popup') {
            for(var i=0; i<pageOverlayStates.length; i++) {
                removeClass(container, pageOverlayStates[i]);
            }
            addClass(container, string);
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
                if (pageRequest.readyState == 4 && pageRequest.status == 404) {
                    console.log('[!] ERROR:\n'+
                        'The file "default.html" is missing!\n'+
                        'It should be beside "index.html" to test this.\n'+
                        'Please read: https://github.com/genesisneo/project-hermes#commands');
                }
            }
            pageRequest.open("GET", "./default.html", true);
            pageRequest.setRequestHeader('Content-type', 'text/html');
            pageRequest.send();
        }
        attachdefault();

        // get url and url parts using javascript
        // ref: https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/

        var pageUrl = window.location,
            hostName = pageUrl.hostname,
            hostPort = pageUrl.port,
            splitPath = pageUrl.pathname.split('/');

        var pageFolder = splitPath[1],
            pageService = splitPath[2],
            pageCreative = splitPath[3],
            pageCountry = splitPath[4],
            pageOperator = splitPath[5];

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
                                node.innerHTML = node.innerHTML.replace(regex, callback);
                                break;
                        }
                    } while (!!(child = child.nextSibling));
                    return node;
                };

                matchText(document.getElementById('container'), /\[(.*?)\]/gi, function(match) {
                    var key = match.substring(1, match.length-1);
                    return (!!data[key]) ? data[key] : match;
                });

            }

            if (jsonRequest.readyState == 4 && jsonRequest.status == 404) {
                    console.log('[!] ERROR:\n'+
                        'The file "./data/texts.json" is missing!\n'+
                        'You need to do "Hermes: Data" first to test this.\n'+
                        'Please read: https://github.com/genesisneo/project-hermes#commands');
            }
            
        }
        // jsonRequest.open('GET', 'http://172.30.0.166:7870/api/Lpp/pagetexts/Filter?service='+pageService+'&countryCode='+pageCountry+'&operators='+pageOperator);
        // jsonRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        jsonRequest.open('GET', 'http://'+hostName+':'+hostPort+'/data/texts.json');
        jsonRequest.setRequestHeader("Content-Type", "application/json");
        jsonRequest.send();

    }

})();
