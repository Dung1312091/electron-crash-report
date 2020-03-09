export function crashWithWhileScreen() {
  window.result = {};
  for (var item in localStorage) delete localStorage[item];

  // eslint-disable-next-line no-undef
  result.textContent = "Test running…";

  //Start test
  //Defer running so DOM can be updated with "test running" message
  setTimeout(function() {
    //Variables
    var low = 0,
      high = 2e9,
      half;

    //Two billion may be a little low as a starting point, so increase if necessary
    while (canStore(high)) high *= 2;

    //Keep refining until low and high are equal
    while (low !== high) {
      half = Math.floor((high - low) / 2 + low);

      //Check if we can't scale down any further
      if (low === half || high === half) {
        console.info(low, high, half);
        //Set low to the maximum possible amount that can be stored
        low = canStore(high) ? high : low;
        high = low;
        break;
      }

      //Check if the maximum storage is no higher than half
      if (storageMaxBetween(low, half)) {
        high = half;
        //The only other possibility is that it's higher than half but not higher than "high"
      } else {
        low = half + 1;
      }
    }

    //Show the result we found!
    // eslint-disable-next-line no-undef
    result.innerHTML =
      "The maximum length of a string that can be stored in localStorage is <strong>" +
      low +
      "</strong> characters.";

    //Functions
    function canStore(strLen) {
      try {
        delete localStorage.foo;
        localStorage.foo = Array(strLen + 1).join("A");
        return true;
      } catch (ex) {
        return false;
      }
    }

    function storageMaxBetween(low, high) {
      return canStore(low) && !canStore(high);
    }
  }, 0);
}
