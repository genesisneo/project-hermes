# Project Hermes

Used for creating [First Screen](http://1screen.com/) LPP landing page.

---

## How to setup:

* Download, Fork, or Clone this repo.
* Download and install [Visual Studio Code](https://code.visualstudio.com/) or [Sublime Text](https://www.sublimetext.com/).
* Download and install [node.js ^6.0.0](https://nodejs.org/en/). If you need multiple version you can use [nvm](http://nvm.sh) but make sure `system` use [node.js ^6.0.0](https://nodejs.org/en/). For macOS & Windows user, please read "*Notes*" below.
* Open terminal or shell on this repo and type `npm i -g gulp`, once done, type `npm i` to install all dependcies for this repo. For macOS & Windows user, please read "*Notes*" below.
* Create a new file on `root` name `./config.json` and copy the following:
```json
{
    "port" : "2727",
    "creatives" : "Previews"
}
```

> Where:
> * `port`: your prefered port
> * `creatives`: your creatives folder

* Go back to your terminal or shell and type `gulp --gulpfile ./utilities/modules.js` to update [connect-livereload](https://github.com/intesso/connect-livereload) module used for reloading the page when you change any file while the server is running.
* Once everything is done, you can now start the server by typing `gulp` on your terminal.

---

## Commands:

**Default**

```bash
$ gulp
```

Default, this will create the server, watch for file changes and reload the page if necessary. Please note to keep it running in the background.

**Deploy**

```bash
$ gulp --gulpfile ./utilities/deploy.js --creative Previews/creativeName/xx/_123/preview.html
```

This command will split your `preview.html`. Separate subscription flow to `default.html` and creative to `index.html`. After you do this, please read *Before pushing* below.

**Preview**

```bash
$ gulp --gulpfile ./utilities/preview.js --creative Previews/creativeName/xx/_123/preview.html
```

This command will open your current opened file in your default browser. This only works on the following pages: `default.html`, `index.html`, and `preview.html`.

**QR Code**

```bash
$ gulp --gulpfile ./utilities/qrcode.js --creative Previews/creativeName/xx/_123/preview.html
```

This command will generate a QR code for you to check the page your working on to any mobile devices. Please note that this will only work on `preview.html`.

**Browse**

```bash
$ gulp --gulpfile ./utilities/browse.js
```

This command will open your root creative folder `./creative/` on your default browser, for you to preview, or check other creatives.

**Module**

```bash
$ gulp --gulpfile ./utilities/modules.js
```

This command can only be used once. Run this command after you type `npm i -g gulp` and `npm i`. This will update [connect-livereload](https://github.com/intesso/connect-livereload) module to include `./livereload.js` and `./utilities/states.js` temporarily on the page.

---

## Before pushing:

Check your `default.html` and `index.html` before you commit them to LPP repo. Make sure that the text are linked to the LPP database. You can use `UpgradeYourself/tr/_300/` or `KeyToHappiness/tr/_300/` as reference. If subscription flow exist on `SubscriptionState` folder on LPP repo, you don't need to include or copy `default.html` file anymore.

Make sure that there is no other content inside `#subscr-flow-states` other than the flow states. Any elements inside this container will be removed once your page reach Tech Team integration.

---

## Plugins:

**Visual Studio Code**

Custom commands for this editor is ready to use. Just open this repo on your Visual Studio Code and press <kbd>cmd</kbd>+<kbd>p</kbd> for macOS, <kbd>ctrl</kbd>+<kbd>p</kbd> on Windows, and type `task herm`. You can choose from `browse`, `deploy`, `preview`, or `qr`. For macOS & Windows user, please read "*Notes*" below.

**Sublime Text**

This custom commands only works on macOS. Copy all the files inside `.sublime` folder and paste it on the directory below. Once done, open this repo on your Sublime Text and you can press <kbd>cmd</kbd>+<kbd>shift</kbd>+<kbd>p</kbd> and type `herm`. You can choose from `browse`, `deploy`, `preview`, or `qr`. For macOS user, please read "*Notes*" below.

```
/Users/{home}/Library/Application Support/Sublime Text 3/Packages/User
```

> Where:
> * `home`: is your home directory, not your root ("~"). If you don't know your home directory is, you can search [here](https://support.apple.com/kb/PH25270?locale=en_US). Example: `/Users/g/Library/Application Support/Sublime Text 3/Packages/User/Hermes.py`

Can't find or see `.sublime` & `.vscode` folder on your macOS device?
Open your terminal and type the following command:

```bash
$ defaults write com.apple.finder AppleShowAllFiles YES
```

Once done, relaunch your Finder by holding <kbd>cmd</kbd>+<kbd>alt</kbd>+right click on the Finder icon from your Dock. You can click [here](http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/) for more information.

---

## Browser console function:

**State**

```bash
> state()
```

This command only accepts *Strings*. You can use the following command:

| State                 | Command                           |
|-----------------------|-----------------------------------|
| Operator Selection:   | state('show-operatorselection')   |
| Default:              | state('show-directsubscribe')     |
| Double Confirmation:  | state('show-doubleconfirmation')  |
| Subscription Polling: | state('show-subscriptionpolling') |
| Number Entry:         | state('show-numberentry')         |
| PIN Entry:            | state('show-pinentry')            |
| MO Message:           | state('show-mo')                  |
| Congrats:             | state('show-congrats')            |
| Error:                | state('show-error')               |

You can use `state()`, `state('?')`, or `state('help')` to show this commands.

**Animation**

```bash
> animation()
```

This command only accepts *Boolean*. You can use the following command:

| Animation State | Command          |
|-----------------|------------------|
| Animations On:  | animation(true)  |
| Animations Off: | animation(false) |

You can use `animation()`, `animation('?')`, or `animation('help')` to show this commands.

---

## Notes:

**macOS**

Make sure you have Xcode on your device.  if you do not have Xcode installed on your device and you do not wish to download the ~4.5GB file, you can install the Command Line Tools.

To do this, open your terminal and type `xcode-select --install` and press return, a popup window will appear that asks: “The xcode-select command requires the command line developer tools. Would you like to install the tools now?” choose to confirm this by clicking “Install”, then agree to the Terms of Service when requested. For troubleshooting, you can read it [here](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/).

**Windows**

Once [node.js ^6.0.0](https://nodejs.org/en/) and [gulp.js ^3.9.0](http://gulpjs.com/) are installed globally & locally, you need to add their paths to Windows environment. To do this, search for `Environment Variables` on your Windows device and add the following:

| Variable  | Value                             |
|-----------|-----------------------------------|
| NODE_PATH | %AppData%\npm\node_modules        |
| GULP_PATH | %USERPROFILE%\AppData\Roaming\npm |

---

## Question:

If you have question, you can always contact me on Twitter [@genesis_neo](https://twitter.com/genesis_neo) and of course here in GitHub [@genesisneo](https://github.com/genesisneo). Thank you.

---

<p align="center">-=[ :heart: ]=-</p>
