# Social [![Build Status](https://travis-ci.org/ideil/socialjs.png)](https://travis-ci.org/ideil/socialjs)

JQuery plugin with useful methods which help to create custom social buttons.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/ideil/socialjs/master/dist/social.min.js
[max]: https://raw.github.com/ideil/socialjs/master/dist/social.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/social.min.js"></script>
<script>
jQuery(function ($) {
  $('a[data-service]').social();
});
</script>

<p>This button creates link to share current page
<a href="#" data-service="facebook">Social button</a>
and this one takes url from data-href attribute
<a href="#" data-service="facebook" data-href="http://google.com/">Social button</a></p>
```

Options:

```javascript
{
  fetchCountOnInit: false // to send a request on plugin init or nots
}
```

Supported networks:

  - Facebook
  - Twitter
  - Google+ (in development)
  - VK
  - Pinterest
  - LinkedIn
  - Mail.ru
  - Odnoklassniki.ru
