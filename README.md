# Project Hermes
Used for creating First Screen (1Screen) LPP landing page.

### How to setup:
------
* Download, Fork, or Clone this repo
* Download and install [Visual Studio Code](https://code.visualstudio.com/) or [Sublime Text](https://www.sublimetext.com/)
* Download and install [node.js ^6.0.0](https://nodejs.org/en/), if you need multiple version you can use [nvm](http://nvm.sh)
* Open your terminal and type `npm install`
* Create a new file on `root` name `./config.json` and copy the following:
```
{
    "port" : "2727",
    "creatives" : "creatives"
}
```

### Where:
------
* `port`: your prefered port
* `creative`: creative folder, no need to change this

### Commands:
------

```
$ gulp
```

Default, this will create the server, watch for file changes and reload the page. Please note to keep this is the background.

```
$ gulp --gulpfile ./utilities/deploy.js --creative creatives/creativeName/XX/_123/preview.html
```

This command will split your `preview.html`, separate subscription flow to `default.html` and creative to `index.html`.

```
$ gulp --gulpfile ./utilities/preview.js --creative creatives/creativeName/XX/_123/preview.html
```

This command will open your `preview.html` file in your default browser.

For Visual Studio Code, while your on `preview.html`, you can press `cmd+p` on macOS, `ctrl+p` on Windows, then type: `task prev`. Select `Hermes: Preview` and hit enter.

For Sublime Text, I'm still working on custom command palette, stay tuned for the update.

```
$ gulp --gulpfile ./utilities/qrcode.js --creative creatives/creativeName/XX/_123/preview.html
```

This command will create a QR code for you to check your page on your mobile devices. Please note that this will only open `preview.html`.

```
$ gulp --gulpfile ./utilities/browse.js --creative creatives/creativeName/XX/_123/preview.html
```

This command will open your root crative folder `./creative/` on your default browser, for you to preview, or check other creatives.

### Before pushing:
------

Check your `default.html` and `index.html` before you commit you page on the LPP, make sure that the text are linked from the LPP database. You can use `UpgradeYourself/TR/_300/` as reference. If subscription flow exist on `SubscriptionState` folder on LPP repo, you don't need to include `default.html` file.