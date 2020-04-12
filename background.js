var delivery_slots_script_running;
const TIME_IN_60_SECONDS = 60 * 1000

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    if (activeTab.url.includes("https://www.amazon.com/gp/buy/shipoptionselect/handlers/display.html")){
      if (delivery_slots_script_running){
        alert("Hello there\n\nI am going to stop looking for delivery slots now. Toggle the icon if you want me to try again.\n\nBye!")
        delivery_slots_script_running = false
        return
      }
      var find_delivery_slots = confirm("Hello there\n\nLooks like you are in need of groceries. I can help you out by finding delivery slots. Just click OK and I will send a notification when I find a slot.\n\nIf you do not want my help, hit Cancel")
      if (find_delivery_slots){
        delivery_slots_script_running = true
        chrome.tabs.executeScript({
          file: 'delivery_slots.js'
        })
      }
    }
    else{
      alert("Sorry :( Looks like this is not the correct page. I cannot help you unless you are on the Schedule Your Delivery page")
    }
  })
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "incorrect_page") {
      delivery_slots_script_running = false
      alert("Sorry :( Looks like this is not the correct page. I cannot help you unless you are on the Schedule Your Delivery page")
    }
    else if (request.message === "has_delivery_slot") {
      delivery_slots_script_running = false
      alert("YAY! I found a delivery slot for you! Come back and take it before it goes away.")
    }
    else if (request.message === "correct_page_but_no_delivery_slot" && delivery_slots_script_running) {
      setTimeout(() =>
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var activeTab = tabs[0];
          chrome.tabs.executeScript({
            file: 'delivery_slots.js'
          })
      }), TIME_IN_60_SECONDS)
    }
  }
)
