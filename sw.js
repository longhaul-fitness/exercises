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
    "url": "_app/immutable/chunks/paths.be3dbc7d.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.b2dc85db.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.c85452c6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.db0e1797.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.71f33c4b.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.62d6392b.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.48909f9e.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.94525eb9.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.726999e7.js",
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
    "revision": "4f9b881ad98157a25d2054d97cddaa84"
  }, {
    "url": "exercises/10",
    "revision": "343e1f27fd5228f210341abc29a51fab"
  }, {
    "url": "exercises/100",
    "revision": "823b1964ea434c9bc467d8f3fd7ed1b7"
  }, {
    "url": "exercises/101",
    "revision": "f9f92dbdcbb45833afec98793cfaf68b"
  }, {
    "url": "exercises/102",
    "revision": "28c7c96ba1cfea24bfe5c23d0d2c48e7"
  }, {
    "url": "exercises/103",
    "revision": "7c724be0769309757e422c1ef568a285"
  }, {
    "url": "exercises/104",
    "revision": "d6a0a1c97b7e97f5f1e063a4b671cd87"
  }, {
    "url": "exercises/105",
    "revision": "22aa1aef3e49815aa69983161b88fbe9"
  }, {
    "url": "exercises/106",
    "revision": "3afe839d50439f7f2c5dc2f1df8d480e"
  }, {
    "url": "exercises/107",
    "revision": "838ac3c6fd1c084f5a7adb2493461d9e"
  }, {
    "url": "exercises/108",
    "revision": "7197a5b4a0e1e84db93d96366fa5002b"
  }, {
    "url": "exercises/109",
    "revision": "f54aebe0c11b3c35d2f86c85a80a99ef"
  }, {
    "url": "exercises/11",
    "revision": "16ec17adafb800a067ed54c015273a8d"
  }, {
    "url": "exercises/110",
    "revision": "5fa1903d4903c8a64a37618215a04bfc"
  }, {
    "url": "exercises/111",
    "revision": "a21fa74c29cd3f89846ee2d36357f1b1"
  }, {
    "url": "exercises/112",
    "revision": "d218023472b3020a0ae381945aba6cbb"
  }, {
    "url": "exercises/113",
    "revision": "5eef7d44f45c0a89e0e7a0887ce6aa6e"
  }, {
    "url": "exercises/114",
    "revision": "48dcb487a5bed915f68a22d1e488b03f"
  }, {
    "url": "exercises/115",
    "revision": "5e662522a5bab56f90223d7785ccc47b"
  }, {
    "url": "exercises/116",
    "revision": "114f6a7e1a11dafc8de43311bf1c272e"
  }, {
    "url": "exercises/117",
    "revision": "833b6ea5657b0c2853459780ad606d56"
  }, {
    "url": "exercises/118",
    "revision": "2562baa81b2306b9c66665b38201b944"
  }, {
    "url": "exercises/119",
    "revision": "96252d171b66138b00c2204b08e54a39"
  }, {
    "url": "exercises/12",
    "revision": "9289b4a1c41bbaa34bfcfb4f14e833b4"
  }, {
    "url": "exercises/120",
    "revision": "dfeecfec289ac337a6a194ca3d2978ee"
  }, {
    "url": "exercises/121",
    "revision": "7495a04dbb6dec64a016f7b491ca3e24"
  }, {
    "url": "exercises/122",
    "revision": "136d51853042cb735035b8a65da17c53"
  }, {
    "url": "exercises/123",
    "revision": "054adc3433c5d51aa31f975b9fa9bba4"
  }, {
    "url": "exercises/124",
    "revision": "9965ac39d6bc9e09de39470c80ce6d23"
  }, {
    "url": "exercises/125",
    "revision": "f398c3bb05fe8ddb4ebf8f72bd11bf95"
  }, {
    "url": "exercises/13",
    "revision": "e8ee447f6af2daef181886723703e448"
  }, {
    "url": "exercises/14",
    "revision": "76bdfd872effb14f51f8ca812e15f8a7"
  }, {
    "url": "exercises/15",
    "revision": "dc8a3c4a60ae034ac9daa0ad71de458f"
  }, {
    "url": "exercises/16",
    "revision": "a6dc6f845482fbffb2e1ac1bc9eb5a94"
  }, {
    "url": "exercises/17",
    "revision": "dd82cb316cc94a5aa67b9abaa0152711"
  }, {
    "url": "exercises/18",
    "revision": "790953b335bc39556e6fad1bc05f7458"
  }, {
    "url": "exercises/19",
    "revision": "0983d20d0196e2e21ab15ae71da5b0bc"
  }, {
    "url": "exercises/2",
    "revision": "1459b95f09ea4ccd19067c27cbb9ef14"
  }, {
    "url": "exercises/20",
    "revision": "557ebb7683f4f96e3f66fb393b5df18a"
  }, {
    "url": "exercises/21",
    "revision": "69006d1f02074e77bd6f2d3bbf777477"
  }, {
    "url": "exercises/22",
    "revision": "77685b7aa28cdfe90a62936aeee98ec2"
  }, {
    "url": "exercises/23",
    "revision": "e34b408ab738a2e738d0a83a804874b8"
  }, {
    "url": "exercises/24",
    "revision": "6bd79004e427110ee3bc25d79d8fe79d"
  }, {
    "url": "exercises/25",
    "revision": "3157088660849e077ee6ac6e5749cc87"
  }, {
    "url": "exercises/26",
    "revision": "5d26d8150f0a36c4ce99c67e33863c8c"
  }, {
    "url": "exercises/27",
    "revision": "3106f196194e6491390c29b04f367798"
  }, {
    "url": "exercises/28",
    "revision": "2521ffbc4f01ad663dabcdd32a000732"
  }, {
    "url": "exercises/29",
    "revision": "17b5cee8c0674337555001c4c7a77dab"
  }, {
    "url": "exercises/3",
    "revision": "800927aab754918fb1a0f77d76baaf1c"
  }, {
    "url": "exercises/30",
    "revision": "5aa0a6c4dfb108c506b7adb8a61c2e68"
  }, {
    "url": "exercises/31",
    "revision": "c20327b4809a932b8ae2123990dc15cd"
  }, {
    "url": "exercises/32",
    "revision": "286e83a8e398b80bdbcd3f7c8b4829d4"
  }, {
    "url": "exercises/33",
    "revision": "af3f98a85c60b7379a9b2127d9e1ff21"
  }, {
    "url": "exercises/34",
    "revision": "5a82edf8215180c376442fbfc2a39565"
  }, {
    "url": "exercises/35",
    "revision": "3a3927f5726223c65335b9886726db55"
  }, {
    "url": "exercises/36",
    "revision": "d333438a73652da8740fefa5dadc21a2"
  }, {
    "url": "exercises/37",
    "revision": "b33a73da2cabbd0b05bfe402a3f96fec"
  }, {
    "url": "exercises/38",
    "revision": "4ea26df2a5d044ee40dcd47b16c42794"
  }, {
    "url": "exercises/39",
    "revision": "8dc9e2592982b74153924470a5104cbf"
  }, {
    "url": "exercises/4",
    "revision": "87ad13e03434f5201da9d779c0e47139"
  }, {
    "url": "exercises/40",
    "revision": "5a4afe92411de27325c77d84f863c8e5"
  }, {
    "url": "exercises/41",
    "revision": "c4b5ffadbb5f1e8100e84dd1d39d1afe"
  }, {
    "url": "exercises/42",
    "revision": "34d978e02ddf589b4fdcac7bb87ce79c"
  }, {
    "url": "exercises/43",
    "revision": "8d6416cb6ef26a80616a4219f73d6f4a"
  }, {
    "url": "exercises/44",
    "revision": "99d1983ea1a9c96c78d54186dffb194a"
  }, {
    "url": "exercises/45",
    "revision": "473a4d9cbf0e69439c5d222b932b7d2e"
  }, {
    "url": "exercises/46",
    "revision": "ebda1efd0cc99f376948c20d9b4bc769"
  }, {
    "url": "exercises/47",
    "revision": "83597b403bbc49b2f0be7ea6af2e54e7"
  }, {
    "url": "exercises/48",
    "revision": "d4d18e84e5e96fb90928e0c2b0c50057"
  }, {
    "url": "exercises/49",
    "revision": "12f4ea7bd3d2ea24752613b149c5cdb3"
  }, {
    "url": "exercises/5",
    "revision": "cc379ef9860d63719d06f6823f26083b"
  }, {
    "url": "exercises/50",
    "revision": "4293ebfd4645705d0f4beefff9936e96"
  }, {
    "url": "exercises/51",
    "revision": "b5a6d352a53ac232982871e48f2f739d"
  }, {
    "url": "exercises/52",
    "revision": "6946308a632fbc66190ce395e3fb8797"
  }, {
    "url": "exercises/53",
    "revision": "b6735f838a18e9b5acbbfb1e18811d0b"
  }, {
    "url": "exercises/54",
    "revision": "a6dd71011e0fd45ea90725fe8d61a645"
  }, {
    "url": "exercises/55",
    "revision": "c8d69f2ad6f14c5f9125c47355f5e6d7"
  }, {
    "url": "exercises/56",
    "revision": "394d0cc18fdc0b377f4038e1340dd7eb"
  }, {
    "url": "exercises/57",
    "revision": "fd2320b917a6b9c2fab56445cd63f4b5"
  }, {
    "url": "exercises/58",
    "revision": "ecc077f328fcbbe7b169359800cceeba"
  }, {
    "url": "exercises/59",
    "revision": "a7f4e98e76553f23a399ae1714464092"
  }, {
    "url": "exercises/6",
    "revision": "533975b783e3fd585117828e747c52e5"
  }, {
    "url": "exercises/60",
    "revision": "1a39d07049d8169eb862aba7d0939b23"
  }, {
    "url": "exercises/61",
    "revision": "c998b2cb923c32e453b49e3511d4c2be"
  }, {
    "url": "exercises/62",
    "revision": "b78569ec4c932894e81fdd2cba5fcbd3"
  }, {
    "url": "exercises/63",
    "revision": "2c06047a007c8635cc0cb6d4e085f374"
  }, {
    "url": "exercises/64",
    "revision": "783b21cd73d3d5f933752e30fd70c66f"
  }, {
    "url": "exercises/65",
    "revision": "f54e13f3c7f3e9638f9e377011e6e0ec"
  }, {
    "url": "exercises/66",
    "revision": "9e6c70886abe7fc2ac3168fa892d8452"
  }, {
    "url": "exercises/67",
    "revision": "b9c1308a9e5ee9a6db15129b38f1b3de"
  }, {
    "url": "exercises/68",
    "revision": "4ea360dceb3b4c44a081136e8104aa3d"
  }, {
    "url": "exercises/69",
    "revision": "dd3ef8cb3bb4f355b0075b1cbc221d7a"
  }, {
    "url": "exercises/7",
    "revision": "79ec35ab331b40effed55496c81fee65"
  }, {
    "url": "exercises/70",
    "revision": "1e313de2baefb2639f616e1bf883013f"
  }, {
    "url": "exercises/71",
    "revision": "12589eb4c5982c3dab6b98a014744406"
  }, {
    "url": "exercises/72",
    "revision": "8726269cb19b2f5a51a70630417064b5"
  }, {
    "url": "exercises/73",
    "revision": "c3e8e23a93c79e11fe15e09502725562"
  }, {
    "url": "exercises/74",
    "revision": "c328ed2c0fa681e65fbbb6bece6f49f1"
  }, {
    "url": "exercises/75",
    "revision": "c15f5e397e01ee4114925ec5b81e5d6f"
  }, {
    "url": "exercises/76",
    "revision": "71151c853330421d6fc1df67ca79f4b8"
  }, {
    "url": "exercises/77",
    "revision": "b07523be07a7e726922f3eda3fe352f4"
  }, {
    "url": "exercises/78",
    "revision": "de7d45ef3fce4e306aadce0d65c01f97"
  }, {
    "url": "exercises/79",
    "revision": "635678850f61265bce8c1aeded0041c5"
  }, {
    "url": "exercises/8",
    "revision": "34efce58c6b231a28c02a4ee87a0a5f9"
  }, {
    "url": "exercises/80",
    "revision": "a8f0416aafa07d35714430b627cee7ac"
  }, {
    "url": "exercises/81",
    "revision": "5adbf12f4a8bf485c68c27b1b59f33ce"
  }, {
    "url": "exercises/82",
    "revision": "9d586504c59f27118fdd3e15c5a4c5dd"
  }, {
    "url": "exercises/83",
    "revision": "6748863fdcf79ba368e552f10b2593d2"
  }, {
    "url": "exercises/84",
    "revision": "10b8543548947e6b45d69b77235ad6d4"
  }, {
    "url": "exercises/85",
    "revision": "77abd4f254220703d79303e08a680015"
  }, {
    "url": "exercises/86",
    "revision": "40924aaa44cd92e2f7751153ea87cad2"
  }, {
    "url": "exercises/87",
    "revision": "f5c0d2bb2623be2186cb2090d658ec21"
  }, {
    "url": "exercises/88",
    "revision": "ba806a47edc605e32c2acae10fd616c9"
  }, {
    "url": "exercises/89",
    "revision": "731157e736583fd7d93b79e6f3ae91c4"
  }, {
    "url": "exercises/9",
    "revision": "189a181696b947358ce3aa35739761b7"
  }, {
    "url": "exercises/90",
    "revision": "129c18b2c7f35860c687f429b6a7508d"
  }, {
    "url": "exercises/91",
    "revision": "47a6d7fc50dda97b233df37a9ed78f43"
  }, {
    "url": "exercises/92",
    "revision": "7f1d15ef42cb8189177b5da749c393ff"
  }, {
    "url": "exercises/93",
    "revision": "f8e431b62a0625312b979b3481f10965"
  }, {
    "url": "exercises/94",
    "revision": "a1d0c38760b517b849a15712417fd6b8"
  }, {
    "url": "exercises/95",
    "revision": "8c3cb7695ed09548e1f5dfbc16b75ceb"
  }, {
    "url": "exercises/96",
    "revision": "66404c8010a9abfa7528cedddab1846e"
  }, {
    "url": "exercises/97",
    "revision": "779663a9bbca9ccd353ccb2552970919"
  }, {
    "url": "exercises/98",
    "revision": "c09d0124ca345d563dbfc06b673e4d27"
  }, {
    "url": "exercises/99",
    "revision": "85032c726ce02fcbaee3ab0ecaee0a80"
  }, {
    "url": "/exercises/",
    "revision": "02b15ed3e97038a212f0c8b9963062bc"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
