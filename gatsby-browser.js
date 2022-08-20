import { ServiceWorkerArgs } from "gatsby"

export const onServiceWorkerUpdateReady = async (args) => {
  const permissionResponse = await Notification.requestPermission()
  if (permissionResponse === "granted") {
    await args.serviceWorker.showNotification("Website update", {
      body:
        "Our website just got a little bit better. We reloaded the site with the update to ensure a smooth experience for you."
    })
  }
  window.location.reload(true)
}

// export const onServiceWorkerUpdateFound = () => window.location.reload(true);
