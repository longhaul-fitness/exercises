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
    "url": "_app/immutable/chunks/index.b11eb138.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.b4ff8814.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/paths.b487c767.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.bcf6fcd3.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.971ec06a.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.39d5ca96.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.bc8eb510.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.a3d56d46.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.a4dc6d74.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.87647009.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.5c7ed5ab.js",
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
    "revision": "cb56144cc44eb220ea805d5b9c3ec054"
  }, {
    "url": "exercises/10",
    "revision": "7551de5094e7a8e1080969b9c7931041"
  }, {
    "url": "exercises/100",
    "revision": "821ae9d43d09f48702caaf9d439e0b02"
  }, {
    "url": "exercises/101",
    "revision": "d59f1454dc844e14717001d21bac5f76"
  }, {
    "url": "exercises/102",
    "revision": "0ef0a7e4f8e8395b108381eeefe9b2a6"
  }, {
    "url": "exercises/103",
    "revision": "693273933532ec42060c441233b3d395"
  }, {
    "url": "exercises/104",
    "revision": "e4bee23665ceaf7748432df379d64eda"
  }, {
    "url": "exercises/105",
    "revision": "d13aae24b4c00c62ce35d24cf50b20e1"
  }, {
    "url": "exercises/106",
    "revision": "b9334543a9320e06c29eb7df07579446"
  }, {
    "url": "exercises/107",
    "revision": "b5cecd89b76d3a2f097b71b22f7bbf98"
  }, {
    "url": "exercises/108",
    "revision": "704d0119a4072ced4301b8fdf9e07db8"
  }, {
    "url": "exercises/109",
    "revision": "0ac6c8d0e5a91e271e031435c8c35a00"
  }, {
    "url": "exercises/11",
    "revision": "bf38fcfd42f5ff6292fbb9179b056d05"
  }, {
    "url": "exercises/110",
    "revision": "aeb183e0d94b884bbdc3d23c1c7dcfa0"
  }, {
    "url": "exercises/111",
    "revision": "6026657b3f1a82c461ce819af6a098b4"
  }, {
    "url": "exercises/112",
    "revision": "214aba021c3eeea6fb049b6a9384a912"
  }, {
    "url": "exercises/113",
    "revision": "a7067c6855cc61bcdf43b246f2040feb"
  }, {
    "url": "exercises/114",
    "revision": "0fbff3516881612dc4964c0f9adf6dca"
  }, {
    "url": "exercises/115",
    "revision": "d05a641e21e21c7fccafdbb1b69d6aba"
  }, {
    "url": "exercises/116",
    "revision": "76a8164c3dc9e2f979cc9ecad493a173"
  }, {
    "url": "exercises/117",
    "revision": "8cde629fac588b8309dacf4625f99771"
  }, {
    "url": "exercises/118",
    "revision": "c5f5921e07b52c8ab48a802ea1d09c1a"
  }, {
    "url": "exercises/119",
    "revision": "7f8be39f6cf749cc76d4990274d06deb"
  }, {
    "url": "exercises/12",
    "revision": "6aeab52501d6cb06095245c700aa9f8f"
  }, {
    "url": "exercises/120",
    "revision": "7c74bbe527e9255895b32c8d5b8da7cf"
  }, {
    "url": "exercises/121",
    "revision": "5d8b22ee45b37384692dc752d56ef52f"
  }, {
    "url": "exercises/122",
    "revision": "49c2eceed53d32745413df987714f92e"
  }, {
    "url": "exercises/123",
    "revision": "4fab20b51992c0dc3ef1fe7f2463754c"
  }, {
    "url": "exercises/124",
    "revision": "d7208538c6161a76353bc8bf50d812ef"
  }, {
    "url": "exercises/125",
    "revision": "f6f06525abb97b8aad157565fdf91d17"
  }, {
    "url": "exercises/13",
    "revision": "dd81cd04bbde3dec3f468fcc75aa9f9b"
  }, {
    "url": "exercises/14",
    "revision": "f11b7c39375bcb8c83c76844c9d0dab2"
  }, {
    "url": "exercises/15",
    "revision": "848b72c6552a6f5dd7c2d272b277be53"
  }, {
    "url": "exercises/16",
    "revision": "9d97933f77d08ddbdc741689802c4870"
  }, {
    "url": "exercises/17",
    "revision": "1062dd6a2b255df33e66f1fae70a6f47"
  }, {
    "url": "exercises/18",
    "revision": "551f5e586adf2bdedd078ffc631977d8"
  }, {
    "url": "exercises/19",
    "revision": "8fdcdcfcc7b34cde7d1d21ec6849c0f7"
  }, {
    "url": "exercises/2",
    "revision": "1b200bee4805402ced377345312a13a0"
  }, {
    "url": "exercises/20",
    "revision": "62c6691da1051b9dbabcf96e2670cb51"
  }, {
    "url": "exercises/21",
    "revision": "7b07d14bbb12eff6715f2ba23f241b50"
  }, {
    "url": "exercises/22",
    "revision": "d2398cf2b83744f8365563d74e2bc192"
  }, {
    "url": "exercises/23",
    "revision": "b67259407703bfbc0b70d891ef5dddb4"
  }, {
    "url": "exercises/24",
    "revision": "fd602b03c876b24eeb03b11bbcdcb341"
  }, {
    "url": "exercises/25",
    "revision": "5ded46088aec2741dafc39aabe690d21"
  }, {
    "url": "exercises/26",
    "revision": "739e7d69e790d3dced1202db97b85c89"
  }, {
    "url": "exercises/27",
    "revision": "33acdb615bd45cf745c0d692c292c4c0"
  }, {
    "url": "exercises/28",
    "revision": "87725436a694273f58662097ef304444"
  }, {
    "url": "exercises/29",
    "revision": "2767737a79e1775b16f6b7dde665624f"
  }, {
    "url": "exercises/3",
    "revision": "d3444a00650fe843fa08be965df54849"
  }, {
    "url": "exercises/30",
    "revision": "e51ac37fba1c87186ec43a3b3f10ac8c"
  }, {
    "url": "exercises/31",
    "revision": "9025a76a5ef5e75b84370674b4341342"
  }, {
    "url": "exercises/32",
    "revision": "4824d768797953d4e0e0b733562851f2"
  }, {
    "url": "exercises/33",
    "revision": "a30496c6aae17b2783eea8bdfd462aab"
  }, {
    "url": "exercises/34",
    "revision": "fb3fe011f18fd934b72ef23656d33dd7"
  }, {
    "url": "exercises/35",
    "revision": "368fa80d022c69f9f624a5df172c0eb3"
  }, {
    "url": "exercises/36",
    "revision": "496226632dda154c25a305f5f0ca8722"
  }, {
    "url": "exercises/37",
    "revision": "7f8731559e098e6c2337587dc3f36b49"
  }, {
    "url": "exercises/38",
    "revision": "17f072f9201791f6082b6e82d42d89b3"
  }, {
    "url": "exercises/39",
    "revision": "4af73017ca957578145e148f111f38ac"
  }, {
    "url": "exercises/4",
    "revision": "3ae2525b5e4143f220fdb3abd3151058"
  }, {
    "url": "exercises/40",
    "revision": "6c6d8d40a3743b3f94fc4fb3399a2c1b"
  }, {
    "url": "exercises/41",
    "revision": "12d061a18434a1ee6197ab7cb46ff8f3"
  }, {
    "url": "exercises/42",
    "revision": "9a6bbf51c93d6d965cef8c5a72d25f6b"
  }, {
    "url": "exercises/43",
    "revision": "a52f47988405f25a1eed68d249647c10"
  }, {
    "url": "exercises/44",
    "revision": "c63045788e7a57531ff4454a4c27e9e6"
  }, {
    "url": "exercises/45",
    "revision": "95efc0c6ee5caac6324a6c3e412156b7"
  }, {
    "url": "exercises/46",
    "revision": "4a24cebafe8d32b1eb2f809924898e91"
  }, {
    "url": "exercises/47",
    "revision": "0b4223a310408a2d06b25b7531558ac2"
  }, {
    "url": "exercises/48",
    "revision": "7d61e304011f276e3ca2f9bf7490446a"
  }, {
    "url": "exercises/49",
    "revision": "b7f472afa2735bb66304c14ca3cda201"
  }, {
    "url": "exercises/5",
    "revision": "6eb2c6823642e25edc3fe63aee50cc3d"
  }, {
    "url": "exercises/50",
    "revision": "84abff1c1b70803525d13245d1ee0684"
  }, {
    "url": "exercises/51",
    "revision": "12d819764663989f01f02b4d92136b22"
  }, {
    "url": "exercises/52",
    "revision": "b7f5d55c33a2f464d1946cde6e83db24"
  }, {
    "url": "exercises/53",
    "revision": "4a824f1c94ef99d9b405aa947411d525"
  }, {
    "url": "exercises/54",
    "revision": "5c5ad0402befa04484e98b5e5218f73d"
  }, {
    "url": "exercises/55",
    "revision": "d89b5bd0396318f6fac21214f0adb938"
  }, {
    "url": "exercises/56",
    "revision": "46718d5f68bf2fd7a05971dfb988795e"
  }, {
    "url": "exercises/57",
    "revision": "579aaecdc7e9aa03cd29ef04d63026f4"
  }, {
    "url": "exercises/58",
    "revision": "d46a6bc9275334ab0824eaedd884286a"
  }, {
    "url": "exercises/59",
    "revision": "ed931ac54b15449f7ce357933c583a79"
  }, {
    "url": "exercises/6",
    "revision": "5e008d04ab55bbc748952f58ed80bdc0"
  }, {
    "url": "exercises/60",
    "revision": "56d145f60c83e6fce1ede33eeabf1ec5"
  }, {
    "url": "exercises/61",
    "revision": "93f8bef69010993b3cb130c7f404eaaf"
  }, {
    "url": "exercises/62",
    "revision": "5945ec607f6a8214ea6bd0527a12effb"
  }, {
    "url": "exercises/63",
    "revision": "7a69450146036f31e4588d8391d28f2c"
  }, {
    "url": "exercises/64",
    "revision": "7323b6b66cd5038c58082d251cf2dbc9"
  }, {
    "url": "exercises/65",
    "revision": "7d396744dcd148cdcfab7caaa0e00cf8"
  }, {
    "url": "exercises/66",
    "revision": "c9bc010d0727e3ca09906406e1565c04"
  }, {
    "url": "exercises/67",
    "revision": "a44bccd163a8bf319b9dec264c18c7a5"
  }, {
    "url": "exercises/68",
    "revision": "98535c5d54ecd678e1dce06ed2289d89"
  }, {
    "url": "exercises/69",
    "revision": "e752cffde41919e76ed77225150b2267"
  }, {
    "url": "exercises/7",
    "revision": "67a95e5a7d1f9e90b5348917fabe4971"
  }, {
    "url": "exercises/70",
    "revision": "102dbd1a0a8da8832532e5af2dca92ed"
  }, {
    "url": "exercises/71",
    "revision": "90d80d94b503c438d61504b355d756a2"
  }, {
    "url": "exercises/72",
    "revision": "6071f522b637652cdf24b1a4c95d8848"
  }, {
    "url": "exercises/73",
    "revision": "0ae5d8d1f6e84c78ba5bd2497e656f4f"
  }, {
    "url": "exercises/74",
    "revision": "84b791d1a8164af18299744e993e0a57"
  }, {
    "url": "exercises/75",
    "revision": "697c4c2f496b3100b01b82fdc401acd1"
  }, {
    "url": "exercises/76",
    "revision": "8ebe81cfc9eaa5a973e5132f1b561ac8"
  }, {
    "url": "exercises/77",
    "revision": "c476ad43a7a1fd0b42bb73f0b36f44b0"
  }, {
    "url": "exercises/78",
    "revision": "1f0afff4e4294192c23ce7e29b39675d"
  }, {
    "url": "exercises/79",
    "revision": "b3ccb5cb4e6981aca7ec38ae77451cfa"
  }, {
    "url": "exercises/8",
    "revision": "3096f7449951ac128dbf39dbc88d6d67"
  }, {
    "url": "exercises/80",
    "revision": "268ce17de797d7483535489a305adab6"
  }, {
    "url": "exercises/81",
    "revision": "70c840df6af3dd71c054d1d60c428dcf"
  }, {
    "url": "exercises/82",
    "revision": "bc8bd367bacfad2a1402345b16f1105f"
  }, {
    "url": "exercises/83",
    "revision": "9bd67861ce844119bd7db4fbbf6456b5"
  }, {
    "url": "exercises/84",
    "revision": "7b756779c672b40225610d1d7d2dee81"
  }, {
    "url": "exercises/85",
    "revision": "a75c69ce90255af3f3635edf86d05a6a"
  }, {
    "url": "exercises/86",
    "revision": "2f10174d703ab8cd96d376d799e5e7d9"
  }, {
    "url": "exercises/87",
    "revision": "0341b83e53d900db4aa3e60faaa0e03a"
  }, {
    "url": "exercises/88",
    "revision": "fca000c353dc5226d992b1538202dcb9"
  }, {
    "url": "exercises/89",
    "revision": "16c584e94482408394c9581724e0e07a"
  }, {
    "url": "exercises/9",
    "revision": "2ce13b12157fadcc6a4fcf11d6d4ae3a"
  }, {
    "url": "exercises/90",
    "revision": "3d1dc19149bef60796c9d845bf122c9a"
  }, {
    "url": "exercises/91",
    "revision": "7a93c360d834c147b5b2b1d53243278e"
  }, {
    "url": "exercises/92",
    "revision": "16247a21474ba1ba23068e21836b49a2"
  }, {
    "url": "exercises/93",
    "revision": "43bebc07f1f7e34c8815191ef31d409e"
  }, {
    "url": "exercises/94",
    "revision": "77c041cff8b1941703e0c3340614d658"
  }, {
    "url": "exercises/95",
    "revision": "eedacb427127188446b28926bc0ab97a"
  }, {
    "url": "exercises/96",
    "revision": "41c4a90e5f11e5ca17314be8a9ec00a5"
  }, {
    "url": "exercises/97",
    "revision": "24d3e82058c6ef105a263ec3da32dcad"
  }, {
    "url": "exercises/98",
    "revision": "cca1189ecb8bf08da96d086371c02a7a"
  }, {
    "url": "exercises/99",
    "revision": "8b859fd64c08707ab54129400a248cde"
  }, {
    "url": "/exercises/",
    "revision": "4d770d30e14d8548a6244a26c53e96fc"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
