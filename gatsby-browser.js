export const onServiceWorkerUpdateFound = () => {
    if (
        window.confirm(
        `dev-juwon.app has been updated since your last visit.
        Please press "OK" for update to the latest version`
        )
      ) {
        window.location.reload(true)
      }
  }

//   exports.onServiceWorkerUpdateFound = () => window.location.reload(true);