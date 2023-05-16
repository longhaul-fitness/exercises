/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-6e567876'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "_app/immutable/assets/0.50af18a6.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/2.f89f364a.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/ReloadPrompt.8b6f04a5.css",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.9bd1d5f2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.9d1d7ce4.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/paths.3eae459a.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.51eca629.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.2482d60c.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.bf62946f.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.e6a6d71e.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.b16efeb6.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.0b4c0c21.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.e8b4460e.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.7d3d1444.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "14a60b695db2bb24c06f3be71a592660"
  }, {
    "url": "favicon-16x16.png",
    "revision": "177518c0336d5d32fc02d687cc9b4798"
  }, {
    "url": "favicon-32x32.png",
    "revision": "51280d3e965b0590da61a44e0e8fb8f5"
  }, {
    "url": "favicon.ico",
    "revision": "5221515690dde05eaf80105f859d88f4"
  }, {
    "url": "pwa-192x192.png",
    "revision": "7fd830423c665d1efbe1c35af34639a6"
  }, {
    "url": "pwa-512x512.png",
    "revision": "1678bc31440677a28e66a725537d3ea4"
  }, {
    "url": "safari-pinned-tab.svg",
    "revision": "1c257ab0706bd73a11b393668b0a73e5"
  }, {
    "url": "exercises/1",
    "revision": "332c2767c247ab58ddfc96d0e5dbdc1f"
  }, {
    "url": "exercises/10",
    "revision": "fe629c33337a128a4d3f84e67b950609"
  }, {
    "url": "exercises/100",
    "revision": "1d84596464c52fc435a0d25da94a4318"
  }, {
    "url": "exercises/101",
    "revision": "22f66d0d90a8a869a0079d4bdc91d844"
  }, {
    "url": "exercises/102",
    "revision": "3bc03fce28ada5e2d022380e2df5c84a"
  }, {
    "url": "exercises/103",
    "revision": "1b8a36b02251e3b9992634059656285a"
  }, {
    "url": "exercises/104",
    "revision": "14eefacc8f085b41d801f4279f03b0dd"
  }, {
    "url": "exercises/105",
    "revision": "cd9bd25378db7994f55ce3de12936671"
  }, {
    "url": "exercises/106",
    "revision": "f922f068a81641ecfc5585a21fffc50c"
  }, {
    "url": "exercises/107",
    "revision": "ec68ad0399db2cbfcd75f84671982257"
  }, {
    "url": "exercises/108",
    "revision": "fd4616e494085877dca6b3a1f1a83326"
  }, {
    "url": "exercises/109",
    "revision": "c644785be163637a95f25d2f9cdd4e4c"
  }, {
    "url": "exercises/11",
    "revision": "75dae3c1a18078a13f9196f2ed2d0c19"
  }, {
    "url": "exercises/110",
    "revision": "8b006327f659dfa8455fa8fa39f59d3d"
  }, {
    "url": "exercises/111",
    "revision": "1dbdb9d25fd9eba04864eb55e9a5c60f"
  }, {
    "url": "exercises/112",
    "revision": "c4f43709895c22efdd72cd9ed5ab2dc2"
  }, {
    "url": "exercises/113",
    "revision": "77c778e41cf07d31eba2bee5816c2c81"
  }, {
    "url": "exercises/114",
    "revision": "bad55b572b0f3b3f94f6969493385ada"
  }, {
    "url": "exercises/115",
    "revision": "81ceea20a01ddedcca15faa7600768ed"
  }, {
    "url": "exercises/116",
    "revision": "bddb39960d56349493745ef7213badba"
  }, {
    "url": "exercises/117",
    "revision": "aefc661978e080f58a39faefee4e7422"
  }, {
    "url": "exercises/118",
    "revision": "aca8c66eaa2d02959f8d367a1ad65fa3"
  }, {
    "url": "exercises/119",
    "revision": "9f0c2406f9fcf00b871d12c0f2ceb2b9"
  }, {
    "url": "exercises/12",
    "revision": "9370fd2fc67227c435ece309c8f242fc"
  }, {
    "url": "exercises/120",
    "revision": "d477db1b1bdcb2167dbcfdceb938d5bc"
  }, {
    "url": "exercises/121",
    "revision": "cd3a68a6c4f1625570884436bc17a649"
  }, {
    "url": "exercises/122",
    "revision": "b1bde4bafd123ba7a8577b883b08a934"
  }, {
    "url": "exercises/123",
    "revision": "596af492a44ce0c81782180416ccfe11"
  }, {
    "url": "exercises/124",
    "revision": "1a916edd1fd484c33c97cced5ede27e4"
  }, {
    "url": "exercises/125",
    "revision": "a0c97d5f4478f09481a4ff8ec2ff7055"
  }, {
    "url": "exercises/13",
    "revision": "466506b7727a4f31e475e4b7e2433bef"
  }, {
    "url": "exercises/14",
    "revision": "a346ef870a9f0e388c1fddebc0680898"
  }, {
    "url": "exercises/15",
    "revision": "cd1a08aaf0fa4aeea121ba0b0ef04ccb"
  }, {
    "url": "exercises/16",
    "revision": "0c0e7915dd9314de5fa4e5f91e10a71d"
  }, {
    "url": "exercises/17",
    "revision": "cd36f3b4a69b1713465e1e1a410e4712"
  }, {
    "url": "exercises/18",
    "revision": "a00d16ba85505b7f3411e613803aad31"
  }, {
    "url": "exercises/19",
    "revision": "1978e21e53bbd3b8c83248aff67dee07"
  }, {
    "url": "exercises/2",
    "revision": "8580d04395783e7f09da3050387c773c"
  }, {
    "url": "exercises/20",
    "revision": "9047c2c9ad5137fd10f09b35cd3d7c09"
  }, {
    "url": "exercises/21",
    "revision": "daa76a35d26850d6c90da0a41d80b313"
  }, {
    "url": "exercises/22",
    "revision": "f2188492b4af7fe7208fb14efb088415"
  }, {
    "url": "exercises/23",
    "revision": "7959ef06591c6240169aec8ca52362bb"
  }, {
    "url": "exercises/24",
    "revision": "e15847cf30932848cb151b6758e7445f"
  }, {
    "url": "exercises/25",
    "revision": "e115b61828243a961bedd91e9f8773b4"
  }, {
    "url": "exercises/26",
    "revision": "d5b258528998b039fd71f0c849941418"
  }, {
    "url": "exercises/27",
    "revision": "be700ec1b7c2efcec333dfbd7454ce50"
  }, {
    "url": "exercises/28",
    "revision": "e0f8b6f03d002aa974ab7a0471ba0929"
  }, {
    "url": "exercises/29",
    "revision": "57e3b1d802b01abb6e74373549bf9406"
  }, {
    "url": "exercises/3",
    "revision": "4cefc93b56e4c5fe8677afccd6c92553"
  }, {
    "url": "exercises/30",
    "revision": "f17f0e06bbc98997bd9fefd379025611"
  }, {
    "url": "exercises/31",
    "revision": "0ddf6142b1b0a307af874912702ef20f"
  }, {
    "url": "exercises/32",
    "revision": "fb32285879f4ed045203358c1f50804d"
  }, {
    "url": "exercises/33",
    "revision": "d782cbe39ab9df0752a07c2d02344838"
  }, {
    "url": "exercises/34",
    "revision": "97928f78b1023456aaf81d60aa3cf6a3"
  }, {
    "url": "exercises/35",
    "revision": "64bc822fe438865f40086beb02d19dd6"
  }, {
    "url": "exercises/36",
    "revision": "20d518b56351b84ff36c1b8cebb3216a"
  }, {
    "url": "exercises/37",
    "revision": "763c602cb7ac316ab2d46cb986b41ba0"
  }, {
    "url": "exercises/38",
    "revision": "71cc901311d27223f640e450886dcf2c"
  }, {
    "url": "exercises/39",
    "revision": "6190a09e307436af6b2fd2ba70ee4f59"
  }, {
    "url": "exercises/4",
    "revision": "c79085ec37d0b2151ab6f909523a67de"
  }, {
    "url": "exercises/40",
    "revision": "1fa48c64617b258cc7280073551c3275"
  }, {
    "url": "exercises/41",
    "revision": "d6e2a43ecd0cd08a84e7e40dcc03b929"
  }, {
    "url": "exercises/42",
    "revision": "8d740841ff7a1b585a2ef6b7a16f62ff"
  }, {
    "url": "exercises/43",
    "revision": "ef151f8d6b8b13174a6c8231386c899d"
  }, {
    "url": "exercises/44",
    "revision": "7ff9cfc133d70e52d03bf58f958dfcb1"
  }, {
    "url": "exercises/45",
    "revision": "9fd74f72e43490f52b164766eb51a5c5"
  }, {
    "url": "exercises/46",
    "revision": "ac41f0d6c9fe268a086c83b204dd6d8f"
  }, {
    "url": "exercises/47",
    "revision": "8ccb4692bb68a0f1e7801e48b5556fa3"
  }, {
    "url": "exercises/48",
    "revision": "e81e6b309b676858573eb04b2d61d5c1"
  }, {
    "url": "exercises/49",
    "revision": "aff27320a9154975121899e4ae3c7f73"
  }, {
    "url": "exercises/5",
    "revision": "a03febc15e242881f39bb3c8a70b7e86"
  }, {
    "url": "exercises/50",
    "revision": "3d7fe5a36a119cbe2afc5fe6d7cd0253"
  }, {
    "url": "exercises/51",
    "revision": "0c146ab243cf9b8bcf32a212f7ea2c70"
  }, {
    "url": "exercises/52",
    "revision": "15f37100b3ea150ea9a6f90df8ada629"
  }, {
    "url": "exercises/53",
    "revision": "81ac44a8843461c209f504bfcdf6b1ae"
  }, {
    "url": "exercises/54",
    "revision": "591cd846001e23145f3f1246e81c04ae"
  }, {
    "url": "exercises/55",
    "revision": "84785c675c2cc836fbd3a4a4060bf738"
  }, {
    "url": "exercises/56",
    "revision": "14b293c15c8edfddc10dcac552f75ac1"
  }, {
    "url": "exercises/57",
    "revision": "572ab7a36d4f5914c30281b6f7b246ed"
  }, {
    "url": "exercises/58",
    "revision": "9b0c7a04322ed08034904bae5c432842"
  }, {
    "url": "exercises/59",
    "revision": "10194c95d6bc15c405f0cc95e3f66d12"
  }, {
    "url": "exercises/6",
    "revision": "86f3442ca02154b9489cc370ef39706e"
  }, {
    "url": "exercises/60",
    "revision": "8dcefe8a781d4cad031a29dd7e40d37b"
  }, {
    "url": "exercises/61",
    "revision": "f2afb289f64c591f18c10c614e0e327f"
  }, {
    "url": "exercises/62",
    "revision": "2161ef98159841507bd996815ae36148"
  }, {
    "url": "exercises/63",
    "revision": "ef9b2379b3fdc6b5b82e1bf648ab5f4b"
  }, {
    "url": "exercises/64",
    "revision": "f72cde5aa1470bb522eb0f3b4478c510"
  }, {
    "url": "exercises/65",
    "revision": "64173ba87383a4b075f4c088b8e843c4"
  }, {
    "url": "exercises/66",
    "revision": "73332948926b737aa12cbd201ad751ee"
  }, {
    "url": "exercises/67",
    "revision": "dcbe9799d7bffdead5fda55c30d3784b"
  }, {
    "url": "exercises/68",
    "revision": "d71040fb0f02ad40da7b9d6f9777cc1e"
  }, {
    "url": "exercises/69",
    "revision": "cdb4add180e575c4640295c796c8c206"
  }, {
    "url": "exercises/7",
    "revision": "e46e1bd43d77fa74d47ba2e980c25372"
  }, {
    "url": "exercises/70",
    "revision": "e4d832ad2e550a4303f2fc55a30d5a25"
  }, {
    "url": "exercises/71",
    "revision": "182921be8a5004645ae10cbc5016db1d"
  }, {
    "url": "exercises/72",
    "revision": "7d65273e276a574a6f1ac59efc7c79fe"
  }, {
    "url": "exercises/73",
    "revision": "6f27c5160431d3bc7646412339379de6"
  }, {
    "url": "exercises/74",
    "revision": "e8bd049b54b77e839ae6dc441a4a0204"
  }, {
    "url": "exercises/75",
    "revision": "23be6e35830dd6b432e1772dfcad0c64"
  }, {
    "url": "exercises/76",
    "revision": "62e221a32c35289ced2bed1486b68f67"
  }, {
    "url": "exercises/77",
    "revision": "92a07b4bb2d967b1c03e825113ab4225"
  }, {
    "url": "exercises/78",
    "revision": "ed62617e08bc9dca5afb5375cb3a233a"
  }, {
    "url": "exercises/79",
    "revision": "a585a4fade23f7cb4aa86f11ffe48d69"
  }, {
    "url": "exercises/8",
    "revision": "de7961a48343d27e7cd181049bb6d179"
  }, {
    "url": "exercises/80",
    "revision": "cf8f95ae2f505d6e70c10ba9be6e94c9"
  }, {
    "url": "exercises/81",
    "revision": "b61f204e148e371da882624f58c6cd31"
  }, {
    "url": "exercises/82",
    "revision": "5cc23cda840e2774fec6ecd3fa761307"
  }, {
    "url": "exercises/83",
    "revision": "d11e83bdb4863fba56625d5da3873bb9"
  }, {
    "url": "exercises/84",
    "revision": "b4d1918a92937c01cb7436360f935e95"
  }, {
    "url": "exercises/85",
    "revision": "9836c3f4f0e014d979e8451e7534adc8"
  }, {
    "url": "exercises/86",
    "revision": "363b4abfe3f313ae50ae09b3c5c22e0a"
  }, {
    "url": "exercises/87",
    "revision": "ae78ab92103fced9087151f9e4681727"
  }, {
    "url": "exercises/88",
    "revision": "ebd52aee567be0b7e0d5a9c5747036c3"
  }, {
    "url": "exercises/89",
    "revision": "b5c744814bf071ea4ebbe5a0b65b8709"
  }, {
    "url": "exercises/9",
    "revision": "d9f38ce771b5a760996d6cdd70681a3b"
  }, {
    "url": "exercises/90",
    "revision": "4202aa9f1552d27ba38bcfbeb7bd2fd5"
  }, {
    "url": "exercises/91",
    "revision": "b44e855866bf0b7f27119ef00e2ed57c"
  }, {
    "url": "exercises/92",
    "revision": "f2626abd6b111d1b2e23af108526d16f"
  }, {
    "url": "exercises/93",
    "revision": "a41ed2751c4b7bed7830c8fb94a35e2d"
  }, {
    "url": "exercises/94",
    "revision": "70965a98647932b7da835f49c974773c"
  }, {
    "url": "exercises/95",
    "revision": "89a07c3176ae24a0a6df8c43d8380511"
  }, {
    "url": "exercises/96",
    "revision": "09b7e6016ab18ab4dcb0d8bb497aaa7d"
  }, {
    "url": "exercises/97",
    "revision": "81557ceba0a8fbf93a7a4228935a4790"
  }, {
    "url": "exercises/98",
    "revision": "9bfaaf6825404200157adb19345f5cb2"
  }, {
    "url": "exercises/99",
    "revision": "3d3fd5e37857d6c263db925d3b694584"
  }, {
    "url": "/sveltekit-gh-pages/",
    "revision": "37d1a338518011a302ea4739c799fe8b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "e77c97c81dd9d636eb8557a2934d4231"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/sveltekit-gh-pages/")));

}));
