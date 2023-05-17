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
    "url": "_app/immutable/chunks/paths.f466919f.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.41c905a7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ReloadPrompt.b2e5c6a8.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.477c0cb7.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/ui.ce99e1d2.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.3e9a836d.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.4ef7e98e.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.5cdeeeca.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.1cb02c30.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.c877118e.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/3.e7f2e1b9.js",
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
    "revision": "9299536eafdb3f052f9f67dc8e2fc18d"
  }, {
    "url": "exercises/10",
    "revision": "bbefc48fe57c5bb33ffc213d6302c524"
  }, {
    "url": "exercises/100",
    "revision": "f6567b2e5f02cbc2f3df6924b881cdab"
  }, {
    "url": "exercises/101",
    "revision": "a3c294d77eb1b82ea0910ad6b48dd944"
  }, {
    "url": "exercises/102",
    "revision": "e83c13e84b6d9ad1b03617ea22cad4db"
  }, {
    "url": "exercises/103",
    "revision": "4cf7ec6c7c190903568248ff63cbb4a4"
  }, {
    "url": "exercises/104",
    "revision": "1672270b3483afd4ea3586bbb0cf9818"
  }, {
    "url": "exercises/105",
    "revision": "c174e843369a5aa298d1f342c8c70245"
  }, {
    "url": "exercises/106",
    "revision": "8461e2aff210d828fcd36823609ec49a"
  }, {
    "url": "exercises/107",
    "revision": "31bf0b23db1f7125bd3e42b7bd21cf3e"
  }, {
    "url": "exercises/108",
    "revision": "d63db6b80358076eb3717ead383f0859"
  }, {
    "url": "exercises/109",
    "revision": "f0a7bc6d95fcce8411c2dba87713aabd"
  }, {
    "url": "exercises/11",
    "revision": "f2c5b95d0523a13086c2787d7acfcc5b"
  }, {
    "url": "exercises/110",
    "revision": "d43ce61a773c7c8916ddb6fb66885cf4"
  }, {
    "url": "exercises/111",
    "revision": "a3b7a03398228cede6a0ffbf28bafcaf"
  }, {
    "url": "exercises/112",
    "revision": "5bd5073ee262d9ba805ba208da21815e"
  }, {
    "url": "exercises/113",
    "revision": "738943353a3428fd77d172206dabf337"
  }, {
    "url": "exercises/114",
    "revision": "40191dbc628475738e89a15b223377b3"
  }, {
    "url": "exercises/115",
    "revision": "53f063974c1e4f88246c666c9cedc2e0"
  }, {
    "url": "exercises/116",
    "revision": "8f3b882e8b2c4029ff08cc82485aad07"
  }, {
    "url": "exercises/117",
    "revision": "d2b7f8095398447bdcfd92aa878752d1"
  }, {
    "url": "exercises/118",
    "revision": "dc5af8b36e5e1cef7f677e74a1c2e133"
  }, {
    "url": "exercises/119",
    "revision": "4ac99eb2d1007237e34eb1b0faaaf941"
  }, {
    "url": "exercises/12",
    "revision": "27c9b4c5e1d99e90915df4f53bf64e82"
  }, {
    "url": "exercises/120",
    "revision": "a4370a4335cccff61021e6e40fcb6ed2"
  }, {
    "url": "exercises/121",
    "revision": "5ba59e9c585b4d66fcff9ccaf23e6ae3"
  }, {
    "url": "exercises/122",
    "revision": "5489367990438907600eead940abb15a"
  }, {
    "url": "exercises/123",
    "revision": "e198c7f5832dc2e5b9e5fc8e4cd29040"
  }, {
    "url": "exercises/124",
    "revision": "9f0021bb4c145115dd697a80050098bf"
  }, {
    "url": "exercises/125",
    "revision": "b83053153b9e363c43c9a6865f39381b"
  }, {
    "url": "exercises/13",
    "revision": "da4113265e7b171559fb60d2abe32bb1"
  }, {
    "url": "exercises/14",
    "revision": "575828cddcea6a83b6b1f42ad7052f8c"
  }, {
    "url": "exercises/15",
    "revision": "92fe2a2f085746b3d4d0556b43432508"
  }, {
    "url": "exercises/16",
    "revision": "ebf848405712a40d793e51c279caae4a"
  }, {
    "url": "exercises/17",
    "revision": "64359e1e7f5071d2f8018b0d78525952"
  }, {
    "url": "exercises/18",
    "revision": "c79396ab6d3f11f8b7f6a8ad1318a33b"
  }, {
    "url": "exercises/19",
    "revision": "6ab407fbb43ab38e8dd031d50e1aced2"
  }, {
    "url": "exercises/2",
    "revision": "2b3c175dd0325755d559bb2c76fdacc1"
  }, {
    "url": "exercises/20",
    "revision": "55c505ad0749a8cb84442237e24ceff8"
  }, {
    "url": "exercises/21",
    "revision": "7bd8e628161f7f8378a3ad143b604c14"
  }, {
    "url": "exercises/22",
    "revision": "de7586ed44196bc212ff7fbe0397504e"
  }, {
    "url": "exercises/23",
    "revision": "be12b32539e0206d5f0387b64ae2e72e"
  }, {
    "url": "exercises/24",
    "revision": "63832e914c70dc60d83ff26ac9efd12d"
  }, {
    "url": "exercises/25",
    "revision": "f776a12daa3d2d2e9e2f919c3071be4c"
  }, {
    "url": "exercises/26",
    "revision": "7ea3cb9158fa44ab857d23afab5dd378"
  }, {
    "url": "exercises/27",
    "revision": "58c877a5f82ea68149d0fd0d280358e7"
  }, {
    "url": "exercises/28",
    "revision": "d1926758e087b4d01c49f8e07ffd1b87"
  }, {
    "url": "exercises/29",
    "revision": "fb064df53ec8860b58b1ec62c7b64d8b"
  }, {
    "url": "exercises/3",
    "revision": "3812e855871358e7daf9097869f3d2de"
  }, {
    "url": "exercises/30",
    "revision": "dba92ffc805dbf6cca31a752504e5d19"
  }, {
    "url": "exercises/31",
    "revision": "87eba399d345855d8a000f88801e5904"
  }, {
    "url": "exercises/32",
    "revision": "982d7eb0d17027990d8bc5af46757daf"
  }, {
    "url": "exercises/33",
    "revision": "5f05933051f6c713b08ed3c14b60754f"
  }, {
    "url": "exercises/34",
    "revision": "3e15a71c4971d1700bfea13f17b742df"
  }, {
    "url": "exercises/35",
    "revision": "f0e1b79da86cdcb2a0a50386a9f218ce"
  }, {
    "url": "exercises/36",
    "revision": "4ef14f1cb3d4b2948089dd287f5c67c4"
  }, {
    "url": "exercises/37",
    "revision": "6b365ace037a5966c40503a646dfc715"
  }, {
    "url": "exercises/38",
    "revision": "6545bf69aeba7822e433a94c2dfdce75"
  }, {
    "url": "exercises/39",
    "revision": "6e009b26d6465169e279a7aeffb06889"
  }, {
    "url": "exercises/4",
    "revision": "6ebb78deb7d39361d6630661862c1a04"
  }, {
    "url": "exercises/40",
    "revision": "76ece6b07ed95e326986060cd558a848"
  }, {
    "url": "exercises/41",
    "revision": "88ded94b61b59db87d9d1da77591b71c"
  }, {
    "url": "exercises/42",
    "revision": "12d25e2b2978a0e3d12d020d9f865f32"
  }, {
    "url": "exercises/43",
    "revision": "b2b2b76d3be2908723e1ddae44968d94"
  }, {
    "url": "exercises/44",
    "revision": "b43df5852830feef376df9ad9c837087"
  }, {
    "url": "exercises/45",
    "revision": "766eaa69ea6ee4edf06a29ed7c6945e0"
  }, {
    "url": "exercises/46",
    "revision": "a47849c5473ed6f3c6cd4ef51a23cec6"
  }, {
    "url": "exercises/47",
    "revision": "fffc4db7b815c8efcb452365bb018634"
  }, {
    "url": "exercises/48",
    "revision": "f8d994e686783e2eb595de2596d21b32"
  }, {
    "url": "exercises/49",
    "revision": "002091f230445b61f3f60f29225d0382"
  }, {
    "url": "exercises/5",
    "revision": "49635e0b2019ca3660d3f5c40f429e9c"
  }, {
    "url": "exercises/50",
    "revision": "f6d833b1cc3d06931d18fe2e110bd104"
  }, {
    "url": "exercises/51",
    "revision": "743f9f072602d2821f17df90779afd5e"
  }, {
    "url": "exercises/52",
    "revision": "7cc4802dcc3e1e0800fef99af230dfb5"
  }, {
    "url": "exercises/53",
    "revision": "f7d36453f14aafde3ab3f0e682eaf46d"
  }, {
    "url": "exercises/54",
    "revision": "4639e049f4d690f293cd4b3089ca7570"
  }, {
    "url": "exercises/55",
    "revision": "53d5936323f6883bb0d885363af7e7f5"
  }, {
    "url": "exercises/56",
    "revision": "bbf7c670a3f81d353f83d09ecda23ce5"
  }, {
    "url": "exercises/57",
    "revision": "405548fd0b9b4b543326cfb9fca53248"
  }, {
    "url": "exercises/58",
    "revision": "174a6344730809585a53fb09d4840cf8"
  }, {
    "url": "exercises/59",
    "revision": "4dcdaf9583f059bc65efdb5361761677"
  }, {
    "url": "exercises/6",
    "revision": "2c75074e35d9a8696a665d066aae8b40"
  }, {
    "url": "exercises/60",
    "revision": "63e1d7402117edf4a8771cbbce3506cf"
  }, {
    "url": "exercises/61",
    "revision": "f47892f2638aa9da32335d28868b081a"
  }, {
    "url": "exercises/62",
    "revision": "d6ab056a87e318520231893ff4da32cb"
  }, {
    "url": "exercises/63",
    "revision": "c312edfff884e1cd17ddfc244396554c"
  }, {
    "url": "exercises/64",
    "revision": "3fa7acef8d0a2ba2ea67515d690689c6"
  }, {
    "url": "exercises/65",
    "revision": "c7d5d0bd0dbcf34b22ec2143353cea89"
  }, {
    "url": "exercises/66",
    "revision": "2f531cca35fdcf75c2085f6c818f38db"
  }, {
    "url": "exercises/67",
    "revision": "8aeb81ad2d371f7a817a37687682bc65"
  }, {
    "url": "exercises/68",
    "revision": "08362eebb834e4a08819b178def1ded2"
  }, {
    "url": "exercises/69",
    "revision": "bd8f4686c08415e2c7d1dd27cf74faa8"
  }, {
    "url": "exercises/7",
    "revision": "07e06ef4c9c59f43ebe670e1f155c7c3"
  }, {
    "url": "exercises/70",
    "revision": "52bdd15e376f289688b8a7b22ccfe53b"
  }, {
    "url": "exercises/71",
    "revision": "1ce86456eb21b958c23ec4429a808699"
  }, {
    "url": "exercises/72",
    "revision": "57182ac3cfc67bb66206e735e2f8d907"
  }, {
    "url": "exercises/73",
    "revision": "28538b6e9753adb5d61328897b5f9ddd"
  }, {
    "url": "exercises/74",
    "revision": "dd3761080eb006f4b40b625137113b38"
  }, {
    "url": "exercises/75",
    "revision": "b421b1bb5b2d2b8b39e5b6c31074f57a"
  }, {
    "url": "exercises/76",
    "revision": "d674601303a37ac3c12cdf27e430aee7"
  }, {
    "url": "exercises/77",
    "revision": "1019f1a404c083a182412717c6558abe"
  }, {
    "url": "exercises/78",
    "revision": "a85f6820afcdfa88d0d12bc31e374655"
  }, {
    "url": "exercises/79",
    "revision": "32943a0b0b97d22b01a654293560262a"
  }, {
    "url": "exercises/8",
    "revision": "cdb1f304f45fd7b48d7b953836fc2a97"
  }, {
    "url": "exercises/80",
    "revision": "9892f5bb465225db8b0a389049079544"
  }, {
    "url": "exercises/81",
    "revision": "00c5855e7e6e44f3ee8bec18df0da268"
  }, {
    "url": "exercises/82",
    "revision": "188f779783b4a7faf129a32b8ac0e689"
  }, {
    "url": "exercises/83",
    "revision": "4810e06f1edc02d5ee5f80645f87b66d"
  }, {
    "url": "exercises/84",
    "revision": "0a751a20a9347a048e82c8b175af90a6"
  }, {
    "url": "exercises/85",
    "revision": "336257d98b0136add9adc73560e9cb76"
  }, {
    "url": "exercises/86",
    "revision": "e569a7882398f0d5677bd75626e0bec6"
  }, {
    "url": "exercises/87",
    "revision": "4135b7ec5e5428b2b941b3e3d5d1df75"
  }, {
    "url": "exercises/88",
    "revision": "9670c93bf8e812ef4ef1a334e484391e"
  }, {
    "url": "exercises/89",
    "revision": "3a2f6d30a27a63fe2a7f38b574596a23"
  }, {
    "url": "exercises/9",
    "revision": "17253b69463db5abc0636f9794506219"
  }, {
    "url": "exercises/90",
    "revision": "151cf0542449fc0c2682ed7c089ec87b"
  }, {
    "url": "exercises/91",
    "revision": "99cd82901e5adfaf728cb7b62289be19"
  }, {
    "url": "exercises/92",
    "revision": "8f5e66c417a8c6d35f42079b771423dd"
  }, {
    "url": "exercises/93",
    "revision": "d3b5a001de328430cecf98b1a45356cb"
  }, {
    "url": "exercises/94",
    "revision": "78c0b1ecf1dba512632972953ffbaf46"
  }, {
    "url": "exercises/95",
    "revision": "473d307afddd84d60942fe4db1c2dd2a"
  }, {
    "url": "exercises/96",
    "revision": "0dbd9f20bcfe7d03454a90e1f49a9684"
  }, {
    "url": "exercises/97",
    "revision": "ce22d6d1b84b86f1709e5c0f3544faa9"
  }, {
    "url": "exercises/98",
    "revision": "622520ef0bea6d3fccc91c32dddf7c2f"
  }, {
    "url": "exercises/99",
    "revision": "313e2686ecec41389579fafc5f5de102"
  }, {
    "url": "/exercises/",
    "revision": "d206d577c4ef6d13761fd45d63b7ea19"
  }, {
    "url": "manifest.webmanifest",
    "revision": "894f5f21f28ee9d2ef146c120c0c301d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/exercises/")));

}));
