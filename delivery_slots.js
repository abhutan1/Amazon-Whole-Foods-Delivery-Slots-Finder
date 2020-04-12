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
// If a delivery slot is found, sends a notification
function retryHasDeliverySlots(){
  window.location.reload(true)
  var schedule_widget = document.getElementsByClassName("a-container ufss-widget-container")
  if (!IsScheduleDeliveryPage(schedule_widget)){
    chrome.runtime.sendMessage({"message": "incorrect_page"})
  }

  if (!hasDeliverySlots(schedule_widget)){
    chrome.runtime.sendMessage({"message": "has_delivery_slot"})
  }
  else{
    chrome.runtime.sendMessage({"message": "correct_page_but_no_delivery_slot"})
  }
}

retryHasDeliverySlots()
