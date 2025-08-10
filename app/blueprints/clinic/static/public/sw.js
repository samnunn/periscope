let version = "28"

let cacheName = `v${version}_data`

let cachedAssetPaths = [
    // HTML
    // '/clinic',
    // CSS
    '/static/main.css',
    // JS
    '/static/main.js',
    '/static/beagle.js',
    '/static/brightspot.js',
    '/static/fuzzysort.min.js',
    // DATA
    '/static/data/sort-data.json',
    '/static/data/citation-data.js',
    '/static/data/diagnosis-data.js',
    '/static/data/publication-data.js',

    // IMAGES
    '/static/icons/gasper.png',
    '/static/icons/gasper_nobellows.png',
    '/static/icons/gasper_justbellows.png',
    '/app/static/icons/gasper_favicon.png',
    '/static/icons/gasper_thinking.png',
    '/static/icons/chevron_down.svg',
    '/static/icons/colour_zap.svg',
    '/static/icons/colour_search.svg',
    '/static/icons/colour_bookmark.svg',
    '/static/icons/colour_heart.svg',
    '/static/icons/colour_gas_mask.svg',
    '/static/icons/colour_droplet.svg',
    '/static/icons/colour_pen_tool.svg',
    '/static/icons/colour_life_buoy.svg',
    '/static/icons/colour_pill.svg',
    '/static/icons/colour_check_circle.svg',
    '/static/icons/colour_arrow_down_circle.svg',
    '/static/icons/colour_edit.svg',
    '/static/icons/x_octagon.svg',
    '/static/icons/propeller_hat.svg',
    '/static/icons/github-mark.svg',
    '/static/clinic_data_safety.svg',
    '/static/propofol_molecule.svg',
    '/static/icons/arrow_up.svg',
    '/static/icons/arrow_down.svg',
    '/static/icons/arrow_down_left.svg',
    '/static/icons/menu.svg',
    '/static/icons/info.svg',
    '/static/icons/copy.svg',
]

// install (pre-activation) event
// waitUntil() accepts a Promise and *waits* for it to resolve
// alt title: waitForResolutionOfThisPromise(<Promise>)
async function install() {
    console.debug(`SW ${version}: installing`)

    let cache = await caches.open(cacheName)

    for (let p of cachedAssetPaths) {
        try {
            await cache.add(p)
            console.debug(`SW ${version}: pre-downloaded asset @ ${p}`)
        } catch ({ name, message }) {
            console.error(`SW ${version}: failed to pre-download asset @ ${p}`)
        } finally {
            continue
        }
    }

    self.skipWaiting()
}
self.addEventListener('install', event => {
    event.waitUntil(install())
})

// activation (post-installation) event
async function activate() {
    console.debug(`SW ${version}: activating`)
    let allCaches = await caches.keys()
    let badCaches = allCaches.filter((key) => { return key != cacheName })
    for (let c of badCaches) {
        caches.delete(c)
    }
    await self.clients.claim()
}
self.addEventListener('activate', (e) => {
    e.waitUntil(activate())
})

// fetch (every request)
self.addEventListener('fetch', async (e) => {
    // https://stackoverflow.com/a/49719964
    // via https://gomakethings.com/toolkit/boilerplates/service-worker/
    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;

    e.respondWith(cacheBeforeNetwork(e.request))
})

// matching methods
async function cacheBeforeNetwork(request) {
    console.debug(`SW ${version}: running cacheBeforeNetwork for ${request.url}`)

    // match and return
    let match = await caches.match(request)
    if (match) {
        console.debug(`SW ${version}: ${request.url} served from cache 💾`)
        return match
    }
    // fall back to network
    console.debug(`SW ${version}: ${request.url} served from network 🛜`)
    return await fetch(request)
}