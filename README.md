# YouTube Background Video Block for Gutenberg

A quick experiment with combining the YouTube embed API with a dynamic Gutenberg block to create a new type of hero element.

## What is this?

I'm a front-end engineer and WordPress developer at [10up](https://10up.com). To learn more about [Gutenberg](https://wordpress.org/gutenberg/), I built this [dynamic block](https://developer.wordpress.org/block-editor/tutorials/block-tutorial/creating-dynamic-blocks/) for fun and ended up using it on my own personal website. You can [see it in action there](https://dkoo.co).

The architecture for this plugin is loosely based on [10up’s plugin scaffold](https://github.com/10up/plugin-scaffold). If you're interested in plugin development for WordPress, check out 10up's [open source projects](https://github.com/10up/) and [Engineering Best Practices](https://10up.github.io/Engineering-Best-Practices/) for more info.

## What does it do?

You insert the Background Video block into your page or post content. You give it a shareable YouTube video URL. The block uses the [YouTube JavaScript API](https://developers.google.com/youtube/v3/quickstart/js) to embed the video as full-viewport hero element with the video playing silently in the background, similar to [this type of effect](https://www.w3schools.com/howto/howto_css_fullscreen_video.asp) which has been trendy for all kinds of sites for the past few years. Optionally, you can add a "next" button which smooth scrolls to the next sibling element on the page, and/or overlay other blocks on top of the element (but be careful not to overflow the viewport or things might get wonky).

## Why YouTube?

Unlike Vimeo, which has [built-in support for Chromeless background videos](https://vimeo.zendesk.com/hc/en-us/articles/115011183028-Embedding-background-and-chromeless-videos), YouTube no longer supports completely hiding video controls, UI, related content suggestions, or branding in videos embedded via its API. Unfortunately, Vimeo's chromeless features require a paid membership. Some quick research led me to find [some](https://codepen.io/dudleystorey/pen/PZyMrd) [examples](https://codepen.io/vaughndtaylor/pen/BKqybz) of using CSS to effectively hide the YouTube UI. I owe these examples a debt for showing me it was possible.

## How do I use it?

First off, this is a sandbox experiment, not intended as a production-ready or open source tool. I may end up developing it as an open source plugin, but for now, I offer no support or guarantees for this code. But if you'd like to play around with it, here's how:

* Clone this repo to your `/wp-content/themes` folder.
* Run `npm run start` to install dependencies and compile assets.
* In your WordPress Plugins dashboard, activate the *Derrick's Test Block* plugin.
* In any post or page content, find the *Background Video* block inside the *Dkoo* block category.

You can use any video that's publicly streamable on YouTube. There are currently no options for playlists or other player configuration settings. Have fun!

If you use this for any project, personal or otherwise, please [let me know](https://dkoo.co/#contact)!