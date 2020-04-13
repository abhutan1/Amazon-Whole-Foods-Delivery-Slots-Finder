var delivery_slots_script_running
const TIME_IN_5_SECONDS = 5 * 1000
const TIME_IN_60_SECONDS = 60 * 1000

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (delivery_slots_script_running){
      delivery_slots_script_running = false
      alert("Hello there\n\nI am going to stop looking for delivery slots now. " +
            "Toggle the icon if you want me to try again.\n\nBye!")
      return
    }

    if (tabs[0].url.includes("https://www.amazon.com/gp/buy/shipoptionselect/handlers/display.html")){
      var find_delivery_slots = confirm("Hello there\n\nLooks like you are in " +
                                        "need of groceries. I can help you out " +
                                        "by finding delivery slots. Just click " +
                                        "OK and I will send a notification when " +
                                        "I find a slot.\n\nIf you do not want my " +
                                        "help, hit Cancel")
      if (find_delivery_slots){
        delivery_slots_script_running = true
        chrome.tabs.executeScript({
          file: 'delivery_slots.js'
        })
      }
    }
    else{
      alert("Sorry :(\n\nLooks like this is not the correct page. I can only start "+
            "looking for slots if you toggle me from the Schedule Your Delivery page")
    }
  })
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (!delivery_slots_script_running){
      return
    }

    if (request.clicked === "checkout_wfm_cart"){
      setTimeout(() =>
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript({
            file: 'before_you_checkout.js'
          })
      }), TIME_IN_5_SECONDS)
      return
    }

    if (request.clicked === "before_you_checkout"){
      setTimeout(() =>
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript({
            file: 'subs_prefs.js'
          })
      }), TIME_IN_5_SECONDS)
      return
    }

    if (request.clicked === "subs_prefs"){
      setTimeout(() =>
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript({
            file: 'delivery_slots.js'
          })
      }), TIME_IN_5_SECONDS)
      return
    }

    if(request.message === "incorrect_page") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: "https://www.amazon.com/cart/localmarket"})
      })
      setTimeout(() =>
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript({
            file: 'checkout_wfm_cart.js'
          })
      }), TIME_IN_5_SECONDS)
      return
    }

    if (request.message === "has_delivery_slot") {
      delivery_slots_script_running = false
      alert("YAY! I found a delivery slot for you! Come back and take it before it goes away.")
    }

    if (request.message === "correct_page_but_no_delivery_slot") {
      setTimeout(() =>
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript({
            file: 'delivery_slots.js'
          })
      }), TIME_IN_60_SECONDS)
    }
  }
)
