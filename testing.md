# Invitation

I am super happy to invite you in to test the new version of Webpackbin. A lot of improvements has been made to the project and now it is time to see if they actually work :)

If you are interested in checking out the new architecture you can [take a look at this clip](https://www.youtube.com/watch?v=LWZHFcA9W6M).

## Improvements
- The DLL bundles (NPM packages bundle) now has an alghoritm to find relevant entry points to expose
- The DLL bundles will now sit behind a CDN (not in test), making them faster to load
- The sandbox feature is now its own standalone service that can be scaled to multiple instances, meaning that memory issues should be gone. There are thousands of memory warnings a day in current solution
- Now running on Firebase, meaning that the LIVE feature is a lot more stable
- Github login, though you can use the service anonymously. Later you can convert all interaction to a github account
- "My bins", add any bin with a custom name to your own personal list
- "Boilerplates" can now be managed by library authors, making sure it runs on latest version etc.
- All projects (webpackbin, webpack-sandbox and webpack-dll) are refactored and cleaned up
- Added new loaders (Inferno, decorators, class properties etc.)
- Configuration (currently toggle linting)

## The test environment
The test environment is running on Heroku instances that needs to sleep. That means you might experience it takes a few extra seconds loading your bin and making NPM package lookups might also take a few seconds. Other than that it should behave pretty much like production environment.

## Reporting bugs and contributing
When you find something wrong please create an issue with **reproducable** steps, or even better create a PR with a fix for it. Webpackbin is going to continue to be a community tool and improve with new features. It is a lot of work though and there will be times where things slows down due to caring for family and work. But if more people get on board we can keep the project evolving at a steady pace.

## Where to go?
[Start testing here](https://webpackbin-test.firebaseapp.com/)
