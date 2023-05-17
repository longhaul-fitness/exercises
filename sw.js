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
    "url": "_app/immutable/chunks/paths.773b25bd.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.b2dc85db.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.61bfb674.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.3980fc0e.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.df25ecfc.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.e53bf7e6.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.62d6392b.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.d067e512.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.37e0a493.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.e2ac0b1b.js",
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
    "revision": "5580d5aed41fd0249f9689cca504426d"
  }, {
    "url": "exercises/10",
    "revision": "27208f5ae80634f62ed47ea5c742e5f4"
  }, {
    "url": "exercises/100",
    "revision": "03a03de384bb090de0fff575f59ac067"
  }, {
    "url": "exercises/101",
    "revision": "37540914d339ce435b7d6b39a75e59e5"
  }, {
    "url": "exercises/102",
    "revision": "5477814ccce93c61012aba5e62244a12"
  }, {
    "url": "exercises/103",
    "revision": "20b7895f7019f57b473d140b44dfc52d"
  }, {
    "url": "exercises/104",
    "revision": "faf73db9ab97d1e4a3cbdb98e0174dc1"
  }, {
    "url": "exercises/105",
    "revision": "ef412ec0d431da4f73d3226408a2321a"
  }, {
    "url": "exercises/106",
    "revision": "f202a63bb33016333738d84fff0237d0"
  }, {
    "url": "exercises/107",
    "revision": "5d1c05fdac5e8a5761036cdb06524797"
  }, {
    "url": "exercises/108",
    "revision": "e081078808d2ef1c707418c10dba20f6"
  }, {
    "url": "exercises/109",
    "revision": "dea72809a4dd94f19f0dec2450a62ab5"
  }, {
    "url": "exercises/11",
    "revision": "31f3d45c9fc687f31984bac9e5209a1b"
  }, {
    "url": "exercises/110",
    "revision": "ed835fc69c044b4e0f7339175a543000"
  }, {
    "url": "exercises/111",
    "revision": "2741406d67ab0d0f74eace30bebf15db"
  }, {
    "url": "exercises/112",
    "revision": "a0ac7016c87ccf42593d6135e7ef5a43"
  }, {
    "url": "exercises/113",
    "revision": "b66858e2b24f4530f764095199e54ae0"
  }, {
    "url": "exercises/114",
    "revision": "a128b5fbe599aebf546d962de57b7d97"
  }, {
    "url": "exercises/115",
    "revision": "af3730919d3288433b20af07dadc7c33"
  }, {
    "url": "exercises/116",
    "revision": "3761045118f79a67d9039277dce85a22"
  }, {
    "url": "exercises/117",
    "revision": "97320f7ae8d1845c78612f2656424d3d"
  }, {
    "url": "exercises/118",
    "revision": "d3ac111f80480c9af9551d3e728ff066"
  }, {
    "url": "exercises/119",
    "revision": "f3655ef3b5f3bf4e0bd1c4472b9af9ea"
  }, {
    "url": "exercises/12",
    "revision": "9d5e7fb444d1e75f5f7e98033d4950af"
  }, {
    "url": "exercises/120",
    "revision": "f44ce0fe8e24edf17dbc3672027ba3ad"
  }, {
    "url": "exercises/121",
    "revision": "a5c5ce78c53bfae7e41f9637391405cf"
  }, {
    "url": "exercises/122",
    "revision": "8befedf9118a84795f1b83bd44a5c5a4"
  }, {
    "url": "exercises/123",
    "revision": "5ccc3beb26f64ac634c0480d4fe2f414"
  }, {
    "url": "exercises/124",
    "revision": "250aeaa29bfbd6e65a693a40fd7ae168"
  }, {
    "url": "exercises/125",
    "revision": "42b7e1dab08998cc2059cf8cf43f7f62"
  }, {
    "url": "exercises/13",
    "revision": "6a29129a30c6fd4051f20c334f52129d"
  }, {
    "url": "exercises/14",
    "revision": "0c876a47b1c3881cbe9f69df47bcc9fe"
  }, {
    "url": "exercises/15",
    "revision": "5b8443936ef7b9179f74487253be967f"
  }, {
    "url": "exercises/16",
    "revision": "6153eb568ed976632599d692b769554c"
  }, {
    "url": "exercises/17",
    "revision": "303593ce1aa5eb9e1f76ac79bf3f929c"
  }, {
    "url": "exercises/18",
    "revision": "7198c4bc4d760d16edb82661be1d979c"
  }, {
    "url": "exercises/19",
    "revision": "8d3bba4e5c4c8d73a09540c5ace95826"
  }, {
    "url": "exercises/2",
    "revision": "bc7ee85e77526dc5fa64302f0ab3e9cd"
  }, {
    "url": "exercises/20",
    "revision": "1c2e640ca728c459a0d421e193b961a3"
  }, {
    "url": "exercises/21",
    "revision": "536c4523b4cc582d547b0d4f4ae4fa78"
  }, {
    "url": "exercises/22",
    "revision": "c0db26cc4ce9c5a234cb79ecfa96374e"
  }, {
    "url": "exercises/23",
    "revision": "be46d13a534be9f72bce0793a7e08bc5"
  }, {
    "url": "exercises/24",
    "revision": "ea608f97734f8b603eeac5dcd27d8d07"
  }, {
    "url": "exercises/25",
    "revision": "507746406d8771f9d3e6a5e9a32fe7a5"
  }, {
    "url": "exercises/26",
    "revision": "05c731782940f8832f6edf863492a83e"
  }, {
    "url": "exercises/27",
    "revision": "d33274117bfe3db36e7e6d8590c49fcc"
  }, {
    "url": "exercises/28",
    "revision": "2d686551e5e5efc3f71836813569f30f"
  }, {
    "url": "exercises/29",
    "revision": "23e41e56d54e8ca9b534fbfcd58e5cd3"
  }, {
    "url": "exercises/3",
    "revision": "cbd80c38293b294a264ca220b0e420e3"
  }, {
    "url": "exercises/30",
    "revision": "b4130dbf7d5764f9738b746977102582"
  }, {
    "url": "exercises/31",
    "revision": "cb399559008f44cb1709e230d4ae6eaa"
  }, {
    "url": "exercises/32",
    "revision": "c3345b68ba5e42adea0f906d7e1446d3"
  }, {
    "url": "exercises/33",
    "revision": "d0fcb675a0fb2e647c9a9112943a1d59"
  }, {
    "url": "exercises/34",
    "revision": "057fa43f1a4ba0df4d7c3dea77853423"
  }, {
    "url": "exercises/35",
    "revision": "091cab9664ce194349742e220c19dbc8"
  }, {
    "url": "exercises/36",
    "revision": "19e51a4c8ccf45a3e3448d44673a18e2"
  }, {
    "url": "exercises/37",
    "revision": "f3f17ee9846a9745d354130c45abebc6"
  }, {
    "url": "exercises/38",
    "revision": "8cf9c16e24b08f709f07c6cf05e35fb8"
  }, {
    "url": "exercises/39",
    "revision": "ae59dbe317faea833c425697c1c2b857"
  }, {
    "url": "exercises/4",
    "revision": "1393db1a9e2d41a560a4f19a8ba3ebdf"
  }, {
    "url": "exercises/40",
    "revision": "1c4476931d826ebc2584c4a6b0726ed1"
  }, {
    "url": "exercises/41",
    "revision": "fe1bc5063a22e8260b1a5c8882f673e3"
  }, {
    "url": "exercises/42",
    "revision": "29bcb541eb01e530ae3c9119eec485ff"
  }, {
    "url": "exercises/43",
    "revision": "5ec161dbe8d9daca144c3ffe81a2ffaa"
  }, {
    "url": "exercises/44",
    "revision": "0395e5c11601d07ff626a695e8ba7c1b"
  }, {
    "url": "exercises/45",
    "revision": "3c878edb3527c84d814b05de69c70d03"
  }, {
    "url": "exercises/46",
    "revision": "5498751c11ef230c47a0850194ecdf2e"
  }, {
    "url": "exercises/47",
    "revision": "bb56fe65ad40e1b7c5ba26e0fd4d41a4"
  }, {
    "url": "exercises/48",
    "revision": "1e49521dd12f4db49e0ed9c9dbdcc156"
  }, {
    "url": "exercises/49",
    "revision": "adec0f945a8b15a2b0804aa531f3825c"
  }, {
    "url": "exercises/5",
    "revision": "4b41c846de0e11a025a44ae24bd9af70"
  }, {
    "url": "exercises/50",
    "revision": "b1084560f8f494cefe153166f0031ac9"
  }, {
    "url": "exercises/51",
    "revision": "f35ab93d2b8a8f0b0317760948539d8d"
  }, {
    "url": "exercises/52",
    "revision": "8846e3716611f625c517ce5aae0800a2"
  }, {
    "url": "exercises/53",
    "revision": "1e78c686db2ced4278ab9f12251787e4"
  }, {
    "url": "exercises/54",
    "revision": "28f1a8abfa65e979d5b4d74ce48e974a"
  }, {
    "url": "exercises/55",
    "revision": "ddbbe34a5bab57740121b9756f8438c1"
  }, {
    "url": "exercises/56",
    "revision": "235d0c594d75d53e525662b48ae759f1"
  }, {
    "url": "exercises/57",
    "revision": "0829f20e2fa7e8021b93ce0040be1105"
  }, {
    "url": "exercises/58",
    "revision": "7b806ce17e8b0d1fe6dc62b6c4a9a460"
  }, {
    "url": "exercises/59",
    "revision": "6120dafe5c951cb07e1adddc390c3f81"
  }, {
    "url": "exercises/6",
    "revision": "525e389d74243cdd37ee5fe917e7fff5"
  }, {
    "url": "exercises/60",
    "revision": "c5f01f0d57846a36c863ad791d8c50e5"
  }, {
    "url": "exercises/61",
    "revision": "81fc9b4bf26e8c35849874a61dcaff84"
  }, {
    "url": "exercises/62",
    "revision": "98f99c28d959f7561c2b277ed2d91238"
  }, {
    "url": "exercises/63",
    "revision": "d39140d9f0429cc81a15183d11cc181c"
  }, {
    "url": "exercises/64",
    "revision": "5a58aca8de94c581bda927b024dae7e9"
  }, {
    "url": "exercises/65",
    "revision": "b0e65d18824ce10d8f131e5183810193"
  }, {
    "url": "exercises/66",
    "revision": "6a82b55e4f97074866ac2c606de8bc35"
  }, {
    "url": "exercises/67",
    "revision": "b9e8e7502a9289e0d6454814b93a13ef"
  }, {
    "url": "exercises/68",
    "revision": "80fdf94fadd29e075cbd68bb31291b6f"
  }, {
    "url": "exercises/69",
    "revision": "521da0ccff42b44df2606b3f48146877"
  }, {
    "url": "exercises/7",
    "revision": "a9a14d34fba2b66c603148f9b9933646"
  }, {
    "url": "exercises/70",
    "revision": "bd8903bf9d57ffb4bd50990a9222f28c"
  }, {
    "url": "exercises/71",
    "revision": "e91f0575e509aef08259a2ebe9f35b2e"
  }, {
    "url": "exercises/72",
    "revision": "ff1452452516232ff24b134974c11b17"
  }, {
    "url": "exercises/73",
    "revision": "cc84b633f70967fbcd27364ef119398d"
  }, {
    "url": "exercises/74",
    "revision": "6522b3c95a9cd434dd3589dc2af371b2"
  }, {
    "url": "exercises/75",
    "revision": "dc87f7ed694aced33d81db9d94661d81"
  }, {
    "url": "exercises/76",
    "revision": "8c0143e2128e9e11b7fb79166c489b45"
  }, {
    "url": "exercises/77",
    "revision": "f8d1d702a4551421f92827a9a9334a7b"
  }, {
    "url": "exercises/78",
    "revision": "d2a85721cefbb08941703c81abf85b9c"
  }, {
    "url": "exercises/79",
    "revision": "8ee7ea367ba7f89f657edb99ac49a30a"
  }, {
    "url": "exercises/8",
    "revision": "0ab2e7e670f285efef0604d99b566fcb"
  }, {
    "url": "exercises/80",
    "revision": "7237d1d34bbd94f3a66ee1a72b01bce0"
  }, {
    "url": "exercises/81",
    "revision": "0c417762cce7cbf71837981ad1b8413c"
  }, {
    "url": "exercises/82",
    "revision": "a83eb1790d53fd64f50caaa9d28e24f9"
  }, {
    "url": "exercises/83",
    "revision": "be0c1f141affc352b7bb8c935f456fe9"
  }, {
    "url": "exercises/84",
    "revision": "e0d076215f309f443ffab6318631833b"
  }, {
    "url": "exercises/85",
    "revision": "476221703f4087d6edfd325b96d9d5cb"
  }, {
    "url": "exercises/86",
    "revision": "3b6c3cee61fd76ccee85e2e3f59fcd8d"
  }, {
    "url": "exercises/87",
    "revision": "a4eab43630d294c5876d12d32ad28c75"
  }, {
    "url": "exercises/88",
    "revision": "ec524c4c47e9457b9c442e231fb64732"
  }, {
    "url": "exercises/89",
    "revision": "a0bdfca3087f2f4af8acf2354c9bf60a"
  }, {
    "url": "exercises/9",
    "revision": "29c6a05270c4ccf47a0d2af26280c137"
  }, {
    "url": "exercises/90",
    "revision": "4a779039563efd16dfea30a5137ef614"
  }, {
    "url": "exercises/91",
    "revision": "c8026f3f70ac76f45b6b81b09ec4678a"
  }, {
    "url": "exercises/92",
    "revision": "1e33402509e2af46ec7c1407e40b14d7"
  }, {
    "url": "exercises/93",
    "revision": "05db10b06c56da6b0f556ec60111d315"
  }, {
    "url": "exercises/94",
    "revision": "99355a83b4d8a282a01f5f3bbf0d2347"
  }, {
    "url": "exercises/95",
    "revision": "4adeae6a021b0a6c091f39691ee096cc"
  }, {
    "url": "exercises/96",
    "revision": "7f9fdb36e8a8a6d7442a0de094caa232"
  }, {
    "url": "exercises/97",
    "revision": "cd8d3b01ac3cdd64445bce6a0f7b0f7c"
  }, {
    "url": "exercises/98",
    "revision": "b698b99bdde2f9112b17f77c6e0f632a"
  }, {
    "url": "exercises/99",
    "revision": "8090fb1dcbfa70d9edcf5d7d6cf964cf"
  }, {
    "url": "/exercises/",
    "revision": "b61f79aeb8e05d7d325c28f57eea3c54"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
