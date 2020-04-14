document.getElementsByClassName("a-button-text a-text-center")[0].click()
chrome.runtime.sendMessage({"clicked": "before_you_checkout"})
