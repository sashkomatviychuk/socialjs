(function ($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('social link replacement', {
    // This will run before each test in this module.
    setup: function () {
      this.elems = $('#qunit-fixture .tests-link').children();
      this.fbShare = 'http://www.facebook.com/sharer.php?u=';
      this.elems.social();
    }
  });

  test('href from data-href', function () {
    var el = this.elems.eq(0);

    expect(1);

    strictEqual(el.attr('href'),
      this.fbShare + el.attr('data-href'),
      'href should be replaced with url from data-href');
  });

  test('href from window.location', function () {
    var el = this.elems.eq(1);

    expect(1);

    strictEqual(el.attr('href'),
      this.fbShare + window.location.href,
      'href should be replaced with url from current location');
  });

  module('social share counts: callback', {
    // This will run before each test in this module.
    setup: function () {
      this.services = ['facebook', 'twitter', 'vk', 'pinterest', 'linkedin', 'mailru', 'odnoklassniki'];
      this.elems = $('#qunit-fixture .tests-share-count-callback').children();
      this.elems.social();
    }
  });

  asyncTest('fetch count: facebook', function () {
    var el = this.elems.filter('[data-service=facebook]');

    expect(1);

    el.social('fetchShareCount', function (count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });
  });

  asyncTest('fetch count: twitter', function () {
    var el = this.elems.filter('[data-service=twitter]');

    expect(1);

    el.social('fetchShareCount', function (count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });
  });

  asyncTest('fetch count: vk', function () {
    var el = this.elems.filter('[data-service=vk]');

    expect(1);

    el.social('fetchShareCount', function (count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });
  });

  asyncTest('fetch count: pinterest', function () {
    var el = this.elems.filter('[data-service=pinterest]');

    expect(1);

    el.social('fetchShareCount', function (count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });
  });

  asyncTest('fetch count: linkedin', function () {
    var el = this.elems.filter('[data-service=linkedin]');

    expect(1);

    el.social('fetchShareCount', function (count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });
  });

  asyncTest('fetch count: mailru', function () {
    var el = this.elems.filter('[data-service=mailru]');

    expect(1);

    el.social('fetchShareCount', function (count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });
  });

  asyncTest('fetch count: odnoklassniki', function () {
    var el = this.elems.filter('[data-service=odnoklassniki]');

    expect(1);

    el.social('fetchShareCount', function (count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });
  });

  module('social share counts: event', {
    // This will run before each test in this module.
    setup: function () {
      this.services = ['facebook', 'twitter', 'vk', 'pinterest', 'linkedin', 'mailru', 'odnoklassniki'];
      this.elems = $('#qunit-fixture .tests-share-count-event').children();
      this.elems.social();
    }
  });

  asyncTest('fetch count: facebook', function () {
    var el = this.elems.filter('[data-service=facebook]');

    expect(1);

    el.on('sharefetched', function (e, count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });

    el.social('fetchShareCount');
  });

  asyncTest('fetch count: twitter', function () {
    var el = this.elems.filter('[data-service=twitter]');

    expect(1);

    el.on('sharefetched', function (e, count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });

    el.social('fetchShareCount');
  });

  asyncTest('fetch count: vk', function () {
    var el = this.elems.filter('[data-service=vk]');

    expect(1);

    el.on('sharefetched', function (e, count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });

    el.social('fetchShareCount');
  });

  asyncTest('fetch count: pinterest', function () {
    var el = this.elems.filter('[data-service=pinterest]');

    expect(1);

    el.on('sharefetched', function (e, count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });

    el.social('fetchShareCount');
  });

  asyncTest('fetch count: linkedin', function () {
    var el = this.elems.filter('[data-service=linkedin]');

    expect(1);

    el.on('sharefetched', function (e, count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });

    el.social('fetchShareCount');
  });

  asyncTest('fetch count: mailru', function () {
    var el = this.elems.filter('[data-service=mailru]');

    expect(1);

    el.on('sharefetched', function (e, count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });

    el.social('fetchShareCount');
  });

  asyncTest('fetch count: odnoklassniki', function () {
    var el = this.elems.filter('[data-service=odnoklassniki]');

    expect(1);

    el.on('sharefetched', function (e, count) {
      ok(true, 'share count fetched: ' + count);
      start();
    });

    el.social('fetchShareCount');
  });

}(jQuery));
