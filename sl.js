/**
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Original HTML5 slides:
 *   Marcin Wichary (mwichary)
 *
 * Modifications:
 *   Ernest Delgado (ernestd)
 *   Alex Russell (slightlyoff)
 *   Arne Roomann-Kurrik (kurrik)
 * Eric Bidelman (ericbidelman)
 */
var Util = function() {
  this.ctr_ = 0;
  this.spaces_ = /\s+/;
  this.a1_ = [''];

  this.ua = navigator.userAgent;
  this.isFF = parseFloat(this.ua.split("Firefox/")[1]) || undefined;
  this.isWK = parseFloat(this.ua.split("WebKit/")[1]) || undefined;
  this.isOpera = parseFloat(this.ua.split("Opera/")[1]) || undefined;
}

Util.prototype = {
  toArray: function(list) {
    return Array.prototype.slice.call(list || [], 0);
  },

  byId: function(id) {
    if (typeof id == "string") { return document.getElementById(id); }
    return id;
  },

  query: function(query, root) {
    if (!query) { return []; }
    if (typeof query != "string") { return this.toArray(query); }
    if (typeof root == "string"){
      root = this.byId(root);
      if(!root){ return []; }
    }

    root = root||document;
    var rootIsDoc = (root.nodeType == 9);
    var doc = rootIsDoc ? root : (root.ownerDocument||document);

    // rewrite the query to be ID rooted
    if (!rootIsDoc || (">~+".indexOf(query.charAt(0)) >= 0)) {
      root.id = root.id||("qUnique"+(this.ctr_++));
      query = "#"+root.id+" "+query;
    }
    // don't choke on something like ".yada.yada >"
    if (">~+".indexOf(query.slice(-1)) >= 0) {
      query += " *";
    }

    return this.toArray(doc.querySelectorAll(query));
  },

  strToArray: function(s) {
    if (typeof s == "string" || s instanceof String) {
      if (s.indexOf(" ") < 0) {
        this.a1_[0] = s;
        return this.a1_;
      } else {
        return s.split(this.spaces_);
      }
    }
    return s;
  },

  // TODO(ericbidelman): Most browsers support Strim.trim(). iPad does not.
  trim: function(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },

  // TODO:(ericbidelman): Use Element.classList.add() instead.
  addClass: function(node, classStr) {
    classStr = this.strToArray(classStr);
    var cls = " " + node.className + " ";
    for (var i = 0, len = classStr.length, c; i < len; ++i) {
      c = classStr[i];
      if (c && cls.indexOf(" " + c + " ") < 0) {
        cls += c + " ";
      }
    }
    node.className = this.trim(cls);
  },

  // TODO:(ericbidelman): Use Element.classList.remove() instead.
  removeClass: function(node, classStr) {
    var cls;
    if (classStr !== undefined) {
      classStr = this.strToArray(classStr);
      cls = " " + node.className + " ";
      for (var i = 0, len = classStr.length; i < len; ++i) {
        cls = cls.replace(" " + classStr[i] + " ", " ");
      }
      cls = this.trim(cls);
    } else {
      cls = "";
    }
    if (node.className != cls) {
      node.className = cls;
    }
  },

  // TODO:(ericbidelman): Use Element.classList.toggle() instead.
  toggleClass: function(node, classStr) {
    var cls = " " + node.className + " ";
    if (cls.indexOf(" " + this.trim(classStr) + " ") >= 0) {
      this.removeClass(node, classStr);
    } else {
      this.addClass(node, classStr);
    }
  }
};

var util = new Util();

var zerostep = function() {

      active_list = util.query(".build-step1", document);
      active_list.forEach(function(el) {
        util.removeClass(el, "build-step1");
      });

      active_list = util.query(".build-step2", document);
      active_list.forEach(function(el) {
        util.removeClass(el, "build-step2");
      });

      active_list = util.query(".build", document);
      active_list.forEach(function(el) {
        util.addClass(el, "build-step0");
      });
}

var firststep = function() {

      active_list = util.query(".build-step0", document);
      active_list.forEach(function(el) {
        util.removeClass(el, "build-step0");
      });

      active_list = util.query(".build-step2", document);
      active_list.forEach(function(el) {
        util.removeClass(el, "build-step2");
      });

      active_list = util.query(".build", document);
      active_list.forEach(function(el) {
        util.addClass(el, "build-step1");
      });

}

var secondstep = function() {

      active_list = util.query(".build-step0", document);
      active_list.forEach(function(el) {
        util.removeClass(el, "build-step0");
      });

      active_list = util.query(".build-step1", document);
      active_list.forEach(function(el) {
        util.removeClass(el, "build-step1");
      });

      active_list = util.query(".build", document);
      active_list.forEach(function(el) {
        util.addClass(el, "build-step2");
      });
}

var showcomment = function() {

      active_list = util.query("#disqus_thread", document);
      active_list.forEach(function(el) {
        util.addClass(el, "dsq-thread-visible");
      });
}

