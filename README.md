# Project Hermes
Used for creating First Screen (1Screen) LPP landing page.

### How to setup:
------
* Download, Fork, or Clone this repo
* Install [node.js ^6.0.0](https://nodejs.org/en/) if you need multiple version you can use [nvm](http://nvm.sh)
* `npm install`
* Create a new file on `root` name `./config.json` and copy the following:
```
{
    "port" : "2727",
    "creatives" : "creatives",
    "creativeName" : "KeyToHappiness",
    "country" : "TR",
    "operatorId" : "_300",
    "previewHtml" : "preview.html",
    "defaultHtml" : "default.html",
    "indexHtml" : "index.html"
}
```

### Where:
------
* `port`: your prefered port
* `creative`: creative folder, no need to change this
* `creativeName`: creative name that your working on
* `country`: country iso alpha-2 code in capital letters
* `operatorId`: operator ID, for multiple operator you can do "_100_200_300"
* `previewHtml`: html file for preview, no need to change this
* `defaultHtml`: html file for subscription flow, no need to change this
* `indexHtml`: html file for creative, no need to change this

### Commands:
------

`$ gulp`

Default, this will create the server, watch for file changes and reload the page, open page your working on. Please note to keep this is the background.

`$ gulp deploy`

This command will split your `preview.html`, separate subscription flow to `default.html` and creative to `index.html`.

`$ gulp qr`

This command will create a QR code for you to check your page on your mobile devices. Please note that this will only open `preview.html`.

`$ gulp browse`

This command will open your root crative folder `./creative/` on your default browser, for you to preview, or check other creatives.

### Before pushing:
------

Check your `default.html` and `index.html` before you commit you page on the LPP, make sure that the text are linked from the LPP database. You can use `UpgradeYourself/TR/_300/` as reference. If subscription flow exist on `SubscriptionState` folder on LPP repo, you don't need to include `default.html` file.