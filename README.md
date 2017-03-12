# Project Hermes
Used for creating [First Screen](http://1screen.com/) LPP landing page.

## :information_source: How to setup:

* Download, Fork, or Clone this repo.
* Download and install [Visual Studio Code](https://code.visualstudio.com/) or [Sublime Text](https://www.sublimetext.com/).
* Download and install [node.js ^6.0.0](https://nodejs.org/en/). If you need multiple version you can use [nvm](http://nvm.sh). For Windows user, please read [notes](#notes) below.
* Open terminal on this repo and type `npm i -g gulp`, once done, type `npm i` to install all dependcies for this repo. For Windows user, please read [notes](#notes) below.
* Create a new file on `root` name `./config.json` and copy the following:
```json
{
    "port" : "2727",
    "creatives" : "creatives"
}
```

### :book: Where:

* `port`: your prefered port
* `creative`: your creative folder

## :information_source: Commands:

### Default

```bash
$ gulp
```

Default, this will create the server, watch for file changes and reload the page. Please note to keep this is the background.

### Deploy

```bash
$ gulp --gulpfile ./utilities/deploy.js --creative creatives/creativeName/XX/_123/preview.html
```

This command will split your `preview.html`, separate subscription flow to `default.html` and creative to `index.html`.

### Preview

```bash
$ gulp --gulpfile ./utilities/preview.js --creative creatives/creativeName/XX/_123/preview.html
```

This command will open your current open file in your default browser. This only works on the following pages `default.html`, `index.html`, and `preview.html`.

### QR Code

```bash
$ gulp --gulpfile ./utilities/qrcode.js --creative creatives/creativeName/XX/_123/preview.html
```

This command will create a QR code for you to check your page on your mobile devices. Please note that this will only open `preview.html`.

### Browse

```bash
$ gulp --gulpfile ./utilities/browse.js
```

This command will open your root crative folder `./creative/` on your default browser, for you to preview, or check other creatives.

## :information_source: Before pushing:

Check your `default.html` and `index.html` before you commit you page on the LPP, make sure that the text are linked from the LPP database. You can use `UpgradeYourself/TR/_300/` as reference. If subscription flow exist on `SubscriptionState` folder on LPP repo, you don't need to include `default.html` file.

## :information_source: Plugins:

### Visual Studio Code

Custom commands for this editor is ready to use, just open this repo on your Visual Studio Code and press <kbd>cmd</kbd>+<kbd>p</kbd> for macOS, <kbd>ctrl</kbd>+<kbd>p</kbd> on Windows, and type `task herm`. You can choose from `browse`, `deploy`, `preview`, or `qr`. For Windows user, please read [notes](#notes) below.

### Sublime Text

This custom commands only works on macOS. Copy all the files on `.sublime` folder and paste it on the directory below. Once done, open this repo on your Sublime Text and you press <kbd>cmd</kbd>+<kbd>shift</kbd>+<kbd>p</kbd> and type `herm`. You can choose from `browse`, `deploy`, `preview`, or `qr`.

```
{user}/Library/Application Support/Sublime Text 3/Packages/User
```

### :book: Where:

* `user`: is your home directory, not your root ("~"). If you don't know your home directory is, you can search [here](https://support.apple.com/kb/PH25270?locale=en_US).

## <a id="notes" name="notes"></span>:information_source: Notes:

For Windows user only. Once you've install [node.js ^6.0.0](https://nodejs.org/en/) and [gulp.js ^3.9.0](http://gulpjs.com/) globally & locally, you need to add their paths to Windows Environment. To do this, search for `Environment variables` on your Windows and add the following:

| Variable  | Value                             |
|-----------|-----------------------------------|
| NODE_PATH | %AppData%\npm\node_modules        |
| GULP_PATH | %USERPROFILE%\AppData\Roaming\npm |

## :information_source: Question:

If you have question, you can always contact me on Twitter [@genesis_neo](https://twitter.com/genesis_neo) and of course here in GitHub [@genesisneo](https://github.com/genesisneo). Thank you.

<p align="center">-=[ :heart: ]=-</p>