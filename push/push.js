const key = require("./vapid-private-key").key;
const webpush = require("web-push");

const vapidKeys = {
  publicKey:
    "BD4IyvGaW4ZqYUa1SOErtQiqcfaKBIoTMV3fwawhMzLwAlydvyzM_aWo4zW7Wb-zvy9xAA7lBPxvVQzDOXjufkc",
  privateKey: key,
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const browsers = require("./browser-keys.js");

const notificationPayload = {
  notification: {
    title: "Test",
    body: "Test124!",
    icon: "assets/icons/icon-128x128.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Go to the site",
      },
    ],
  },
};

const browserName = process.argv[2];
if (!browserName) {
  console.warn("No browser param");
  return;
}

webpush
  .sendNotification(browsers[browserName], JSON.stringify(notificationPayload))
  .then(() => console.log("Notification sent"))
  .catch((err) => {
    console.error("Error sending notification, reason: ", err);
  });
