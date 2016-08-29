/* JEND.cookie */
(function($) {
    if (!$ || !window.ln) return;
    // ----------------------------
    ln.namespace('ln.cookie');
    $.extend(ln.cookie, {
        getRootDomain: function() {
            var d = document.domain;
            if (d.indexOf('.') > 0 && !d.isIP()) {
                var arr = d.split('.'),
                    len = arr.length,
                    d1 = arr[len - 1],
                    d2 = arr[len - 2],
                    d3 = arr[len - 3];
                d = (d2 == 'com' || d2 == 'net') ? (d3 + '.' + d2 + '.' + d1) : (d2 + '.' + d1);
            }
            return d;
        },
        load: function() {
            var tC = document.cookie.split('; ');
            var tO = {};
            var a = null;
            for (var i = 0; i < tC.length; i++) {
                a = tC[i].split('=');
                tO[a[0]] = a[1];
            }
            return tO;
        },
        get: function(name) {
            var value = this.load()[name];
            if (value) {
                try {
                    return decodeURI(value);
                } catch(e) {
                    return unescape(value);
                }
            } else {
                return false;
            }
        },
        set: function(name, value, options) {
            options = (typeof(options) == 'object') ? options: {
                minute: options
            };
            var arg_len = arguments.length;
            var path = (arg_len > 3) ? arguments[3] : (options.path || '/');
            var domain = (arg_len > 4) ? arguments[4] : (options.domain || (options.root ? this.getRootDomain() : ''));
            var exptime = 0;
            if (options.day) {
                exptime = 1000 * 60 * 60 * 24 * options.day;
            } else if (options.hour) {
                exptime = 1000 * 60 * 60 * options.hour;
            } else if (options.minute) {
                exptime = 1000 * 60 * options.minute;
            } else if (options.second) {
                exptime = 1000 * options.second;
            }
            var exp = new Date(),
                expires = '';
            if (exptime > 0) {
                exp.setTime(exp.getTime() + exptime);
                expires = '; expires=' + exp.toGMTString();
            }
            domain = (domain) ? ('; domain=' + domain) : '';
            document.cookie = name + '=' + escape(value || '') + '; path=' + path + domain + expires;
        },
        del: function(name, options) {
            options = options || {};
            var path = '; path=' + (options.path || '/');
            var domain = (options.domain) ? ('; domain=' + options.domain) : '';
            if (options.root) domain = '; domain=' + this.getRootDomain();
            document.cookie = name + '=' + path + domain + '; expires=Thu,01-Jan-70 00:00:01 GMT';
        }
    });
})(jQuery);
