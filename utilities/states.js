
(function() {

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

})();
