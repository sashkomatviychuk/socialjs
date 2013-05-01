/*! Social - v0.1.0 - 2013-05-01
* https://github.com/ideil/socialjs
* Copyright (c) 2013 Ideil; Licensed MIT */
;(function ($, window, document, undefined) {
  var pluginName = 'social';

  // social networks list and config
  var services = {

    facebook: {
      shareUrl: 'http://www.facebook.com/sharer.php?u={{pageUrl}}',
      countUrl: 'http://graph.facebook.com/?ids={{pageUrl}}'
    },

    twitter: {
      shareUrl: 'https://twitter.com/intent/tweet?source=tweetbutton&text={{pageUrl}}',
      countUrl: 'http://urls.api.twitter.com/1/urls/count.json?url={{pageUrl}}',
      parseResponse : function (res) {
        return res.count;
      }
    },

    vk: {
      shareUrl: 'http://vk.com/share.php?url={{pageUrl}}',
      countUrl: 'http://vk.com/share.php?act=count&format=json&index=0&url={{pageUrl}}',
      preParse: function (obj, cb) {
        window.VK = window.VK || {};
        window.VK.Share = window.VK.Share || {};
        window.VK.Share.count = function (index, count) {
          obj.shareCount = count;
          obj.$el.trigger('sharefetched', obj.shareCount);

          if (typeof cb === 'function') {
            cb(obj.shareCount);
          }

          return obj.shareCount;
        };
      }
    },

    pinterest: {
      shareUrl: 'http://pinterest.com/pinthis/?url={{pageUrl}}',
      countUrl: 'http://api.pinterest.com/v1/urls/count.json?url={{pageUrl}}',
      parseResponse : function (res) {
        return res.count;
      }
    },

    linkedin: {
      shareUrl: 'http://www.linkedin.com/sharer.php?u={{pageUrl}}',
      countUrl: 'http://www.linkedin.com/countserv/count/share?url={{pageUrl}}&format=jsonp',
      parseResponse : function (res) {
        return res.count;
      }
    },

    mailru: {
      shareUrl: 'http://connect.mail.ru/share?url={{pageUrl}}',
      countUrl: 'http://connect.mail.ru/share_count?callback=1&url_list={{pageUrl}}',
      ajaxParams: {
        jsonp: 'func'
      }
    },

    odnoklassniki: {
      shareUrl: 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl={{pageUrl}}',
      countUrl: 'http://www.odnoklassniki.ru/dk?st.cmd=extLike&ref={{pageUrl}}',
      preParse: function (obj, cb) {
        window.ODKL = window.ODKL || {};

        window.ODKL.updateCount = function (index, count) {
          obj.shareCount = parseInt(count, 10);
          obj.$el.trigger('sharefetched', obj.shareCount);

          if (typeof cb === 'function') {
            cb(obj.shareCount);
          }

          return obj.shareCount;
        };
      }
    }

  };

  var ajaxDefaults = {
    type: 'GET',
    dataType: 'jsonp'
  };

  var defaults = {
    fetchCountOnInit: false
  };

  // plugin constructor
  function Plugin(el, options) {
    this.el = el;
    this.shareCount = undefined;
    this.$el = $(el);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var target = '';

      this.service = this.$el.attr('data-service');
      this.pageUrl = this.$el.attr('data-href');

      if (this.pageUrl) {
        target = this.pageUrl;
      } else {
        target = window.location.href;
      }

      this.shareLink = services[this.service].shareUrl.replace('{{pageUrl}}', target);
      this.countLink = services[this.service].countUrl.replace('{{pageUrl}}', this.pageUrl);

      this.createLink();

      if (defaults.fetchCountOnInit) {
        this.fetchShareCount();
      }
    },

    createLink: function () {
      this.$el.attr('href', this.shareLink);
    },

    fetchShareCount: function (cb) {
      if (services[this.service].preParse) {
        services[this.service].preParse(this, cb);
      }

      this.fetchDeferredCount().success(function (res) {
        this.parseCount(res);

        this.$el.trigger('sharefetched', this.shareCount);

        if (typeof cb === 'function') {
          cb(this.shareCount);
        }
      });
    },

    fetchDeferredCount: function () {
      return $.ajax($.extend(true, {}, ajaxDefaults, services[this.service].ajaxParams, {
        url: this.countLink,
        context: this
      }));
    },

    parseCount: function (res) {
      var self = this;

      if (services[self.service].parseResponse) {
        self.shareCount = services[self.service].parseResponse(res);
      } else {
        $.each(res, function (i, url) {
          if (typeof url.shares !== 'undefined') {
            self.shareCount = url.shares;
          } else {
            self.shareCount = 0;
          }
        });
      }
    },

    getCurrentCount: function () {
      return this.shareCount;
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options, cb) {
    var thisChained = this;
    var elements = this.length;

    cb = cb || false;

    this.each(function (i) {
      var self = $.data(this, 'plugin_' + pluginName);
      if (!self) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      } else if (typeof self[options] === 'function') {
        // if starts with 'get' then we don't chain and return a value
        if (options.indexOf('get') === 0) {
          if (elements > 1) {
            if (i === 0) {
              thisChained = {};
            }
            thisChained[self.service] = self[options](cb);
          } else {
            thisChained = self[options](cb);
          }
        }

        self[options](cb);
      }
    });

    return thisChained;
  };

})(jQuery, window, document);
