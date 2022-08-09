// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCLUJCLtTSaVmZhyXYhRH3VvoGXCcRGtqM",
    authDomain: "stripe-integration-af447.firebaseapp.com",
    projectId: "stripe-integration-af447",
    storageBucket: "stripe-integration-af447.appspot.com",
    messagingSenderId: "767098989379",
    appId: "1:767098989379:web:2142190e9e1721ecd51df6"
  },
  stripe:{
    key:"pk_test_51LTELgSE9qohiq2jFpVjWzPi5co6eSgl1ThCsICp519GzpKu23MhfMELAb6LzboXxEAGwsoSG7CzLUebmQn0el3K00dRhFxYou"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
