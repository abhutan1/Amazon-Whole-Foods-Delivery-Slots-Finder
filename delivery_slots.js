function IsScheduleDeliveryPage(schedule_widget){
  for (var i = 0; i < schedule_widget.length; i++) {
    if (schedule_widget[i].innerText.includes("Schedule your order") &&
        schedule_widget[i].innerText.includes("Whole Foods Market"))
    {
      return true
    }
  }
  // Getting here means that we are not on the `Schedule Your Order` page
  return false
}

function hasDeliverySlots(schedule_widget) {
  var schedule_widget = document.getElementsByClassName("a-container ufss-widget-container")
  for (var i = 0; i < schedule_widget.length; i++) {
    if ((schedule_widget[i].innerText.includes("Next available") ||
        schedule_widget[i].innerText.includes("2-hour delivery windows")) &&
        (schedule_widget[i].innerText.includes("AM") ||
        schedule_widget[i].innerText.includes("PM")))
    {
      return true
    }
  }
  // Getting here means there are unfortunately no delivery slots
  return false
}

// This function checks if the user is on the correct page.
// If no, it alerts the user and asks to go back to the correct page
// If yes, it reloads the webpage and tries to find delivery slots.
// If a delivery slot is found, stops the timer and sends a notification
function retryHasDeliverySlots(){
  var schedule_widget = document.getElementsByClassName("a-container ufss-widget-container")
  if (!IsScheduleDeliveryPage(schedule_widget)){
    alert("Sorry :( Looks like this is not the correct page. I cannot help you unless I am on the Schedule Your Delivery page")
  }

  if (!hasDeliverySlots(schedule_widget)){
    window.location.reload(true)
  }
  else{
    alert("YAY! I found a delivery slot for you! Come back and take it before it goes away.")
  }
}

// Controls how often the function tries to find delivery slots
const TIME_IN_60_SECONDS = 60 * 1000
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.clicked === true) {
      var schedule_widget = document.getElementsByClassName("a-container ufss-widget-container")
      if (!IsScheduleDeliveryPage(schedule_widget)){
        alert("Sorry :( Looks like this is not the correct page. I cannot help you unless I am on the Schedule Your Delivery page")
      }
      else{
        var find_delivery_slots = confirm("Hello there\n\nLooks like you are in need of groceries. I can help you out by finding delivery slots. Just click OK and I will send a notification when I find a slot.\n\nIf you do not want my help, hit Cancel")
        if (find_delivery_slots){
          setTimeout(() => retryHasDeliverySlots(), TIME_IN_60_SECONDS);
        }
      }
    }
  }
)
