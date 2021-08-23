// for the details tag open
details.addEventListener("toggle", event => {
    if (details.open) {
      /* the element was toggled open */
    } else {
      /* the element was toggled closed */
    }
  });
  //for the details tag
const fireTracking = (label) => {
  //Fire tracking here
  console.log(label);
};

export const pwaTrackingListeners = () => {
  const fireAddToHomeScreenImpression = (event) => {
    fireTracking("Add to homescreen shown");
    //will not work for chrome, untill fixed
    event.userChoice.then((choiceResult) => {
      fireTracking(`User clicked ${choiceResult}`);
    });
    //This is to prevent `beforeinstallprompt` event that triggers again on `Add` or `Cancel` click
    window.removeEventListener(
      "beforeinstallprompt",
      fireAddToHomeScreenImpression
    );
  };
  window.addEventListener("beforeinstallprompt", fireAddToHomeScreenImpression);

  //Track web app install by user
  window.addEventListener("appinstalled", (event) => {
    fireTracking("PWA app installed by user!!! Hurray");
  });

  //Track from where your web app has been opened/browsed
  window.addEventListener("load", () => {
    let trackText;
    if (navigator && navigator.standalone) {
      trackText = "Launched: Installed (iOS)";
    } else if (matchMedia("(display-mode: standalone)").matches) {
      trackText = "Launched: Installed";
    } else {
      trackText = "Launched: Browser Tab";
    }
    fireTracking(trackText);
  });
};
