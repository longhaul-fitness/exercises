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
    "url": "_app/immutable/chunks/paths.ec9ecd70.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.51eca629.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.75555d3f.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.ac7ab21f.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.f3a5bee4.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.b16efeb6.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.6507676f.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.3d04f61f.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.246cca40.js",
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
    "revision": "c11cacc94f3bbabdf27291ed99110d0c"
  }, {
    "url": "exercises/10",
    "revision": "d1fd791668476d4544b7cd76692cc5c2"
  }, {
    "url": "exercises/100",
    "revision": "305474117a9ba02f585949718037baaa"
  }, {
    "url": "exercises/101",
    "revision": "51b81ac5280fee4cfbd787e1f8924afa"
  }, {
    "url": "exercises/102",
    "revision": "3a59aa9684f22afd5e38a1ba4aafb761"
  }, {
    "url": "exercises/103",
    "revision": "dca87a4f70842747314d78be50f21034"
  }, {
    "url": "exercises/104",
    "revision": "255faa756ba82aa6ad5e057471c8ed45"
  }, {
    "url": "exercises/105",
    "revision": "1d93224097cdb9786d8c4bcd684ca753"
  }, {
    "url": "exercises/106",
    "revision": "df7eda7f4f334c298431284ac85b7b10"
  }, {
    "url": "exercises/107",
    "revision": "1606200b26fa922749f4e078c14145ae"
  }, {
    "url": "exercises/108",
    "revision": "7826783d354df61d7237246f8e0e7cee"
  }, {
    "url": "exercises/109",
    "revision": "a3ab97ae025e5932b15d201c221e55b9"
  }, {
    "url": "exercises/11",
    "revision": "8b09cb468cb9982c418cc00a791b03fb"
  }, {
    "url": "exercises/110",
    "revision": "72f0eb5f1a2b11fe8a1e807382aa637b"
  }, {
    "url": "exercises/111",
    "revision": "69e57d59a49940f21afe8f140879437a"
  }, {
    "url": "exercises/112",
    "revision": "5da9c75811d4ab2f7d480b8373e7e569"
  }, {
    "url": "exercises/113",
    "revision": "867293c5e0faa18a775e475b71d37984"
  }, {
    "url": "exercises/114",
    "revision": "14a401dc56a19f62bbd0b13732ab9658"
  }, {
    "url": "exercises/115",
    "revision": "8e257fc2e757a82efb4f6f0abc4685bf"
  }, {
    "url": "exercises/116",
    "revision": "f7f8fd6abb85faa3add256b4f4f1b19a"
  }, {
    "url": "exercises/117",
    "revision": "292e292e1cd3094b16cb76ef3b08d3fa"
  }, {
    "url": "exercises/118",
    "revision": "6e9a850d8542ca347edf02ef0c47a929"
  }, {
    "url": "exercises/119",
    "revision": "0944102c2e1cf71022fac2437682209f"
  }, {
    "url": "exercises/12",
    "revision": "00a0d302a6600c643f981a729da34035"
  }, {
    "url": "exercises/120",
    "revision": "655ceeb57ff701b734afba6c9092fa8d"
  }, {
    "url": "exercises/121",
    "revision": "66f61faecf420ce72564625665fd4689"
  }, {
    "url": "exercises/122",
    "revision": "3083e2b6c63dcbb19bc2f305f41a68d9"
  }, {
    "url": "exercises/123",
    "revision": "ecb2be4a9be2c337d4e83671ef5912e1"
  }, {
    "url": "exercises/124",
    "revision": "959acc7d625098af7f799d7659fdaec6"
  }, {
    "url": "exercises/125",
    "revision": "f5be88974860fd06b40036ec0bcf30d0"
  }, {
    "url": "exercises/13",
    "revision": "bf992cf1ec1cbe46fdff14b3d555c5c9"
  }, {
    "url": "exercises/14",
    "revision": "acd65fe4d087cc301ec06450f6070345"
  }, {
    "url": "exercises/15",
    "revision": "dd6d8e1c6e846dbf72d85653a8f7eb18"
  }, {
    "url": "exercises/16",
    "revision": "6dd90174dda2e335fa6f065c529c5f34"
  }, {
    "url": "exercises/17",
    "revision": "45de2f5184e749ca68c3cedfa5378a8d"
  }, {
    "url": "exercises/18",
    "revision": "af78117db3721d2f0b85e9e6ab5fb541"
  }, {
    "url": "exercises/19",
    "revision": "867529bd6a16574d64dcbe8a8fb3d247"
  }, {
    "url": "exercises/2",
    "revision": "d732dae4080851cb72f8ae7ee28770f4"
  }, {
    "url": "exercises/20",
    "revision": "513dcfcbdb5f3e8b07ae2a750a672589"
  }, {
    "url": "exercises/21",
    "revision": "6816310f9dde4c341c23e837317d8798"
  }, {
    "url": "exercises/22",
    "revision": "e7e783e0a3b608a7afa1bea5e2191e4d"
  }, {
    "url": "exercises/23",
    "revision": "d568cbfd126f80ce40d8d63790c8ed9e"
  }, {
    "url": "exercises/24",
    "revision": "3341eeb009dc305279f595655305e52e"
  }, {
    "url": "exercises/25",
    "revision": "7ff1b803d270132e75462ff84121fd68"
  }, {
    "url": "exercises/26",
    "revision": "05d712aaf257dc1ec046f0dbe682adf1"
  }, {
    "url": "exercises/27",
    "revision": "8a4ffa468a86b0d99cda35676704702b"
  }, {
    "url": "exercises/28",
    "revision": "bcf6e42116a620fdc003b9ea8810b127"
  }, {
    "url": "exercises/29",
    "revision": "bc7f8757c1a0edf172790e6a8f803bfe"
  }, {
    "url": "exercises/3",
    "revision": "a4e7cf1edab03a160e388c8edb75dd29"
  }, {
    "url": "exercises/30",
    "revision": "e68c52a7a06b5113faefd6a027d33cb6"
  }, {
    "url": "exercises/31",
    "revision": "495647baad13a101ae58c38ea2edd758"
  }, {
    "url": "exercises/32",
    "revision": "1c6daee3bbf40b31a0693a18c37150c2"
  }, {
    "url": "exercises/33",
    "revision": "6a3a6d90ba25e7e6cc001cfb017e5287"
  }, {
    "url": "exercises/34",
    "revision": "8f19c5603c5418bbc1e2640bffb28fa8"
  }, {
    "url": "exercises/35",
    "revision": "05879901e677578473fe818b00a459e0"
  }, {
    "url": "exercises/36",
    "revision": "6f791e6a12f4d0ea38d317f70910c36a"
  }, {
    "url": "exercises/37",
    "revision": "b8cea416cd3a8dc318a34317e1bf1600"
  }, {
    "url": "exercises/38",
    "revision": "a8ce05cca09ef5775f226bb85d10b066"
  }, {
    "url": "exercises/39",
    "revision": "a8494751c9101c988ac3dd35f26604b8"
  }, {
    "url": "exercises/4",
    "revision": "e10bc93da8cfe51382f2cbbe08ce6d58"
  }, {
    "url": "exercises/40",
    "revision": "4422bcce888e702370c25bb911c60ba4"
  }, {
    "url": "exercises/41",
    "revision": "64c726ccba807efe6432cb3074a7ce05"
  }, {
    "url": "exercises/42",
    "revision": "8abad14ba40677cd4b7d5aa3eed679ce"
  }, {
    "url": "exercises/43",
    "revision": "430744cc09ba6b97019750b1b1559953"
  }, {
    "url": "exercises/44",
    "revision": "1ba727f269f70138558f43178cca1368"
  }, {
    "url": "exercises/45",
    "revision": "245cb577a788dd8653674ec3aa0572c1"
  }, {
    "url": "exercises/46",
    "revision": "532cacb11fb6fdd77b10477b60df7dd0"
  }, {
    "url": "exercises/47",
    "revision": "ff3b166c3ccea5de0fb67c17af98b985"
  }, {
    "url": "exercises/48",
    "revision": "5f566b0e2d9435dfb572ad53fc4e4f25"
  }, {
    "url": "exercises/49",
    "revision": "aa99209f021edcecaef2140e0aa1865b"
  }, {
    "url": "exercises/5",
    "revision": "ef6fe076272257c756e2ee96b2bc9ebf"
  }, {
    "url": "exercises/50",
    "revision": "08279f25939bde9569745fa4cedd6f00"
  }, {
    "url": "exercises/51",
    "revision": "88a3c42dc2c3cce3cdc1d0f5c574f754"
  }, {
    "url": "exercises/52",
    "revision": "32b7f71758aa2c8f5c7f98bdad4165b4"
  }, {
    "url": "exercises/53",
    "revision": "b8c26d3118bff579dc914cf0c9174d00"
  }, {
    "url": "exercises/54",
    "revision": "83c854119b1c9ee7f339c8adb6d459fd"
  }, {
    "url": "exercises/55",
    "revision": "86f327865b4a394c72b677054aca3c9f"
  }, {
    "url": "exercises/56",
    "revision": "76ea929bb4e143ece4c586dfc6c3a35b"
  }, {
    "url": "exercises/57",
    "revision": "52e12e3966914e0b2834bf764dbc55e9"
  }, {
    "url": "exercises/58",
    "revision": "0ab64dc668b11bb849bc38740b4a6b23"
  }, {
    "url": "exercises/59",
    "revision": "4e4ce7f374b3d467f601022e98a8838e"
  }, {
    "url": "exercises/6",
    "revision": "ce351830b4f042393f57403edd6c119f"
  }, {
    "url": "exercises/60",
    "revision": "6358cb8221218e2fa52c69df1fd4c6d1"
  }, {
    "url": "exercises/61",
    "revision": "83fe99bd79482a563741f4e287d48769"
  }, {
    "url": "exercises/62",
    "revision": "069aff65057021105a9b0ac4f2ced826"
  }, {
    "url": "exercises/63",
    "revision": "1d961d966fb1ae32fbd6a3a26a5ea938"
  }, {
    "url": "exercises/64",
    "revision": "d2141c05d16345110ff7c9c7ede9f86e"
  }, {
    "url": "exercises/65",
    "revision": "27198990f462474041b881ba5b55216c"
  }, {
    "url": "exercises/66",
    "revision": "1caf49dcb74f8efe4f03542c16d16553"
  }, {
    "url": "exercises/67",
    "revision": "a3771e1b905df023e784c68b504b9150"
  }, {
    "url": "exercises/68",
    "revision": "742777f825746e8162e60358a95cb263"
  }, {
    "url": "exercises/69",
    "revision": "fbb30e56896198500bb230cb9f6e1c71"
  }, {
    "url": "exercises/7",
    "revision": "41df38c107f7b89609e19374a8e3e523"
  }, {
    "url": "exercises/70",
    "revision": "8dda96980bbf25b9bbe3f1d1295a862a"
  }, {
    "url": "exercises/71",
    "revision": "b56c8a7f59085ac53a7c4f4c9a3ee9a3"
  }, {
    "url": "exercises/72",
    "revision": "85bf6a28c423759aee5fd9f8ed31950f"
  }, {
    "url": "exercises/73",
    "revision": "c46915e1a40cd54779d743b8218c0aec"
  }, {
    "url": "exercises/74",
    "revision": "e717771e3bdaa5030bbaaae8ffd27487"
  }, {
    "url": "exercises/75",
    "revision": "7ef45c2d634111241c0ff13f44dbcd57"
  }, {
    "url": "exercises/76",
    "revision": "34dae6ca8f129827675f07c16ec62aa1"
  }, {
    "url": "exercises/77",
    "revision": "fc3f1b04534f953643922015a686a519"
  }, {
    "url": "exercises/78",
    "revision": "5fc5e51824c53a2fb3e04f32420c0a1c"
  }, {
    "url": "exercises/79",
    "revision": "45fdbef1be854a53dde90b0d9926b05b"
  }, {
    "url": "exercises/8",
    "revision": "a17ae99983f39509492ceac4d7b180dc"
  }, {
    "url": "exercises/80",
    "revision": "ac407b8fc9288c9a1c5b80aae1814e91"
  }, {
    "url": "exercises/81",
    "revision": "d02af15367ecb5e7a1e5ca5f3f6a84d8"
  }, {
    "url": "exercises/82",
    "revision": "c55ab25237057fc2b86be64c49d8c922"
  }, {
    "url": "exercises/83",
    "revision": "20a39f7ffcc9c685dc5a7e56473bafe6"
  }, {
    "url": "exercises/84",
    "revision": "cb8b33c44a42015991206a7ce16d2094"
  }, {
    "url": "exercises/85",
    "revision": "c9cf1138142dbffca57621d619afe0de"
  }, {
    "url": "exercises/86",
    "revision": "6d5ac91df94b976cf991eec7df2dc06f"
  }, {
    "url": "exercises/87",
    "revision": "83be3236f6166528a3361c3409865037"
  }, {
    "url": "exercises/88",
    "revision": "83cd08e4289178a635f9d9fa77b99a5f"
  }, {
    "url": "exercises/89",
    "revision": "c9bb8d6a7051ca80a54fbee6a5a32077"
  }, {
    "url": "exercises/9",
    "revision": "10b47c056814318de0bfe7d5d7990ff0"
  }, {
    "url": "exercises/90",
    "revision": "c6dc6d06874a3327bd31ecc048e94d9c"
  }, {
    "url": "exercises/91",
    "revision": "c7aa4792b41490c1cf865c06cf7f2872"
  }, {
    "url": "exercises/92",
    "revision": "fc000e7a4a1e7a17706dbd61319a5c89"
  }, {
    "url": "exercises/93",
    "revision": "fc820a73e851a9d0ce2d9ebe2d53d478"
  }, {
    "url": "exercises/94",
    "revision": "fb61d0b9b88a77e9e35a9cda2824db77"
  }, {
    "url": "exercises/95",
    "revision": "190a470c67b5e4d18e1674378450b4a8"
  }, {
    "url": "exercises/96",
    "revision": "d47cc27cba18b65382285735448673a7"
  }, {
    "url": "exercises/97",
    "revision": "bb951fca7c6824944ac2d067a0569397"
  }, {
    "url": "exercises/98",
    "revision": "cd2413a79c004643bf0ef23399f0cbda"
  }, {
    "url": "exercises/99",
    "revision": "e4eb9d41723f7e1444a7027e0ab976dc"
  }, {
    "url": "/sveltekit-gh-pages/",
    "revision": "7ceeee7bed32fb4665e02b21665a7090"
  }, {
    "url": "manifest.webmanifest",
    "revision": "27bda78d5a1fa38e9a8f90662d1d63fc"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/sveltekit-gh-pages/")));

}));
