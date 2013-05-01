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
$('a[data-service]').social({
  fetchCountOnInit: false // to send a request on plugin init or nots
});
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

## How to use

Initialize plugin

```javascript
$('a[data-service]').social();
```

Fetch share count with callback

```javascript
$('a[data-service]').social('fetchShareCount', function (count) {
  console.log(count);
});
```

Capture 'sharefetched' event

```javascript
$('a[data-service]').on('sharefetched', function (e, count) {
  console.log(count);
});
$('a[data-service]').social('fetchShareCount');
```

Get count from element (already fetched)

```javascript
var count = $('a[data-service]').social('getCurrentShareCount');
```
