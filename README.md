# Amazon-Whole-Foods-Delivery-Slots-Finder
A simple Google Chrome extension that polls for Whole Foods delivery slots on Amazon and alerts the user when a slot is found.

# How do I install it?
Search for the extension in the Chrome Web Store or click [here](https://chrome.google.com/webstore/detail/amazon-whole-foods-delive/dbppijhmnaanngcbfhejflfbdecfbjfh)

If you want to play around with code and develop on it, download the code from this repo and follow the instructions for **Developer Mode** from Chrome Web Store.

# How does it work?
- The underlying script in the extension can be kicked off by toggling the extension icon from the Whole Foods ![Schedule Your Order](Schedule_Your_Order_Page.png) page on www.amazon.com 
- The script reads the webpage and tries to find delivery slots using keywords like "AM", "PM", etc. 
- Alerts the user if a delivery slot is found. Note: The alert can be toggled off by clicking the extension icon. 
- Tries to navigate back to the *Schedule Your Order* page if it ends up on an unknown page somehow. 

# Credits
- All icons (chatbots - 16x, 24x, 32x, 64x, 128x) are taken from www.flaticon.com 
- Note.mp3 is taken from http://www.mediafire.com/file/8atcqfqzptlblc5/extension-27496465.zip/file
