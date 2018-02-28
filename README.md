# Webpackbin has been deprecated

Instead of working on two similar services Codesandbox.io creator and me are putting our efforts into one project. Please move on to Codesandbox.io for a much better experience than Webpackbin. Very sorry if this makes you sad, but promise that you will feel better when you move on :-)

The domain of http://webpackbin.com  has expired, sorry about that, but was too much money to pay for keeping it up for another week. If you need your bin code, you can go to: https://webpackbin-prod.firebaseapp.com/  for now. Move it to http://codesandbox.io  :-)

----

# webpackbin
A service to share and teach code, using webpack to bundle the code

## Architecture
Webpackbin depends on three separate parts.

The [webpack-dll](https://github.com/cerebral/webpack-dll) service receives a request for one or multiple packages that should be bundled together into a Webpack DLL. A CDN will hold on to the *manifest.json* and *dll.js* files created.

The [webpack-sandbox](https://github.com/cerebral/webpack-sandbox) service creates a webpack session based on your current webpackbin session. It is what bundles your actual bin code together. It will fetch the *manifest.json* file to produce references to the external packages code. This service also runs the result of your BIN code, presented in an iFrame on Webpackbin. Any updates of the BIN goes to this service and then Webpackbin refreshes the iFrame. The bundled BIN code injects a script to the *dll.js* file.

The **Webpackbin** client connects to Firebase to create new bins, update current state of bins, run LIVE sessions etc. It connects to **webpack-sandbox** to run the code.

## How to run the project

### webpack-dll
1. `git clone https://github.com/cerebral/webpack-dll.git`
2. `npm install`
3. `npm start`
4. Runs service on *localhost:5000*

This will run the service in DEBUG mode. You will be able to open *localhost:5000* in the browser to see a list of bundled DLLs and investigate their manifests.


### webpack-sandbox
1. `git clone https://github.com/cerebral/webpack-sandbox.git`
2. `npm install`
3. `npm start`
4. Runs service on *localhost:4000*

The sandbox does not have any dashboard, it just needs to run in the background.

### webpackbin
1. `git clone https://github.com/cerebral/webpackbin.git`
2. `npm install`
3. `npm start`
4. Runs client on *localhost:3000*

## How to contribute

Webpackbin is built using the upcoming [cerebral 2](https://cerebral.github.io) framework, using [Inferno](https://infernojs.org/) as the view layer. It is a framework that handles the complexities of application like Webpackbin very well.

The client is built using Webpack and it will lazy load the correct client (desktop or mobile) when it loads. The **components** folder does not have any business logic. The components are focused on only rendering the application and each component connects to any state or signals it needs. There is almost no *props* passing.

The **modules** folder holds the business logic, contained in signals, actions, chains and factories. Cerebral 2 is a highly composable framework and can describe most of its side effects and state changes in a declarative manner.
