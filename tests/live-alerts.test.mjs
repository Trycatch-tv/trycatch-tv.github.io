import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"

const component = readFileSync(new URL("../src/components/landing/socialNetworks/SocialNetworks.astro", import.meta.url), "utf8")
const script = component.match(/<script>([\s\S]*?)<\/script>/)[1]
const source = ts.transpileModule(
  script.replace(/import\.meta\.env\.PUBLIC_ONESIGNAL_APP_ID/g, "testAppId"),
  { compilerOptions: { target: ts.ScriptTarget.ES2022 } },
).outputText

class Element {
  constructor(classes = "") {
    this.classes = new Set(classes.split(/\s+/).filter(Boolean))
    this.listeners = new Map()
    this.classList = {
      add: (value) => this.classes.add(value),
      remove: (value) => this.classes.delete(value),
    }
  }
  addEventListener(name, callback) {
    this.listeners.set(name, callback)
  }
  async emit(name) {
    await this.listeners.get(name)?.()
  }
}

function setup({ appId = "test-app", hostname = "trycatch.tv", supported = true, permission = "default", optedIn = false, initFails = false, promptFails = false } = {}) {
  const elements = new Map()
  for (const match of component.matchAll(/<[a-z]+\b[^>]*\bid="([^"]+)"[^>]*>/g)) {
    const classes = match[0].match(/class="([^"]*)"/)?.[1] ?? ""
    elements.set(match[1], new Element(classes))
  }
  const notification = { permission }
  const subscription = new Element()
  subscription.optedIn = optedIn
  subscription.optIn = async () => { subscription.optedIn = true }
  subscription.optOut = async () => { subscription.optedIn = false }
  const notifications = new Element()
  notifications.requestPermission = async () => {
    if (promptFails) throw new Error("Request failed")
    notification.permission = "granted"
  }
  let initOptions
  const sdk = {
    init: async (options) => {
      initOptions = options
      if (initFails) throw new Error("Init failed")
    },
    User: { PushSubscription: subscription },
    Notifications: notifications,
  }
  const appended = []
  const timers = new Map()
  let reloads = 0
  const window = {
    location: { hostname, reload: () => { reloads++ } },
    setTimeout: (callback) => { timers.set(1, callback); return 1 },
    clearTimeout: (id) => timers.delete(id),
  }
  if (supported) window.Notification = notification
  const document = {
    readyState: "complete",
    getElementById: (id) => elements.get(id),
    querySelector: () => null,
    createElement: () => new Element(),
    head: { appendChild: (el) => appended.push(el) },
  }
  vm.runInNewContext(source, {
    testAppId: appId, window, document, Notification: notification,
    navigator: supported ? { serviceWorker: {} } : {},
    console: { info() {}, error() {} },
  })
  return {
    elements, notification, subscription, notifications, appended, timers,
    visible: (id) => !elements.get(id).classes.has("hidden"),
    click: (id) => elements.get(id).emit("click"),
    ready: async () => { await window.OneSignalDeferred[0](sdk) },
    options: () => initOptions,
    reloads: () => reloads,
  }
}

test("preserves OneSignal configuration and supports subscription, opt-out and re-subscription", async () => {
  const page = setup()
  assert.equal(page.appended[0].src, "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js")
  await page.ready()
  const options = page.options()
  assert.equal(options.appId, "test-app")
  assert.equal(options.serviceWorkerPath, "/OneSignalSDKWorker.js")
  assert.equal(options.serviceWorkerParam.scope, "/")
  assert.equal(options.notifyButton.enable, false)
  assert.equal(page.visible("la-subscribe"), true)
  await page.click("la-subscribe")
  assert.equal(page.visible("la-subscribed"), true)
  assert.equal(page.visible("la-unsubscribe"), true)
  await page.click("la-unsubscribe")
  assert.equal(page.subscription.optedIn, false)
  assert.equal(page.visible("la-subscribe"), true)
  await page.click("la-subscribe")
  assert.equal(page.subscription.optedIn, true)
  assert.equal(page.visible("la-subscribed"), true)
})

test("recognizes an existing subscription and external subscription changes", async () => {
  const page = setup({ permission: "granted", optedIn: true })
  await page.ready()
  assert.equal(page.visible("la-subscribed"), true)
  page.subscription.optedIn = false
  await page.subscription.emit("change")
  assert.equal(page.visible("la-subscribe"), true)
})

test("shows blocked permissions and reacts when permission changes", async () => {
  const page = setup({ permission: "denied" })
  await page.ready()
  assert.equal(page.visible("la-blocked"), true)
  page.notification.permission = "granted"
  await page.notifications.emit("permissionChange")
  assert.equal(page.visible("la-subscribe"), true)
})

for (const scenario of [{ appId: "" }, { hostname: "localhost" }, { hostname: "127.0.0.1" }]) {
  test("does not offer an inactive subscribe button: " + JSON.stringify(scenario), () => {
    const page = setup(scenario)
    assert.equal(page.visible("la-unavailable"), true)
    assert.equal(page.visible("la-subscribe"), false)
    assert.equal(page.appended.length, 0)
  })
}

test("handles unsupported browsers", () => {
  const page = setup({ supported: false })
  assert.equal(page.visible("la-unsupported"), true)
  assert.equal(page.appended.length, 0)
})

test("recovers from initialization failure through retry", async () => {
  const page = setup({ initFails: true })
  await page.ready()
  assert.equal(page.visible("la-error"), true)
  assert.equal(page.visible("la-retry"), true)
  await page.click("la-retry")
  assert.equal(page.reloads(), 1)
  assert.equal(page.timers.size, 0)
})

test("reports SDK download failures", async () => {
  const page = setup()
  await page.appended[0].emit("error")
  assert.equal(page.visible("la-error"), true)
  assert.equal(page.timers.size, 0)
})

test("reports SDK load timeout and recovers if it subsequently loads", async () => {
  const page = setup()
  page.timers.get(1)()
  assert.equal(page.visible("la-error"), true)
  await page.ready()
  assert.equal(page.visible("la-subscribe"), true)
})

test("reports subscription request failure", async () => {
  const page = setup({ promptFails: true })
  await page.ready()
  await page.click("la-subscribe")
  assert.equal(page.visible("la-error"), true)
})

test("keeps subscription available when the permission prompt is dismissed", async () => {
  const page = setup()
  page.notifications.requestPermission = async () => {}
  await page.ready()
  await page.click("la-subscribe")
  assert.equal(page.subscription.optedIn, false)
  assert.equal(page.visible("la-subscribe"), true)
})

test("reports opt-out failure without leaving the UI loading", async () => {
  const page = setup({ permission: "granted", optedIn: true })
  page.subscription.optOut = async () => { throw new Error("Opt-out failed") }
  await page.ready()
  await page.click("la-unsubscribe")
  assert.equal(page.visible("la-error"), true)
  assert.equal(page.visible("la-loading"), false)
})
