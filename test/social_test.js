(function($) {
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
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('gets external link', function() {
    expect(2);

    strictEqual(this.elems.eq(0).social().attr('href'),
      'http://www.facebook.com/sharer.php?u=http://ideil.com/',
      'href should be replaced width url from data-href');

    strictEqual(this.elems.eq(1).social().attr('href'),
      'http://connect.mail.ru/share?url=' + window.location.href,
      'href should be replaced width url from current location');
  });

}(jQuery));
