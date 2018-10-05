(function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /**
   * addStyleFromObj - Adds inline-style to a given HTML Element from the given
   *  style Object.
   *
   * @param {Element} $el   The HTML Element to which the styles will be added.
   * @param {object} styleObj The object which contains the styles. Must be
   *  formatted in the format { 'property' : 'value' } where 'property' is the
   *  CSS property and 'value' is the value to which it should be set.
   *  E.g. { color : 'purple' } will set $el's color to purple.
   *
   * @returns {Element} If the given styleObj is not an object or is null or
   *  undefined, will return false. If styles are successfully added, returns the
   *  HTML Element.
   */
  function addStyleFromObj($el, styleObj) {
    if (styleObj === null || styleObj === undefined || !(_typeof(styleObj) === 'object')) {
      return false;
    }

    var styleString = '';
    Object.keys(styleObj).forEach(function (prop) {
      styleString += "".concat(prop, ": ").concat(styleObj[prop], ";");
    });
    $el.setAttribute('style', styleString);
    return $el;
  }
  /**
   * addClasses - Add classes to an HTML Element.
   *
   * @param {Element} $el  The HTML Element to which the classes will be added.
   * @param {string || Array} klasses A single string or an array of strings
   *  representing the classes to be added to $el.
   *
   * @returns {Element} The original $el with classes attached.
   */


  function addClasses($el, klasses) {
    if (!klasses) return $el;

    if (Array.isArray(klasses)) {
      klasses.forEach(function (klass) {
        if (typeof klass === 'string' && klass.length > 0) $el.classList.add(klass);
      });
    } else {
      $el.classList.add(klasses);
    }

    return $el;
  }
  /**
   * generateElement - Quickly generates an HTML element with given tagName,
   *  classes, and id.
   *
   * @param {string} [tagName=div] The tag name to use for the element.
   * @param {string|string[]}  [klasses=[]]  A single string or an array of
   *  strings representing the classes to be added to the element.
   * @param {object} [options={}] An optional object containing attributes to be
   *  added to the element. Each key must be a valid HTML attribute and the value
   *  must be a string.
   *
   * @returns {Element} The newly-created HTML element.
   */


  function generateElement() {
    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var klasses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var $el = document.createElement(tagName);
    addClasses($el, klasses);

    if (options && _typeof(options) === 'object') {
      Object.keys(options).forEach(function (attr) {
        if (attr === 'style') {
          addStyleFromObj($el, options[attr]);
        } else if (attr === 'klasses') {
          addClasses($el, options[attr]);
        } else {
          $el.setAttribute(attr, options[attr]);
        }

        return null;
      });
    }

    return $el;
  }
  /**
   * generateButton - Quickly generate a button element
   *
   * @param {string} [value=Button] Description
   * @param {array}  [klasses=[]]   Description
   * @param {string} [id=]          Description
   *
   * @returns {type} Description
   */


  function generateButton() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Button';
    var klasses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var innerHTML = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var $btn = generateElement('button', klasses, options);
    if (innerHTML) $btn.innerHTML = value;else $btn.textContent = value;
    return $btn;
  }
  /**
   * isDeletionKey - Determines whether the key in the given KeyboardEvent will
   *  delete any characters or words. Because of a peculiarity with FireFox, we
   *  must specifically test for metakeys (ctrl, shift, alt, and
   *  metaKey (Windows/Cmd)).
   *
   * @param {KeyboardEvent} event The KeyboardEvent to test.
   *
   * @returns {boolean} Returns true if the key is a deletion key, else false.
   */


  function isDeletionKey(event) {
    return event.key === 'Backspace' || event.ctrlKey && event.key === 'Backspace' || event.shiftKey && event.key === 'Backspace' || event.altKey && event.key === 'Backspace' || event.metaKey && event.key === 'Backspace' || event.key === 'Delete' || event.ctrlKey && event.key === 'Delete' || event.shiftKey && event.key === 'Delete' || event.altKey && event.key === 'Delete' || event.metaKey && event.key === 'Delete' || event.ctrlKey && event.key.toLowerCase() === 'x' || event.shiftKey && event.key.toLowerCase() === 'x' || event.altKey && event.key.toLowerCase() === 'x' || event.metaKey && event.key.toLowerCase() === 'x';
  }
  /**
   * validateURL - A very simple url validator that checks for at least one dot
   *  and for http or https. If it has a dot but no http(s), http:// will be
   *  prepended before the url is returned.
   *
   * @param {string} url The url to validate
   *
   * @returns {string || boolean} Returns the url (with http:// prepended if
  *   applicable) if url is valid. Else returns false.
   */


  function validateURL(url) {
    var returnVal;
    if (!url.includes('.')) return false;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      returnVal = "http://".concat(url);
    } else {
      returnVal = url;
    }

    return returnVal;
  }
  /**
   * findParentBlock - Finds the nearest ancestor of the given element which is
   *  of the types listed in parentTags.
   *
   * @param {Element} $el The Element of which to find an acceptable parent element.
   *
   * @returns {Element || boolean} If no Element of an acceptable type is found,
   *  or if the given $el isn't an HTML Element, will return false. Else it
   *  returns the found HTML Element.
   */


  function findParentBlock($el) {
    var blockTags = ['DIV', 'P', 'H1', 'H2'];
    var $returnEl = $el;

    while (!blockTags.includes($returnEl.tagName)) {
      $returnEl = $returnEl.parentNode;
    }

    return $returnEl;
  }
  /**
   * findNodeType - Finds a node of the given targetType. This function will
   *  first check the given node's parent, then itself, then its children. If no
   *  Element is found, the function will return false. Otherwise it will return
   *  the found Element.
   *
   * @param {Element} node    The Element to search.
   * @param {string} targetType The tagName of the target Element type.
   *
   * @returns {Element || boolean} The found HTML Element or false.
   */


  function findNodeType(node, targetType) {
    if (node.nodeName === targetType) {
      return node;
    }

    if (node.parentNode.nodeName === targetType) {
      return node.parentNode;
    }

    var returnNode = false;

    if (node.children) {
      Array.from(node.children).forEach(function (child) {
        var foundNode = findNodeType(child, targetType);

        if (foundNode) {
          returnNode = foundNode;
          return returnNode;
        }

        return false;
      });
    }

    return returnNode;
  }
  /**
   * containsSelection - Check if a given selection contains a given node. Will
   *  return true even if given node is only partially contained within the
   *  selection.
   *
   * @param {Selection} sel  The selection to test.
   * @param {Element} node   The node to check for.
   *
   * @returns {boolean} Returns true if the given node is contained, at least in
   *  part, within the given selection. Otherwise, returns false.
   */


  function containsSelection(sel, node) {
    if (!(sel instanceof Selection)) return false;
    return node.contains(sel.anchorNode) && node.contains(sel.focusNode) || sel.containsNode(node, true);
  }
  /**
   * collapseSelectionToRange - Collapses the given Selection (sel) to the end of
   *  the given Range (range).
   *
   * @param {Selection} sel  The Selection to collapse.
   * @param {Range} range    The Range to use to collapse the selection.
   *
   */


  function collapseSelectionToRange(sel, range) {
    var toStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    range.collapse(toStart);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  var tbClass = function tbClass() {
    var obj = {};
    obj.main = 'wf__toolbar';
    obj.btn = "".concat(obj.main, "__btn");
    obj.btnDisabled = "".concat(obj.btn, "-disabled");
    obj.btnActive = "".concat(obj.btn, "-active");
    obj.btnCtn = "".concat(obj.btn, "-ctn");
    obj.input = "".concat(obj.main, "__input");
    obj.inputCtn = "".concat(obj.input, "-ctn");
    obj.hideUp = "".concat(obj.main, "-hide-up");
    obj.hideDown = "".concat(obj.main, "-hide-down");
    obj.wide = "".concat(obj.main, "-wide");
    return obj;
  }();
  /*
  ######## ########  #### ##    ## ########  ##     ## ########
     ##    ##     ##  ##  ###   ## ##     ## ##     ##    ##
     ##    ##     ##  ##  ####  ## ##     ## ##     ##    ##
     ##    ########   ##  ## ## ## ########  ##     ##    ##
     ##    ##     ##  ##  ##  #### ##        ##     ##    ##
     ##    ##     ##  ##  ##   ### ##        ##     ##    ##
     ##    ########  #### ##    ## ##         #######     ##
  */

  /**
   * ToolbarInput - The text input area of the Toolbar. This base object provides
   *  text input to users, allowing them to insert things like hyperlinks and
   *  image URIs.
   *
   * @param {HTML Element} $ctn - The containing div for $input and $closeBtn.
   * @param {HTML Element} $input - The text input.
   * @param {HTML Element} $closeBtn - The button which closes the input.
   *
   */


  var ToolbarInput = {
    /**
     * init - Initializes the input by generating the requisite HTML and attaching
     *  the necessary event listeners.
     *
     * @param {HTML Element} [$ctn] - An optional container HTML element to which
     *  the input (or, more accurately, the container) will be attached.
     * @param {Function} hideCallback The function to be called when the input is
     *  hidden.
     *
     */
    init: function init(hideCallback, $outerCtn) {
      this.$ctn = generateElement('div', [tbClass.inputCtn, tbClass.hideDown]);
      this.$input = generateElement('input', tbClass.input, {
        type: 'text'
      });
      this.$closeBtn = generateButton('<b>&times;</b>', tbClass.btn, true);
      this.$ctn.appendChild(this.$input);
      this.$ctn.appendChild(this.$closeBtn);
      this.$closeBtn.addEventListener('click', this.hide.bind(this));
      this.$input.addEventListener('keypress', this.defaultEnterHandler.bind(this));
      this.hideCallback = hideCallback;
      if ($outerCtn && $outerCtn instanceof HTMLElement) this.appendTo($outerCtn);
    },

    /**
     * defaultEnterHandler - The function to be called when the user presses enter
     *  while typing in the input. When the user presses 'Enter' in the input
     *  field, this function will call the current saveHandler, always passing in
     *  the value of the input and the value assigned to this.currentRange. It is
     *  assumed that the value will always be required by the saveHandler and
     *  that, since it is hidden while the input is focused, so will the current
     *  range.
     *
     * @param {Event} e The Event to listen for.
     *
     */
    defaultEnterHandler: function defaultEnterHandler(e) {
      if (e.key === 'Enter') {
        if (this.saveHandler && typeof this.saveHandler === 'function') {
          this.saveHandler.call(this, this.$input.value, this.currentRange);
        }

        if (!this.preventHideOnEnter) {
          this.hide();
        }
      }
    },

    /**
     * setSaveHandler - Sets the saveHandler for the input to the given
     *  saveHandler function.
     *
     * @param {function} saveHandler The function to be called when the user saves
     *  (presses Enter) on the input.
     *
     */
    setSaveHandler: function setSaveHandler(saveHandler) {
      if (saveHandler && typeof saveHandler === 'function') {
        this.saveHandler = saveHandler;
      }
    },

    /**
     * clearSaveHandler - Sets the saveHandler to null.
     *
     */
    clearSaveHandler: function clearSaveHandler() {
      this.saveHandler = null;
    },

    /**
     * getValue - Get the value of the input.
     *
     * @returns {string} The value of the $input.
     */
    getValue: function getValue() {
      return this.$input.value;
    },

    /**
     * display - Displays the input by removing hiding class from the input
     *  container and placing the focus in the input. Will also accept an optional
     *  placeholder which will be placed on the input.
     *
     * @param {string} [placeholder=''] An optional string which will be set as
     *  the placeholder on the input.
     *
     */
    display: function display() {
      var placeholder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.$input.placeholder = placeholder;
      this.$ctn.classList.remove(tbClass.hideDown); // put focus in the input. Must timeout due to animations.

      var sel = window.getSelection();
      this.currentRange = sel.getRangeAt(0);
      var range = document.createRange();
      range.selectNode(this.$input);

      function focusInput() {
        this.$input.focus();
      }

      setTimeout(focusInput.bind(this), 200);
    },

    /**
     * clear - Clears the input.If a new placeholder is provided, will set the
     *  input's placeholder to that.
     *
     * @param {string} [newPlaceholder] The new placeholder to be put on the
     *  input.
     *
     */
    clear: function clear(newPlaceholder) {
      this.$input.value = '';

      if (newPlaceholder) {
        this.$input.placeholder = newPlaceholder;
      }
    },

    /**
     * hide - Hides the input container and calls the saved hideCallback function.
     *
     */
    hide: function hide() {
      var useCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      // debugger;
      if (this.$ctn.classList.contains(tbClass.hideDown)) return false;
      this.$ctn.classList.add(tbClass.hideDown);
      this.$input.value = '';
      this.clearSaveHandler();

      if (this.currentRange) {
        var sel = window.getSelection();
        var range = sel.getRangeAt(0);
        sel.removeRange(range);
        sel.addRange(this.currentRange);
      }

      if (useCallback && this.hideCallback && typeof this.hideCallback === 'function') {
        this.hideCallback();
      }

      return true;
    },

    /**
     * html - Return the HTML for the input container.
     *
     */
    html: function html() {
      return this.$ctn;
    },

    /**
     * getWidth - Returns the width of the input container.
     *
     * @returns {number} The width of the input container.
     */
    getWidth: function getWidth() {
      var boundingRect = this.$ctn.getBoundingClientRect();
      return boundingRect.width;
    },

    /**
     * getWidth - Returns the height of the input container.
     *
     * @returns {number} The height of the input container.
     */
    getHeight: function getHeight() {
      var boundingRect = this.$ctn.getBoundingClientRect();
      return boundingRect.height;
    },

    /**
     * appendTo - Appends the input to the given HTML Element.
     *
     * @param {Element} $where The HTML Element to which the input will be
     *  appended
     *
     * @returns {Element} The $where HTML Element.
     */
    appendTo: function appendTo($where) {
      $where.appendChild(this.html());
      return $where;
    }
  }; // The number of pixels by which to offset the top of the toolbar.

  var toolbarOffset = 5;
  /**
   * Toolbar - The toolbar used for editing text in the WFEditor.
   *
   * @property {Element} $ctn - The div containing the toolbar. This div is
   *  created in the initToolbar method.
   * @property {Element} $boldBtn - When clicked, bolds current selection.
   * @property {Element} $italicBtn - When clicked, italicizes current selection.
   * @property {Element} $headingBtn - When clicked, changes the section of the
   *  current selection to a heading (h3).
   * @property {Element} linkBtn - When clicked, presents a box for inserting a
   *  URL, then uses that URL to turn current selection into a hyperlink.
   */

  var BaseToolbar = {
    /**
     * initToolbar - Initializes the Toolbar.
     *
     * @param {Editor} editor The Editor which owns this Toolbar.
     * @param {Object} options The initialization options provided by the user.
     *
     * @returns {Toolbar} Returns this.
     */
    initToolbar: function initToolbar(editor, options) {
      this.options = options;
      this.editor = editor;
      this.toolbarOffset = toolbarOffset;
      this.$ctn = generateElement('div', [tbClass.main, 'hide'], {
        contenteditable: false
      });
      this.$btnCtn = generateElement('div', tbClass.btnCtn);
      this.$ctn.appendChild(this.$btnCtn); // this.createToolbarBtns();

      this.input = Object.create(ToolbarInput);
      this.editor.$ctn.appendChild(this.$ctn);
      return this;
    },

    /**
     * getButtonsWidth - Returns the width of the button container.
     *
     * @returns {number} The width of the button container.
     */
    getButtonsWidth: function getButtonsWidth() {
      var childNodes = this.$btnCtn.children;
      var boundingRect = childNodes[0].getBoundingClientRect();
      return boundingRect.width * (childNodes.length * 1.1);
    },

    /**
     * getButtonsWidth - Returns the height of the button container.
     *
     * @returns {number} The height of the button container.
     */
    getButtonsHeight: function getButtonsHeight() {
      var boundingRect = this.$btnCtn.firstChild.getBoundingClientRect();
      return boundingRect.height * 1.25;
    },

    /**
     * hideButtons - Hides the buttons contained within the Toolbar so the input
     *  can be displayed.
     *
     */
    hideButtons: function hideButtons() {
      this.$ctn.style.width = "".concat(this.input.getWidth(), "px");
      this.$ctn.style.height = "".concat(this.input.getHeight(), "px");
      this.$btnCtn.classList.add(tbClass.hideUp);
    },

    /**
     * displayButtons - Displays the buttons in the Toolbar.
     *
     */
    displayButtons: function displayButtons() {
      this.$btnCtn.classList.remove(tbClass.hideUp);
      this.$ctn.style.width = "".concat(this.getButtonsWidth(), "px");
      this.$ctn.style.height = "".concat(this.getButtonsHeight(), "px");
    },
    displayInput: function displayInput(placeholder) {
      var sel = window.getSelection();
      this.currentRange = sel.getRangeAt(0);
      this.input.display(placeholder);
    },
    hideInput: function hideInput() {},

    /**
    * positionToolbar - Positions the Toolbar at the appropriate place based on
    *  the current range.
    *
    */
    positionToolbar: function positionToolbar() {
      var sel = window.getSelection();
      this.currentRange = sel.getRangeAt(0);
      var rect = null;

      if (this.currentRange.collapsed) {
        rect = this.currentRange.commonAncestorContainer.getBoundingClientRect();
      } else {
        rect = this.currentRange.getBoundingClientRect();
      }

      var toolbarRect = this.$ctn.getBoundingClientRect();
      var bottomPos = rect.bottom + this.toolbarOffset + toolbarRect.height;

      if (bottomPos >= window.innerHeight) {
        this.$ctn.style.top = "".concat(rect.top - (this.toolbarOffset + toolbarRect.height), "px");
      } else {
        this.$ctn.style.top = "".concat(rect.bottom + this.toolbarOffset, "px");
      }

      this.$ctn.style.left = "".concat(rect.left, "px");
    },

    /**
     * display - Optionally display the Toolbar next to the given selection.
     *  The Toolbar is always returned as an HTML element.
     *
     * @param {Selection} [sel=null] The Selection next to which the Toolbar should be
     *  displayed.
     *
     * @returns {boolean} Returns true if the Toolbar is displayed. Else false.
     */
    baseDisplay: function baseDisplay() {
      this.input.hide(false);
      this.$ctn.classList.remove('hide');
      this.positionToolbar();
      this.displayButtons();
      return true;
    },

    /**
     * hide - Hides the Toolbar.
     *
     * @returns {boolean} Returns true if successful else false.
     */
    hide: function hide() {
      this.currentRange = null;
      this.input.hide(false);
      this.displayButtons();
      this.$ctn.classList.add('hide');

      if (this.$ctn.classList.contains('hide')) {
        return true;
      }

      return false;
    },

    /**
     * html - Render the Toolbar as HTML
     *
     * @returns {Element} The Toolbar as HTML.
     */
    html: function html() {
      return this.$ctn;
    },
    contains: function contains(node) {
      return this.$ctn.contains(node);
    }
  };
  /*
  ######## ########  ########  ##     ## ######## ########  #######  ##    ##
     ##    ##     ## ##     ## ##     ##    ##       ##    ##     ## ###   ##
     ##    ##     ## ##     ## ##     ##    ##       ##    ##     ## ####  ##
     ##    ########  ########  ##     ##    ##       ##    ##     ## ## ## ##
     ##    ##     ## ##     ## ##     ##    ##       ##    ##     ## ##  ####
     ##    ##     ## ##     ## ##     ##    ##       ##    ##     ## ##   ###
     ##    ########  ########   #######     ##       ##     #######  ##    ##
  */

  /**
  * ToolbarButton - A button to be used in the Toolbar. This base object provides
  *  a convenient set of methods for creating, attaching event listeners to, and
  *  changing the appearance of buttons on the Toolbar.
  *
  */

  var ToolbarButton = {
    /**
     * init - Initializes the button by creating the requisite HTML (using the
     *  given content), attaching the given clickHandler, and, if ctn is provided,
     *  attaching the html to the given container Element.
     *
     * @param {HTML string || string} content The content which will be placed in
     *  the button. This can be either a simple string or a string containing
     *  HTML.
     * @param {Function} clickHandler The function to be attached to the button's
     *  HTML to be called when the button is clicked.
     * @param {HTML Element (opt)} $ctn The optional containing HTML Element.
     *
     * @returns {ToolbarButton} Returns this ToolbarButton.
     */
    init: function init(content, title, handler, $ctn) {
      this.$html = generateButton(content, tbClass.btn, true, {
        title: title
      });
      this.setSaveHandler(handler);
      this.appendTo($ctn);
      return this;
    },

    /**
     * setSaveHandler - Sets the clickHandler to the given function.
     *
     * @param {Function} saveHandler The function to call on each click.
     *
     * @returns {Function || null} Returns null if the given saveHandler is not a
     *  Function. Otherwise it returns the Function.
     */
    setSaveHandler: function setSaveHandler(saveHandler) {
      if (typeof saveHandler !== 'function') {
        return null;
      }

      if (this.clickHandler) {
        this.$html.removeEventListener('click', this.clickHandler);
      }

      this.saveHandler = saveHandler;
      this.$html.addEventListener('click', this.saveHandler);
      return this.saveHandler;
    },

    /**
     * addClass - Adds a class or multiple classes to the button's html.
     *
     * @param {array || string} [klasses] The class(es) to be added to the button.
     *  Can either be an array of strings or a single string.
     *
     */
    addClass: function addClass() {
      var _this = this;

      var klasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (Array.isArray(klasses)) {
        klasses.forEach(function (klass) {
          _this.$html.classList.add(klass);
        });
      } else {
        this.$html.classList.add(klasses);
      }
    },

    /**
     * removeClass - Removes a class or multiple classes from the button's html.
     *
     * @param {array || string} [klasses] The class(es) to be removed from the
     *  button. Can either be an array of strings or a single string.
     *
     */
    removeClass: function removeClass() {
      var _this2 = this;

      var klasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (Array.isArray(klasses)) {
        klasses.forEach(function (klass) {
          _this2.$html.classList.remove(klass);
        });
      } else {
        this.$html.classList.remove(klasses);
      }
    },

    /**
     * disable - Disables the button. Sets the disabled attribute to true and adds
     *  the disabled class to the button.
     *
     */
    disable: function disable() {
      this.$html.disabled = true;
      this.addClass(tbClass.btnDisabled);
    },

    /**
     * enable - Enables the button. Sets the disabled attribute to false and
     *  removes the disabled class from the button.
     *
     */
    enable: function enable() {
      this.$html.disabled = false;
      this.removeClass(tbClass.btnDisabled);
    },

    /**
     * markActive - Marks the button as currently active. Simply adds the active
     *  class to the button.
     *
     */
    markActive: function markActive() {
      this.$html.classList.add(tbClass.btnActive);
    },

    /**
     * markInactive - Marks the button as currently inactive. Simply removes the
     *  active class from the button.
     *
     */
    markInactive: function markInactive() {
      this.$html.classList.remove(tbClass.btnActive);
    },

    /**
     * html - Returns the button in HTML form.
     *
     * @returns {Element} The button in HTML form.
     */
    html: function html() {
      return this.$html;
    },

    /**
     * appendTo - Appends the button HTML Element to the given container.
     *
     * @param {Element} $ctn The HTML Element to which the button should be
     *  appended.
     *
     */
    appendTo: function appendTo($ctn) {
      if ($ctn && $ctn instanceof HTMLElement) {
        $ctn.appendChild(this.html());
      }
    }
  }; // Create the EditToolbar from the BaseToolbar.

  var editToolbar = Object.create(BaseToolbar);
  /**
   * init - Initialize the EditToolbar. Callse the BaseToolbar's initialization
   *  method then sets up the requisite buttons and input.
   *
   * @param {Editor} editor The Editor which owns this Toolbar.
   * @param {Object} options The initialization options provided by the user.
   *
   * @returns {EditToolbar} Returns this.
   */

  editToolbar.init = function init(editor, options) {
    this.initToolbar(editor, options);
    this.input.init(this.displayButtons.bind(this), this.$ctn);
    this.createToolbarBtns();
    return this;
  };
  /**
   * createToolbarBtns - Create the buttons to be included on the toolbar, add
   *  appropriate event listeners, and attaches them to the $ctn.
   */


  editToolbar.createToolbarBtns = function createToolbarBtns() {
    this.boldBtn = Object.create(ToolbarButton);
    this.boldBtn.init('<b>B</b>', 'Bold Selection', this.editor.boldSelection.bind(this.editor), this.$btnCtn);
    this.italicBtn = Object.create(ToolbarButton);
    this.italicBtn.init('<i>i</i>', 'Italicize Selection', this.editor.italicizeSelection.bind(this.editor), this.$btnCtn);
    this.headingBtn = Object.create(ToolbarButton);
    this.headingBtn.init('H', 'Wrap Selection with Heading', this.editor.wrapHeading.bind(this.editor), this.$btnCtn);
    this.linkBtn = Object.create(ToolbarButton);
    this.linkBtn.init('🔗', 'Wrap Selection with Link', this.linkBtnHandler.bind(this), this.$btnCtn);
  };
  /**
   * toggleDisabledButtons - Disables buttons as necessary. As of now, if a the
   *  current selection contains a heading, all buttons other than the heading
   *  button are disabled.
   *
   * @param {Range} range The current range.
   *
   */


  editToolbar.toggleDisabledButtons = function toggleDisabledButtons() {
    if (findNodeType(this.currentRange.commonAncestorContainer, 'H1') || findNodeType(this.currentRange.commonAncestorContainer, 'H2')) {
      this.linkBtn.disable();
      this.boldBtn.disable();
      this.italicBtn.disable();
    } else {
      this.linkBtn.enable();
      this.boldBtn.enable();
      this.italicBtn.enable();
    }
  };
  /**
   * toggleActiveLink - If ads the active class to the link button if the
   *  current selection contains a link. It also attaches a currentLink
   *  attribute to the link button so the link can be removed.
   *
   * @param {Selection} sel The current selection.
   *
   */


  editToolbar.toggleActiveLink = function toggleActiveLink(sel) {
    var range = sel.getRangeAt(0);
    var currentLink = findNodeType(range.commonAncestorContainer, 'A');

    if (currentLink && sel.containsNode(currentLink, true)) {
      this.linkBtn.markActive();
      this.linkBtn.currentLink = currentLink;
    } else {
      this.linkBtn.currentLink = null;
      this.linkBtn.markInactive();
    }
  };
  /**
   * linkBtnHandler - Handler for when $linkBtn is clicked.
   *
   * @returns {boolean} Returns true if successful else false.
   */


  editToolbar.linkBtnHandler = function linkBtnHandler() {
    if (this.linkBtn.currentLink) {
      this.editor.removeLink(this.linkBtn.currentLink);
      this.linkBtn.currentLink = null;
      this.linkBtn.markInactive();
    } else {
      this.input.setSaveHandler(this.editor.wrapLink);
      this.hideButtons();
      this.input.display('Type a link...');
    }
  };
  /**
   * display - Displays the EditToolbar.
   *
   * @param {Selection} [sel=null] The selection next to which the toolbar should
   *  be displayed.
   *
   * @returns {boolean} Returns true if the EditToolbar is displayed. Else false.
   */


  editToolbar.display = function display() {
    var sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (!(sel instanceof Selection)) return false;
    if (containsSelection(sel, this.$ctn)) return false;
    this.currentRange = sel.getRangeAt(0);
    this.toggleActiveLink(sel);
    this.toggleDisabledButtons();
    return this.baseDisplay();
  }; // Create the InsertToolbar from the BaseToolbar.


  var insertToolbar = Object.create(BaseToolbar);
  /**
   * init - Initialize the insertToolbar. Callse the BaseToolbar's initialization
   *  method then sets up the requisite buttons and input.
   *
   * @param {Editor} editor The Editor which owns this Toolbar.
   * @param {Object} options The initialization options provided by the user.
   *
   * @returns {InsertToolbar} Returns this.
   */

  insertToolbar.init = function init(editor, options) {
    this.initToolbar(editor, options);
    this.toolbarOffset = 15;
    this.createToolbarBtns();
    this.input.init(this.hideImageInput.bind(this), this.$ctn);
    this.input.$input.id = 'input';
    return this;
  };
  /**
   * createToolbarBtns - Creates the requisite buttons for this toolbar. The
   *  insertToolbar allows users to insert images and horizontal rules so this
   *  method creates buttons to allow the user to do these things.
   *
   */


  insertToolbar.createToolbarBtns = function createToolbarBtns() {
    this.imgBtn = Object.create(ToolbarButton);
    this.imgBtn.init('🖼️', 'Insert an Image', this.displayImgInput.bind(this), this.$btnCtn);
    this.lineBtn = Object.create(ToolbarButton);
    this.lineBtn.init('--', 'Insert a Horizontal Rule', this.editor.insertLine.bind(this.editor), this.$btnCtn);
  };
  /**
   * toggleDisabledButtons - Toggles the disabled buttons. If the user is
   *  currently in the first section, they cannot add a horizontal rule.
   *
   */


  insertToolbar.toggleDisabledButtons = function toggleDisabledButtons() {
    var sel = window.getSelection();

    if (this.editor.isFirst(sel.anchorNode)) {
      this.lineBtn.disable();
    } else {
      this.lineBtn.enable();
    }
  };
  /**
   * displayImgInput - Displays the input for adding an image.
   *
   */


  insertToolbar.displayImgInput = function displayImgInput() {
    var sel = window.getSelection();
    this.currentRange = sel.getRangeAt(0);
    this.input.setSaveHandler(this.insertImage.bind(this));
    this.input.preventHideOnEnter = true;
    this.hideButtons();
    this.input.display('Type an image URL...');
  };
  /**
   * hideImageInput - Hides the input for adding an image.
   *
   */


  insertToolbar.hideImageInput = function hideImageInput() {
    this.imgURL = null;
    this.displayButtons();
  };
  /**
   * insertImage - This function acts as the saveHandler for the image input. The
   *  input first prompts the user to provide a url, then alt text. If the user
   *  has not yet provided the image url, it will take the value from the input
   *  and store it as the image url, prompting the user for the alt text. Once
   *  this has been provided, the function passes control to the editor and closes
   *  itself.
   *
   */


  insertToolbar.insertImage = function insertImage() {
    if (!this.imgURL) {
      this.imgURL = validateURL(this.input.getValue());

      if (!this.imgURL) {
        this.input.clear('Type an image URL...');
      } else {
        this.input.clear('Enter alt text...');
      }
    } else {
      this.editor.insertImage(this.imgURL, this.input.getValue(), this.currentRange.startContainer);
      this.input.hide();
      this.displayButtons();
      this.hide();
    }
  };
  /**
   * display - Displays the InsertToolbar.
   *
   * @returns {boolean} Returns true if the InsertToolbar was successfully
   *  displayed. Else returns false.
   */


  insertToolbar.display = function display() {
    this.toggleDisabledButtons();
    return this.baseDisplay();
  };
  /*
  ########  ######## ########    ###    ##     ## ##       ########
  ##     ## ##       ##         ## ##   ##     ## ##          ##
  ##     ## ##       ##        ##   ##  ##     ## ##          ##
  ##     ## ######   ######   ##     ## ##     ## ##          ##
  ##     ## ##       ##       ######### ##     ## ##          ##
  ##     ## ##       ##       ##     ## ##     ## ##          ##
  ########  ######## ##       ##     ##  #######  ########    ##
  */

  /**
  * Editor - The main object representing the WriteFree editor.
  *
  * @property {Element} $ctn - The outermost container of the WriteFree editor.
  *  $ctn is passed in to the WriteFree instantiation function.
  * @property {Element} $innerCtn - The actual contetneditable-div in which the
  *  user can write
  */


  var editorBase = {
    /**
     * initWFEditor - Initializes the Editor. Creates an inner container div and
     *  fills it with a line break (done to ensure the first block of text is
     *  wrapped in a div); initializes the Toolbar; and adds the pasteHandler.
     *
     * @returns {Editor} Returns this.
     */
    initWFEditor: function initWFEditor($ctn, options) {
      this.$ctn = $ctn;
      this.options = options;
      this.generateClasses();
      document.execCommand('defaultParagraphSeparator', false, this.options.divOrPar);
      this.$innerCtn = generateElement('div', this.classes.main, {
        style: this.options.containerStyle
      });
      this.$innerCtn.setAttribute('contenteditable', true);
      this.$ctn.append(this.$innerCtn);
      this.createFirstTextSection();
      this.editToolbar = editToolbar.init(this, this.options);
      this.insertToolbar = insertToolbar.init(this, this.options);
      this.$ctn.addEventListener('paste', this.pasteHandler.bind(this));
      this.$ctn.addEventListener('keydown', this.keydownHandler.bind(this));
      this.$ctn.addEventListener('keyup', this.keyupHandler.bind(this));
      this.$ctn.addEventListener('click', this.checkForInsert.bind(this));
      this.$ctn.addEventListener('mouseup', this.positionCursor.bind(this)); // must be added to document because of browsers.

      document.addEventListener('selectionchange', this.selectionHandler.bind(this));
      document.addEventListener('scroll', this.insertToolbar.hide.bind(this.insertToolbar));
      return this;
    },
    generateClasses: function generateClasses() {
      this.classes = {};
      this.innerCtnClass = 'wf__editor';
      this.classes.main = [this.innerCtnClass];

      if (this.options.containerClass !== 'wf__edtior') {
        this.classes.main.push(this.options.containerClass);
      }

      this.classes.textSection = 'wf__text-section';
      this.classes.containerSection = 'wf__container-section';
      return this.classes;
    },

    /*
     ######  ########  ######  ######## ####  #######  ##    ##  ######
    ##    ## ##       ##    ##    ##     ##  ##     ## ###   ## ##    ##
    ##       ##       ##          ##     ##  ##     ## ####  ## ##
     ######  ######   ##          ##     ##  ##     ## ## ## ##  ######
          ## ##       ##          ##     ##  ##     ## ##  ####       ##
    ##    ## ##       ##    ##    ##     ##  ##     ## ##   ### ##    ##
     ######  ########  ######     ##    ####  #######  ##    ##  ######
    */

    /**
     * createFirstTextSection - The editor must have the a first div in order to ensure
     *  proper formatting. This method creates the first div and appends it to
     *  the inner container.
     */
    createFirstTextSection: function createFirstTextSection() {
      if (!this.$firstSection) {
        this.$firstSection = this.createTextSection();
      }

      this.$firstSection.textContent = '';
      this.$innerCtn.insertBefore(this.$firstSection, this.$innerCtn.firstChild);
      var sel = window.getSelection();
      var range = document.createRange();
      range.setStart(this.$firstSection, 0);
      range.setEnd(this.$firstSection, 0);
      sel.removeAllRanges();
      sel.addRange(range);
      window.first = this.$firstSection;
      return this.$firstSection;
    },

    /**
     * displayFirstSectionPlaceholder - Checks if current section is the first textSection
     *  and, if so, ensures the section is completely empty. This ensures that the
     *  placeholder is properly displayed.
     *
     */
    displayFirstSectionPlaceholder: function displayFirstSectionPlaceholder() {
      var sel = window.getSelection();

      if (sel.isCollapsed && this.isFirst(sel.anchorNode) && sel.anchorNode.classList.contains(this.classes.textSection) && sel.anchorNode.textContent === '') {
        sel.anchorNode.innerHTML = '';
      }
    },

    /**
     * createTextSection - Creates a standard text section.
     *
     * @returns {Element} The newly-created text section.
     */
    createTextSection: function createTextSection() {
      if (!Array.isArray(this.options.sectionClass)) {
        this.options.sectionClass = Array(this.options.sectionClass);
      }

      if (!this.options.sectionClass.includes(this.classes.textSection)) {
        this.options.sectionClass.push(this.classes.textSection);
      }

      var parOptions = {
        style: this.options.sectionStyle,
        klasses: this.options.sectionClass
      };
      return generateElement(this.options.divOrPar, [], parOptions);
    },

    /**
     * createContainerSection - Creates a container div to house any inline objects the
     *  user inserts (img, hr). These are used in order to separate sections in which the
     *  user can type and those in which they cannot.
     *
     * @param {Element} [childNode] If provided, childNode will be attached to the newly-
     *  created container.
     *
     * @returns {Element} Returns the newly-created container.
     */
    createContainerSection: function createContainerSection(childNode) {
      var style = this.options.sectionStyle;
      var container = generateElement('div', this.classes.containerSection, {
        style: style
      });

      if (childNode && childNode instanceof Element) {
        container.appendChild(childNode);
      }

      return container;
    },

    /**
     * normalizeSection - Normalizes the current section (div or p) in order to
     *  join all separate text nodes. Text nodes end up split when starting
     *  newlines and trying to rejoin sections and so must be normalized.
     *
     * @returns {null} Returns null.
     */
    normalizeSection: function normalizeSection() {
      var sel = window.getSelection();

      try {
        var range = sel.getRangeAt(0);
        var startParent = findParentBlock(sel.anchorNode);
        var endParent = findParentBlock(sel.focusNode);
        if (startParent) startParent.normalize();
        if (endParent) endParent.normalize();
        if (range.commonAncestorContainer) range.commonAncestorContainer.normalize();
      } catch (exception) {
        return null;
      }

      return null;
    },

    /**
     * deleteContainerSection - Deletes an entire container section. Used when the
     *  user is at the beginning or end of a text section and press backspace or
     *  the delete key (passed in as 'key'). Prevents user from entering the
     *  container section unwittingly.
     *
     * @param {KeybaordEvent} e The Event to use to determine which key was
     *  pressed. e.key must be 'Backspace' or 'Delete'. If 'Backspace', this
     *  method will delete the previous section. If 'Delete', this method will
     *  delete the next container section.
     *
     * @returns {boolean} Returns true if the
     */
    deleteContainerSection: function deleteContainerSection(e) {
      var sel = window.getSelection();
      var section = findParentBlock(sel.anchorNode);
      var nextSection = null;

      if (e.key === 'Backspace') {
        nextSection = section.previousSibling;
      } else if (e.key === 'Delete') {
        nextSection = section.nextSibling;
      }

      if (nextSection && nextSection.classList.contains(this.classes.containerSection)) {
        e.preventDefault();
        nextSection.parentNode.removeChild(nextSection);
      }

      return false;
    },

    /**
     * preventTextInContainer - Prevents the user from typing in container
     *  sections. If a user tries to type in a container section, the next text
     *  section is automatically selected or, if none is present, a new one is
     *  created immediately after the container section. Up and left arrow keys
     *  move the cursor to the previous section and right and down arrow keys move
     *  the cursor to the next section.
     *
     */
    preventTextInContainer: function preventTextInContainer(e) {
      var sel = window.getSelection();
      var section = findParentBlock(sel.anchorNode);

      if (section.classList.contains(this.classes.containerSection)) {
        var newSection = section.nextSibling;

        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          newSection = section.previousSibling;
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          newSection = section.nextSibling;
        } else if (!newSection || newSection.classList.contains(this.classes.containerSection) || newSection.classList.contains(this.classes.textSection) && newSection.textContent.length > 0) {
          newSection = this.createTextSection();
          this.$innerCtn.insertBefore(newSection, section.nextSibling);
        }

        e.preventDefault();
        sel.collapse(newSection, 0);
      }
    },

    /*
    ######## ########  #### ######## #### ##    ##  ######
    ##       ##     ##  ##     ##     ##  ###   ## ##    ##
    ##       ##     ##  ##     ##     ##  ####  ## ##
    ######   ##     ##  ##     ##     ##  ## ## ## ##   ####
    ##       ##     ##  ##     ##     ##  ##  #### ##    ##
    ##       ##     ##  ##     ##     ##  ##   ### ##    ##
    ######## ########  ####    ##    #### ##    ##  ######
    */

    /**
     * boldSelection - Bolds the current selection.
     *
     */
    boldSelection: function boldSelection() {
      var sel = window.getSelection();

      if (sel instanceof Selection) {
        document.execCommand('bold', false);
      }
    },

    /**
     * linkBtnHandler - Italicizes the current selection.
     *
     */
    italicizeSelection: function italicizeSelection() {
      var sel = window.getSelection();

      if (sel instanceof Selection) {
        document.execCommand('italic', false);
      }
    },

    /**
     * wrapHeading - Wrap the current selection in a heading element or removes
     *  current heading element. Wraps non-headings in H1 if the current
     *  selection is the first element in the Editor otherwise uses H2. Removes
     *  all children HTML elements, leavining only text.
     *
     * @returns {boolean} Returns true if successful else false.
     */
    wrapHeading: function wrapHeading() {
      var sel = window.getSelection();
      var parentnode = findParentBlock(sel.anchorNode);
      parentnode.innerHTML = parentnode.innerHTML.replace(/<[^>]+>/g, '');
      var tagName;
      var klass;
      var style;

      if (sel instanceof Selection) {
        // debugger;
        if (parentnode.tagName === 'H2') {
          tagName = this.options.divOrPar;
          klass = this.options.sectionClass;
          style = this.options.sectionStyle;
        } else if (parentnode.tagName === 'DIV' || parentnode.tagName === 'P') {
          tagName = 'h1';
          klass = this.options.largeHeadingClass;
          style = this.options.largeHeadingStyle;
        } else {
          tagName = 'h2';
          klass = this.options.smallHeadingClass;
          style = this.options.smallHeadingStyle;
        }

        var successful = document.execCommand('formatBlock', false, tagName);

        if (successful) {
          parentnode = findParentBlock(sel.anchorNode);
          addStyleFromObj(parentnode, style);
          addClasses(parentnode, klass);
          var range = sel.getRangeAt(0);
          range.selectNode(sel.focusNode);
          range.collapse();
        }

        return successful;
      }

      return false;
    },

    /**
     * wrapLink - wraps the given range (currentRange) with a link node pointing
     *  to the given URL (rawURL). This method first validates the URL, throwing
     *  it out if it isn't properly formatting. It will insert the http protocol
     *  if at the beginning of the string if it doesn't contain it.
     *
     * @param {string} rawURL      A string containing the URL to which the link
     *  will point.
     * @param {Range} currentRange The Range around which the link will be
     *  wrapped.
     *
     * @returns {Element || boolean} Will return the new link if successful, else
     *  returns false.
     */
    wrapLink: function wrapLink(rawURL, currentRange) {
      var url = validateURL(rawURL);
      if (!url) return false;
      var link = generateElement('a');
      link.href = url;
      currentRange.surroundContents(link);
      collapseSelectionToRange(window.getSelection(), currentRange);
      return link;
    },

    /**
     * removeLink - Replaces the given link node with a text node containing the
     *  link's text content.
     *
     * @param {Element} $link The linnk to remove.
     *
     */
    removeLink: function removeLink($link) {
      var sel = window.getSelection();
      this.currentRange = sel.getRangeAt(0);
      var range = document.createRange();
      range.selectNode($link);
      var plainText = document.createTextNode($link.textContent);
      range.deleteContents();
      range.insertNode(plainText);
      collapseSelectionToRange(sel, range);
    },

    /**
     * insertImage - Inserts an image into the editor. Must be provided src, alt
     *  and nextSibling in order to properly render.
     *
     * @param {string} src          The string to use for the img's src attribute.
     * @param {string} alt          The string to use for the img's alt attribute.
     * @param {Element} nextSibling The HTML Element before which the image will
     *  be inserted.
     *
     * TODO: Get rid of alert. Build out a simple messaging system for users.
     */
    insertImage: function insertImage(src, alt, nextSibling) {
      if (nextSibling.innerHTML.length === 0) {
        nextSibling.append(document.createElement('br'));
      }

      var sel = window.getSelection();
      var img = generateElement('img', this.options.imgClass, {
        src: src,
        alt: alt,
        style: this.options.imgStyle
      });
      var section = this.createContainerSection();
      img.section = section;

      img.onerror = function onImageError() {
        img.section.parentNode.removeChild(img.section);
        alert('Image failed to load.');
      };

      if (nextSibling === this.$firstSection) {
        this.$firstSection = section;
      }

      section.appendChild(img);
      nextSibling.parentNode.insertBefore(section, nextSibling);
      var range = document.createRange();
      range.selectNodeContents(nextSibling); // debugger;

      collapseSelectionToRange(sel, range, true);
    },

    /**
     * insertLine - Inserts a line in the editor directly before the current
     *  position of the selection cursor.
     *
     */
    insertLine: function insertLine() {
      var sel = window.getSelection();
      var range = sel.getRangeAt(0);
      var nextSibling = findParentBlock(range.startContainer);
      if (nextSibling === this.$firstSection) return false;
      var line = document.createElement('hr');
      var section = this.createContainerSection();
      section.appendChild(line);
      nextSibling.parentNode.insertBefore(section, nextSibling);
      range = document.createRange();
      range.selectNodeContents(nextSibling);
      collapseSelectionToRange(sel, range, true);
      this.insertToolbar.hide();
      return true;
    },

    /*
    ##     ##    ###    ##    ## ########  ##       ######## ########   ######
    ##     ##   ## ##   ###   ## ##     ## ##       ##       ##     ## ##    ##
    ##     ##  ##   ##  ####  ## ##     ## ##       ##       ##     ## ##
    ######### ##     ## ## ## ## ##     ## ##       ######   ########   ######
    ##     ## ######### ##  #### ##     ## ##       ##       ##   ##         ##
    ##     ## ##     ## ##   ### ##     ## ##       ##       ##    ##  ##    ##
    ##     ## ##     ## ##    ## ########  ######## ######## ##     ##  ######
    */

    /**
     * selectionHandler - Handles the given Selection (sel) event. If the given
     *  object is not a Selection this method will immediately return false.
     *  Otherwise it will display the Toolbar if the Selection is contained
     *  fully within this Editor and the Selection contains text. Otherwise it
     *  will hide the Toolbar.
     *
     *
     * @param {Event} e The selectionchange event.
     *
     * @returns {boolean} Returns true if the given selection was successfully
     *  handled, else false.
     */
    selectionHandler: function selectionHandler(e) {
      if (e.type !== 'selectionchange') return false;
      var sel = window.getSelection();

      if (containsSelection(sel, this.$ctn) && !sel.isCollapsed || containsSelection(sel, this.editToolbar.html())) {
        this.editToolbar.display(sel);
      } else {
        this.editToolbar.hide();
      }

      return true;
    },

    /**
     * pasteHandler - Handles the paste event in the editor. We intercept the
     *  normal paste event and strip all HTML from the copied text and then
     *  insert it as HTML. This is done to ensure that each paste is essentially
     *  a 'paste as plain text.' We use 'insertHTML' because most browsers don't
     *  allow access to the paste action in execCommand.
     *
     * @param {Event} e The paste event.
     *
     * @returns {boolean} Returns true if hijacked paste was successful else
     *  false.
     */
    pasteHandler: function pasteHandler(e) {
      e.preventDefault();
      if (!e.type === 'paste') return false;
      var text = e.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
      return true;
    },

    /**
     * newLineHandler - Handle's the creation of a new section when the user
     *  creates a newline (aka presses 'Enter'). We hijack this event because
     *  the implementation of creating new sections in contenteditable elements
     *  can be pretty different between browsers (especially Firefox).
     *
     *  TODO: Clean this up.
     *
     * @returns {Element} Returns the newly created paragraph.
     */
    newLineHandler: function newLineHandler(e) {
      e.preventDefault();
      var sel = window.getSelection();
      var parentBlock = findParentBlock(sel.focusNode);
      var newPar = this.createTextSection();
      parentBlock.parentNode.insertBefore(newPar, parentBlock.nextSibling);
      var currentRange = sel.getRangeAt(0);

      if (currentRange.collapsed) {
        try {
          currentRange.setEndBefore(parentBlock.nextSibling);

          if (currentRange.toString().length !== 0) {
            newPar.append(currentRange.cloneContents());
          }
        } catch (exception) {
          newPar.textContent = '';
        }
      }

      if (newPar.textContent.length === 0) {
        newPar.append(document.createElement('br'));
        newPar.append(document.createTextNode(''));
      }

      currentRange.deleteContents();

      if (parentBlock.textContent.length === 0 && currentRange.commonAncestorContainer === currentRange.startContainer) {
        parentBlock.append(document.createElement('br'));
      }

      var range = document.createRange();
      range.selectNodeContents(newPar);
      collapseSelectionToRange(sel, range, true);
      newPar.normalize();
      var rect = newPar.getBoundingClientRect();

      if (rect.top >= window.innerHeight) {
        window.scroll({
          top: rect.top + window.scrollY,
          behavior: 'instant'
        });
      }

      return newPar;
    },

    /**
     * keydownHandler - Watches for deletion keys on keydown events and stops
     *  them from deleting the divs inside the main container. However, this is
     *  fairly limited in scope: though it catches Backspace, Delete, and ctrl-X
     *  it's really only meant to stop the Backspace from deleting the first
     *  paragraph. Events like ctrl-A + Backspace are handled in the
     *  keyupHandler.
     *
     * @param {KeyboardEvent} e The KeyboardEvent to test.
     */
    keydownHandler: function keydownHandler(e) {
      var sel = window.getSelection();

      if (isDeletionKey(e)) {
        if (e.key === 'Backspace' && sel.anchorOffset === 0 && sel.anchorNode === sel.focusNode) {
          this.deleteContainerSection(e);
        } else if (e.key === 'Delete' && sel.anchorOffset === sel.anchorNode.textContent.length && sel.anchorNode === sel.focusNode) {
          this.deleteContainerSection(e);
        }
      }

      if (e.key === 'Enter' && this.$innerCtn.contains(e.target)) {
        this.newLineHandler(e);
      }

      this.preventTextInContainer(e);
      var range = sel.getRangeAt(0);
      var prevSection = findParentBlock(range.startContainer);

      if (!this.editToolbar.contains(prevSection) && !this.insertToolbar.contains(prevSection)) {
        this.prevSection = prevSection;
        this.prevSectionPrevSibling = this.prevSection.previousSibling;
        this.prevOffset = range.startOffset;
      }
    },

    /**
     * keyupHandler - Watches for deletion keys and resets the editor container
     *  if they remove the first inner paragraph. Also normalizes the current
     *  section so that all text nodes are merged together (this helps with
     *  newline generation). Also checks to see if the insertToolbar should be
     *  displayed.
     *
     * @param {KeyboardEvent} e The KeyboardEvent to test.
     */
    keyupHandler: function keyupHandler(e) {
      if (isDeletionKey(e)) {
        var sel = window.getSelection();

        if (this.$innerCtn.innerHTML === '' || this.$innerCtn.innerHTML === '<br>' || sel.anchorNode === this.$innerCtn) {
          this.createFirstTextSection();
        }

        this.displayFirstSectionPlaceholder();
      }

      try {
        this.normalizeSection();
        this.checkForInsert(e);
        this.positionCursor();
      } catch (exception) {
        return null;
      }

      return true;
    },

    /**
     * checkForInsert - Determines if the insertToolbar should be displayed. If
     *  the user is in an empty section, the insertToolbar should be displayed.
     *
     *
     * @returns {boolean} Returns true if the insertToolbar is displayed else
     *  false.
     */
    checkForInsert: function checkForInsert(e) {
      if (e && this.insertToolbar.$ctn.contains(e.target)) return false;
      var sel = window.getSelection();
      this.insertToolbar.hide();

      if (sel.isCollapsed && sel.anchorNode && sel.anchorNode.textContent === '' && !containsSelection(sel, this.insertToolbar.$ctn)) {
        this.insertToolbar.display();
        return true;
      }

      return false;
    },

    /**
     * positionCursor - Positions the cursor in a textSection if it isn't in one
     *  already. This method first looks at the previous section (set in the
     *  keydownHandler) and tries to position the cursor there. If that fails, it
     *  will position the cursor in the next adjacent text container, creating one
     *  if necessary. This method will return false if the cursor is currently in
     *  one of the toolbars.
     *
     */
    positionCursor: function positionCursor() {
      var sel = window.getSelection();
      var section = null;

      try {
        section = findParentBlock(sel.anchorNode);
      } catch (exception) {
        return false;
      }

      if (this.editToolbar.contains(section) || this.insertToolbar.contains(section)) {
        return false;
      }

      var range = sel.getRangeAt(0);

      if (!section.classList.contains(this.classes.textSection) && section.tagName !== 'H2' && section.tagName !== 'H1') {
        if (this.prevSection && this.$innerCtn.contains(this.prevSection) && this.prevSection.classList.contains(this.classes.textSection)) {
          sel.collapse(this.prevSection, this.prevOffset);
        } else {
          section = this.prevSectionPrevSibling;
          if (!section) return false;
          var newSection = this.createTextSection();

          if (section.nextSibling) {
            this.$innerCtn.insertBefore(newSection, section.nextSibling);
          } else {
            this.$innerCtn.appendChild(newSection);
          }

          range.selectNodeContents(newSection);
          range.collapse(true);
        }
      }

      return true;
    },

    /*
    ##     ## ######## #### ##        ######
    ##     ##    ##     ##  ##       ##    ##
    ##     ##    ##     ##  ##       ##
    ##     ##    ##     ##  ##        ######
    ##     ##    ##     ##  ##             ##
    ##     ##    ##     ##  ##       ##    ##
     #######     ##    #### ########  ######
    */

    /**
     * load - Load a previous version of the editor. The given htmlSTring MUST be
     *  that returned by this.html(true). If the given htmlString doesn not
     *  contain the appropriate $innerCtn class, it will be rejected. If passed
     *  correctly, the given htmlString will replace the current editor's
     *  $innerCtn.
     *
     * @param {string} htmlString A string containing a previous state of a
     *  writefree editor.
     *
     * @returns {boolean} Returns true if the given htmlString was formatted
     *  properly and was inserted into the editor. Else returns false.
     */
    load: function load(htmlString) {
      var parser = new DOMParser();
      var html = htmlString;

      if (typeof htmlString === 'string') {
        html = parser.parseFromString(htmlString, 'text/html');
      }

      var newInnerCtn = null;

      try {
        newInnerCtn = html.body.firstChild;
      } catch (exc) {
        return false;
      }

      if (newInnerCtn && newInnerCtn.classList.contains(this.innerCtnClass)) {
        this.$ctn.removeChild(this.$innerCtn);
        this.$ctn.appendChild(newInnerCtn);
        this.$innerCtn = newInnerCtn;
      }

      return this.$ctn.contains(newInnerCtn);
    },

    /**
     * html - Returns the Editor in HTML form.
     *
     * @param {boolean} [editable=false] Determines whether the returned HTML will
     *  have contenteditable set to true or false, according to given value.
     *
     * @returns {Element} The Editor in HTML form.
     */
    html: function html() {
      var editable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var returnEl = this.$innerCtn.cloneNode(true);
      returnEl.setAttribute('contenteditable', editable);
      return returnEl.outerHTML;
    },

    /**
     * getToolbar - Returns the Toolbar associated with this Editor.
     *
     * @returns {Toolbar} The Toolbar associated with this Editor.
     */
    getToolbar: function getToolbar() {
      return this.editToolbar;
    },

    /**
     * isFirst - Determines if given HTML Element is the first element of the
     *  Editor.
     *
     * @param {Element} $node The HTML Element to test.
     *
     * @returns {boolean} True if the given Element is the first in the Editor,
     *  else returns false.
     */
    isFirst: function isFirst($node) {
      if (this.$innerCtn.children[0] === $node) {
        return true;
      }

      return false;
    }
  };
  var toolbarStyle = '@import url("https://fonts.googleapis.com/css?family=Crimson+Text:400,700|Roboto");@keyframes fade-in {  from {    opacity: 0; }  to {    opacity: 1; } }@keyframes expand-width {  from {    width: 0; }  to {    width: 15em; } }.wf__toolbar {  position: fixed;  display: inline-block;  font-family: "Roboto", sans-serif;  background: linear-gradient(#555, #222);  padding: 0.25em 0.25rem;  border-radius: 0.25em;  box-shadow: 0.1rem 0.1rem 1rem 0.1rem rgba(0, 0, 0, 0.55);  animation: fade-in 0.15s ease-out;  transition: width 0.2s;  overflow: hidden;  min-width: 1em;  max-height: 1.9em; }  .wf__toolbar__btn-ctn {    transition: transform 0.2s; }  .wf__toolbar__btn {    box-sizing: border-box;    margin: 0 0.1rem;    background: none;    color: #fff;    border: 1px solid transparent;    border-radius: 0.25em;    transition: all 0.2s;    font-size: 1em;    width: 2em;    height: 1.75em;    line-height: 1.25em;    text-align: center;    padding: 0.25em 0.25rem;    outline: none;    z-index: 0;    vertical-align: baseline; }  .wf__toolbar__btn:hover {    border-color: #fff;    background: rgba(255, 255, 255, 0.075); }  .wf__toolbar__btn:active {    border-color: #bbb;    background: rgba(0, 0, 0, 0.2); }  .wf__toolbar__btn-active {    color: #A9D943;    border-color: #A9D943; }  .wf__toolbar__btn-disabled {    color: #666; }  .wf__toolbar__btn-disabled:hover {    border-color: transparent;    background: none; }  .wf__toolbar__input-ctn {    box-sizing: border-box;    position: absolute;    width: 15em;    height: 100%;    top: 0;    left: 0;    z-index: 1;    padding: 0.25em 0.25rem;    animation: fade-in 0.15s ease-out;    transition: all 0.2s; }    .wf__toolbar__input-ctn button {      display: inline-block;      position: absolute;      right: 0;      margin-right: 0; }  .wf__toolbar__input {    display: inline-block;    max-width: 100%;    height: 100%;    margin: 0;    padding: 0;    border: none;    outline: none;    background: none;    color: white;    padding-left: 0.1rem;    font-size: 1em; }  .wf__toolbar-hide-up {    transform: translateY(-150%);    visibility: hidden; }  .wf__toolbar-hide-down {    transform: translateY(150%);    visibility: hidden; }  .wf__toolbar-wide {    width: 15em; }  .wf__toolbar.hide {    display: none !important; }.wf__editor p:first-child:empty:not(:focus)::before,.wf__editor div:first-child:empty:not(:focus)::before {  content: "placeholder_text";  color: grey;  font-style: italic; }/*# sourceMappingURL=site.css.map */'; // writeFree.js

  var defaultContainerStyle = {
    'min-height': '2em',
    'max-width': '100%',
    margin: '1em auto',
    padding: '0em 1.5rem',
    'font-size': '1.25rem',
    'font-family': "'Crimson Text', serif",
    outline: 'none',
    color: '#333'
  };
  var defaultSectionStyle = {
    'font-size': '1.25rem',
    'max-width': '35rem',
    'margin-left': 'auto',
    'margin-right': 'auto'
  };
  var defaultLargeHeadingStyle = Object.assign({}, defaultSectionStyle);
  defaultLargeHeadingStyle['font-size'] = '2rem';
  var defaultSmallHeadingStyle = Object.assign({}, defaultSectionStyle);
  defaultSmallHeadingStyle['font-size'] = '1.5rem';
  var defaultImgStyle = Object.assign({}, defaultSectionStyle);
  defaultImgStyle['max-width'] = '100%';
  var defaultOptions = {
    divOrPar: 'p',
    sectionClass: '',
    sectionStyle: defaultSectionStyle,
    containerClass: '',
    containerStyle: defaultContainerStyle,
    largeHeadingClass: '',
    largeHeadingStyle: defaultLargeHeadingStyle,
    smallHeadingClass: '',
    smallHeadingStyle: defaultSmallHeadingStyle,
    imgClass: '',
    imgStyle: defaultImgStyle,
    emptyPlaceholder: 'Try writing here...'
  };
  /**
   * WriteFree - The initialization function used to create instances of the
   *  WriteFree editor.
   *
   * @param {Element} $ctn - The empty HTML Element, usually a div to be used as the
   *  container for the WriteFree editor.
   *
   * @returns {Editor} The WriteFree editor.
   */

  function WriteFree($ctn) {
    var userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var options = function setOptions() {
      var globalOptions = Object.create(defaultOptions);

      if (userOptions && _typeof(userOptions) === 'object') {
        Object.keys(userOptions).forEach(function (option) {
          globalOptions[option] = userOptions[option];
        });
      }

      return globalOptions;
    }();

    var $toolbarStyle = document.createElement('style');
    var newToolbarStyle = toolbarStyle.replace('placeholder_text', options.emptyPlaceholder);
    $toolbarStyle.appendChild(document.createTextNode(newToolbarStyle));
    document.getElementsByTagName('head')[0].appendChild($toolbarStyle); // Create and initialize the editor.

    var Editor = Object.create(editorBase);
    Editor.initWFEditor($ctn, options);
    return {
      html: Editor.html.bind(Editor),
      load: Editor.load.bind(Editor)
    };
  }

  /*\
  |*|
  |*|  :: cookies.js ::
  |*|
  |*|  A complete cookies reader/writer framework with full unicode support.
  |*|
  |*|  Revision #3 - July 13th, 2017
  |*|
  |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
  |*|  https://developer.mozilla.org/User:fusionchess
  |*|  https://github.com/madmurphy/cookies.js
  |*|
  |*|  This framework is released under the GNU Public License, version 3 or later.
  |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
  |*|
  |*|  Syntaxes:
  |*|
  |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
  |*|  * docCookies.getItem(name)
  |*|  * docCookies.removeItem(name[, path[, domain]])
  |*|  * docCookies.hasItem(name)
  |*|  * docCookies.keys()
  |*|
  \*/
  var Cookies = {
    getItem: function getItem(sKey) {
      if (!sKey) {
        return null;
      }

      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }

      var sExpires = "";

      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            /*
            Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
            version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
            the end parameter might not work as expected. A possible solution might be to convert the the
            relative time to an absolute time. For instance, replacing the previous line with:
            */

            /*
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
            */

            break;

          case String:
            sExpires = "; expires=" + vEnd;
            break;

          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }

      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function removeItem(sKey, sPath, sDomain) {
      if (!this.hasItem(sKey)) {
        return false;
      }

      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function hasItem(sKey) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }

      return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
    },
    keys: function keys() {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);

      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }

      return aKeys;
    }
  };

  var DocumentFileType = 'ISAEmail_config';
  /**
   * addStyleFromObj - Adds inline-style to a given HTML Element from the given
   *  style Object.
   *
   * @param {Element} $el   The HTML Element to which the styles will be added.
   * @param {object} styleObj The object which contains the styles. Must be
   *  formatted in the format { 'property' : 'value' } where 'property' is the
   *  CSS property and 'value' is the value to which it should be set.
   *  E.g. { color : 'purple' } will set $el's color to purple.
   *
   * @returns {Element} If the given styleObj is not an object or is null or
   *  undefined, will return false. If styles are successfully added, returns the
   *  HTML Element.
   */

  function addStyleFromObj$1($el, styleObj) {
    if (styleObj === null || styleObj === undefined || !(_typeof(styleObj) === 'object')) {
      return false;
    }

    var styleString = '';
    Object.keys(styleObj).forEach(function (prop) {
      styleString += "".concat(prop, ": ").concat(styleObj[prop], ";");
    });
    $el.setAttribute('style', styleString);
    return $el;
  }
  /**
   * addClasses - Add classes to an HTML Element.
   *
   * @param {Element} $el  The HTML Element to which the classes will be added.
   * @param {string || Array} klasses A single string or an array of strings
   *  representing the classes to be added to $el.
   *
   * @returns {Element} The original $el with classes attached.
   */

  function addClasses$1($el, klasses) {
    if (!klasses) return $el;

    if (Array.isArray(klasses)) {
      klasses.forEach(function (klass) {
        if (typeof klass === 'string' && klass.length > 0) $el.classList.add(klass);
      });
    } else {
      $el.classList.add(klasses);
    }

    return $el;
  }
  /**
   * generateElement - Quickly generates an HTML element with given tagName,
   *  classes, and id.
   *
   * @param {string} [tagName=div] The tag name to use for the element.
   * @param {string|string[]}  [klasses=[]]  A single string or an array of
   *  strings representing the classes to be added to the element.
   * @param {object} [options={}] An optional object containing attributes to be
   *  added to the element. Each key must be a valid HTML attribute and the value
   *  must be a string.
   *
   * @returns {Element} The newly-created HTML element.
   */

  function generateElement$1() {
    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var $el = document.createElement(tagName);

    if (options && _typeof(options) === 'object') {
      Object.keys(options).forEach(function (attr) {
        if (attr === 'style') {
          addStyleFromObj$1($el, options[attr]);
        } else if (attr === 'klasses') {
          addClasses$1($el, options[attr]);
        } else if (attr === 'textContent') {
          $el.textContent = options[attr];
        } else if (attr === 'innerHTML') {
          $el.innerHTML = options[attr];
        } else {
          $el.setAttribute(attr, options[attr]);
        }

        return null;
      });
    }

    return $el;
  }
  /**
   * validateURL - A very simple url validator that checks for at least one dot
   *  and for http or https. If it has a dot but no http(s), http:// will be
   *  prepended before the url is returned.
   *
   * @param {string} url The url to validate
   *
   * @returns {string || boolean} Returns the url (with http:// prepended if
  *   applicable) if url is valid. Else returns false.
   */

  function validateURL$1(url) {
    var returnVal;
    if (!url.includes('.')) return false;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      returnVal = "http://".concat(url);
    } else {
      returnVal = url;
    }

    return returnVal;
  }
  function generateStandardButton(innerHTML) {
    var addOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = addOptions;
    options.innerHTML = innerHTML;

    if (Array.isArray(options.klasses)) {
      options.klasses.push('standardBtn');
      options.klasses.push('standardBtn--dark');
    } else {
      options.klasses = ['standardBtn', 'standardBtn--dark'];
    }

    return generateElement$1('button', options);
  }
  /**
  * generateCurrentDateString - Create a string representing the current date in
  *  the format YYYY-MM-DD.
  *
  * @returns {string} Returns the current date in the format YYYY-MM-DD.
  */

  function generateCurrentDateString() {
    var date = new Date();
    var dateString = {};
    dateString.year = date.getFullYear();
    dateString.month = date.getMonth() + 1;
    dateString.dateNum = date.getDate();
    dateString.hours = date.getHours();
    dateString.minutes = date.getMinutes();
    Object.keys(dateString).forEach(function (key) {
      var valAsString = String(dateString[key]);
      dateString[key] = valAsString.length < 2 ? "0".concat(valAsString) : valAsString;
    });
    return "".concat(dateString.year, "-").concat(dateString.month, "-").concat(dateString.dateNum, " ").concat(dateString.hours, ":").concat(dateString.minutes);
  }
  /**
   * cleanFileName - Replaces any illegal file characters with legal ones.
   *
   * @param {string} string The string to clean.
   *
   * @returns {string} Returns the cleaned string.
   */

  function cleanFileName(string) {
    // No control chars, no: /, \, ?, %, *, :, |, ", <, >
    var cleanedString = string.replace(/\/|\\|\?|%|\*|\|"|'|<|>'/g, '');
    cleanedString = cleanedString.replace(/:/g, '-');
    cleanedString = cleanedString.replace(/ /g, '_');
    return cleanedString;
  }
  /**
   * appendChildren - Append multiple children to a target node.
   *
   * @param {HTML Element} node     The node to which the children will be added.
   * @param {[HTML Element]} children The children to be added.
   *
   * @returns {HTML Element || false} Returns the node if successful. Otherwise
   *  returns false;
   */

  function appendChildren(node, children) {
    if (node instanceof Element && Array.isArray(children)) {
      children.forEach(function (child) {
        if (child instanceof Element) node.appendChild(child);else throw Error("Child ".concat(child, " is not an HTML Element"));
      });
      return node;
    }

    return false;
  }
  /**
   * findAncestorOfType - Finds the closest ancestor of the given node which
   *  matches the given type.
   *
   * @param {HTML Element} node The node for which to look for an ancestor
   *  matching the given type.
   * @param {String} type The type of node to look for, eg. 'DIV'
   *
   * @returns {HTML Element} Returns the ancestor matching the given type, if
   *  found. Otherwise, simply returns the document.
   */

  function findAncestorOfType(type, node) {
    if (!type || type && typeof type !== 'string') return document;
    if (!node || node && !(node instanceof Element)) return document;

    if (node.tagName === type.toUpperCase() || node === document) {
      return node;
    }

    return findAncestorOfType(type, node.parentNode);
  }

  /**
   * defaultSaveButtonHandler - The default function to call when the save button
   *  is clicked. If the saveBtn has a proper saveHandler attached, this function
   *  will call that one.
   *
   */

  function defaultSaveButtonHandler() {
    if (this.$saveBtn.saveHandler && typeof this.$saveBtn.saveHandler === 'function') {
      this.$saveBtn.saveHandler();
    }
  }
  /**
   * keydownHandler - Handle keydown events. If the modal is open and the user
   *  presses 'Enter', a click on the save button is simulated. If the 'Escape'
   *  key is pressed, a click on the close button is simulated.
   *
   * @param {Event} e The keydown event.
   *
   */


  function keydownHandler(e) {
    if (e.key === 'Enter') {
      this.$saveBtn.click();
    } else if (e.key === 'Escape') {
      this.$closeBtn.click();
    }
  }
  /**
   * clickOffHandler - When open, checks to see if the user clicked off the modal
   *  window.
   *
   * @param {Event} e The click event.
   *
   */


  function clickOffHandler(e) {
    if (e.target === this.$overlay) this.hide();
  }

  var Modal = {
    /**
     * init - Initializes the Modal. Creates the necessary elements to display
     *  Modal content.
     *
     * @returns {Modal} Returns this Modal.
     */
    init: function init() {
      this.createOverlay();
      this.createWindow();
      this.createControlButtons();
      this.keydownHandler = keydownHandler.bind(this);
      this.clickOffHandler = clickOffHandler.bind(this);
    },

    /**
     * createOverlay - Creates the overall modal background. This is the grayed-
     *  out background to the modal which also acts as the modal container. Also
     *  sets the overlay style as appropiate.
     *
     * @returns {Element} The overlay Element.
     */
    createOverlay: function createOverlay() {
      var klasses = ['modal-overlay'];
      this.$overlay = generateElement$1('div', {
        klasses: klasses
      });
      document.body.appendChild(this.$overlay);
      return this.overlay;
    },

    /**
     * createWindow - Creates the window which will contain the content passed to
     *  the modal. Sets appropriate styles and appends the window to the overlay.
     *
     * @returns {Element} Returns the window Element.
     */
    createWindow: function createWindow() {
      var klasses = 'modal-window';
      var id = 'main-modal';
      this.$window = generateElement$1('div', {
        klasses: klasses,
        id: id
      });
      this.$overlay.appendChild(this.$window);
      return this.window;
    },

    /**
     * createControlButtons - Creates the control buttons. The Modal has two
     *  control buttons: the saveButton and the closeButton. The saveButton has a
     *  defineable click handler (set by this.setupSave) and text (eg. 'Save,'
     *  'Copy,' etc). The closeButton is permanently set to 'Close' and has a
     *  permanent click handler which clears and closes the Modal.
     *
     * @returns {Element} Returns the div containing the control buttons.
     */
    createControlButtons: function createControlButtons() {
      this.$btnCtn = generateElement$1('div');
      this.$saveBtn = generateStandardButton('Save', {
        style: {
          'margin-right': '1rem'
        }
      });
      this.$saveBtn.addEventListener('click', defaultSaveButtonHandler.bind(this));
      this.$closeBtn = generateStandardButton('Close');
      this.$closeBtn.addEventListener('click', this.hide.bind(this));
      this.$btnCtn.appendChild(this.$saveBtn);
      this.$btnCtn.appendChild(this.$closeBtn);
      this.$window.appendChild(this.$btnCtn);
      return this.$btnCtn;
    },

    /**
     * setSaveHandler - Sets the saveBtn's textContent and handler to those given.
     *
     * @param {string} text The text for the saveBtn to display.
     * @param {function} handler The function to call when the saveBtn is clicked.
     *
     * @returns {boolean} Returns true if the saveHandler was successfully set.
     *  Otherwise returns false.
     */
    setSaveHandler: function setSaveHandler() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (handler && typeof handler === 'function') {
        this.$saveBtn.innerHTML = text;
        this.$saveBtn.saveHandler = handler;
        this.$saveBtn.classList.remove('hide');
        return true;
      }

      this.$saveBtn.classList.add('hide');
      return false;
    },
    adjustHeight: function adjustHeight() {
      var windowRect = this.$window.getBoundingClientRect();

      if (windowRect.height > window.innerHeight) {
        this.$window.classList.add('no-transform');
      } else {
        this.$window.classList.remove('no-transform');
      }
    },

    /**
     * display - Displays the Modal. Attaches the given content to the window and
     *  unhides the overlay.
     *
     * @param {Element} content The HTML to be displayed within the Modal.
     *
     * @returns {Element} Returns the Modal.
     */
    display: function display($content) {
      if (this.$currentContent) this.$window.removeChild(this.$currentContent);
      this.$currentContent = $content;
      this.$window.insertBefore(this.$currentContent, this.$btnCtn);
      this.$overlay.style.display = 'block';
      this.adjustHeight();
      document.addEventListener('keydown', this.keydownHandler);
      document.addEventListener('click', this.clickOffHandler);
      return this.$overlay;
    },

    /**
     * hide - Hides the Modal and clears its contents.
     *
     */
    hide: function hide() {
      document.removeEventListener('keydown', this.keydownHandler);
      document.removeEventListener('click', this.clickOffHandler);
      this.$overlay.style.display = 'none';
      if (this.$currentContent) this.$window.removeChild(this.$currentContent);
      this.$currentContent = null;
      this.$saveBtn.saveHandler = null;
    }
  };

  /**
   * field - Base object for all fields.
   */

  var field = {
    /**
     * initField - Initializes the field. Creates the container, sets local vars.
     *
     * @param {Object} docInfo  The docInfo to use to load/save from.
     * @param {type} loadFunc Description
     * @param {type} saveFunc Description
     *
     * @returns {type} Description
     */
    initField: function initField(docInfo, saveFunc, loadFunc) {
      this.docInfo = docInfo;
      this.ctn = generateElement$1('div', {
        klasses: ['settingsField'],
        style: {
          'text-align': 'left'
        }
      });

      if (saveFunc && typeof saveFunc === 'function' || saveFunc === null) {
        this.save = saveFunc;
      }

      if (loadFunc && typeof loadFunc === 'function' || loadFunc === null) {
        this.load = loadFunc;
      }
    }
  };
  /**
   * TextFieldBase - A Text Field provides label, input, and error message
   *  elements as well as basic save/load funcitonality (to provided docInfo
   *  object).
   */

  var TextFieldBase = {
    /**
     * init - Initialize a text field.
     *
     * @param {Object} docInfo   The docInfo to use to load/save from.
     * @param {String} labelText The string to be used in the label.
     * @param {type} targetID  The id of the HTML object which this settings field
     *  will affect.
     *
     * @returns {TextField} Returns the newly initialized TextField.
     */
    init: function init(docInfo, labelText, targetID, saveFunc, loadFunc) {
      this.targetID = targetID;
      this.initField(docInfo, saveFunc, loadFunc);
      this.html = document.getElementById('targetID');
      this.ctn.appendChild(generateElement$1('label', {
        textContent: labelText
      }));
      this.input = generateElement$1('input', {
        type: 'text'
      });
      this.errorMessage = generateElement$1('div', {
        klasses: ['settingsField__error--message']
      });
      this.ctn.classList.add('settingsField--transition');
      appendChildren(this.ctn, [this.input, this.errorMessage]);
      return this;
    },

    /**
     * save - Saves the value of the input to the docInfo.
     *
     */
    save: function save() {
      this.docInfo[this.targetID] = this.input.value;
      if (this.html) this.textContent = this.input.value;
    },
    load: function load() {
      this.input.value = this.docInfo[this.targetID];
    },

    /**
     * showError - Sets the error message to the given value then displays it.
     *
     * @param {String} msg The message to display as an error.
     *
     */
    showError: function showError(msg) {
      this.errorMessage.textContent = msg;
      this.errorMessage.style.display = 'block';
      this.input.classList.add('settingsField--error');
    },

    /**
     * hideError - Removes the error message text then hides it.
     *
     */
    hideError: function hideError() {
      this.errorMessage.textContent = '';
      this.errorMessage.style.display = 'none';
      this.input.classList.remove('settingsField--error');
    },

    /**
     * display - Display the text field.
     *
     */
    display: function display() {
      if (this.prevValue) {
        this.input.value = this.prevValue;
      }

      this.ctn.style.maxHeight = '10em';
      this.hidden = false;
    },

    /**
     * hide - Hide the text field.
     *
     */
    hide: function hide() {
      this.prevValue = this.input.value;
      this.input.value = '';
      this.ctn.style.maxHeight = 0;
      this.hidden = true;
    },

    /**
     * value - Get the current value of the input.
     *
     * @returns {String} Returns the current value of the input.
     */
    value: function value() {
      return this.input.value;
    }
  };
  var TextField = Object.assign(TextFieldBase, field);
  /**
   * SwitchFieldBase - A SwitchField creates a toggle switch.
   */

  var SwitchFieldBase = {
    /**
     * init - Initializes the Switch Field. Creates all the necessary HTML
     *  elements to display it properly.
     *
     * @param {type} docInfo   Description
     * @param {type} labelText Description
     * @param {type} targetID  Description
     *
     * @returns {type} Description
     */
    init: function init(docInfo, labelText, targetID, saveFunc, loadFunc) {
      this.targetID = targetID;
      this.initField(docInfo, saveFunc, loadFunc);
      this.labelCtn = generateElement$1('label', {
        klasses: ['switch']
      });
      this.labelTxt = generateElement$1('span', {
        klasses: ['sitch-text'],
        textContent: labelText
      });
      this.input = generateElement$1('input', {
        type: 'checkbox',
        checked: 'true'
      });
      this.slider = generateElement$1('span', {
        klasses: ['slider']
      });
      appendChildren(this.labelCtn, [this.labelTxt, this.input, this.slider]);
      this.ctn.appendChild(this.labelCtn);
    },

    /**
     * save - Save the state of the switch.
     *
     */
    save: function save() {
      this.docInfo[this.targetID] = this.input.checked;
    },

    /**
     * load - Load the state of the switch.
     *
     */
    load: function load() {
      this.input.checked = this.docInfo[this.targetID];
    },

    /**
     * value - Returns the current state of the switch.
     *
     * @returns {boolean} Returns true if switch is checked else false.
     */
    value: function value() {
      return this.input.checked;
    }
  };
  var SwitchField = Object.assign(SwitchFieldBase, field);
  /**
   * OptionalLinkFieldBase - An Optional Link Field provides a Switch Field and
   *  Text Field together. This allows the user to choose if they want to include
   *  the link at all and let's them edit the url for that link.
   */

  var OptionalLinkFieldBase = {
    /**
     * init - Initializes the Optional Link Field. Creates the Switch Field and
     *  Text Field.
     *
     * @param {Object} docInfo    The docInfo to read from and save to.
     * @param {String} fieldTitle The title of the field.
     * @param {String} targetID   The string to use as the property name when
     *  reading from/writing to the docInfo. This is also used to find and set the
     *  link in the HTML.
     *
     * @returns {type} Description
     */
    init: function init(docInfo, fieldTitle, targetID) {
      this.fieldTitle = fieldTitle;
      this.targetID = targetID;
      this.initField(docInfo);
      this.html = document.getElementById(targetID);
      this.switchField = Object.create(SwitchField);
      this.textField = Object.create(TextField);
      this.switchField.init(this.docInfo.links, "Include ".concat(fieldTitle, " Link:"), '', null, null);
      this.textField.init(this.docInfo.links, "".concat(fieldTitle, " URL:"));
      this.switchField.ctn.classList.remove('settingsField');
      this.textField.ctn.classList.remove('settingsField');
      this.showError = this.textField.showError.bind(this.textField);
      this.hideError = this.textField.hideError.bind(this.textField);
      appendChildren(this.ctn, [this.switchField.ctn, this.textField.ctn]);
      this.switchField.input.addEventListener('change', this.switchChangeListener.bind(this));
    },

    /**
     * setHTML - Sets the state of the HTML based on the values of the Switch
     *  Field and Text Field. If the switch is checked then the HTML is displayed
     *  with its href set to the value of the textField.
     *
     */
    setHTML: function setHTML() {
      if (this.html) {
        if (this.switchField.value()) {
          var url = validateURL$1(this.textField.value());
          if (!url) throw Error('Invalid URL');
          this.html.href = url;
          this.html.style.display = 'block';
        } else {
          this.html.style.display = 'none';
        }
      }
    },

    /**
     * switchChangeListener - Hides or displays the text field depending on the
     *  state of the switch.
     *
     */
    switchChangeListener: function switchChangeListener() {
      if (this.switchField.value() === true) {
        this.textField.display();
      } else {
        this.textField.hide();
      }
    },

    /**
     * save - Saves the state of the Optional Link Field. If the switch is checked
     *  and there is a valid url in the text field, it will be saved to the
     *  docInfo. Otherwise, it will be removed from the docInfo.
     *
     */
    save: function save() {
      var val = null;

      if (this.switchField.value() === true) {
        var url = validateURL$1(this.textField.value());
        if (!url) throw Error('Invalid URL');
        if (this.html) this.html.href = url;
        val = {
          text: this.html ? this.html.textContent : null,
          url: url
        };
      }

      this.setHTML();
      this.docInfo[this.targetID] = val;
    },

    /**
     * load - Loads the state of the Optional Link Field form the docInfo and sets
     *  the HTML.
     *
     */
    load: function load() {
      if (this.docInfo[this.targetID]) {
        this.switchField.input.checked = true;
        this.textField.input.value = this.docInfo[this.targetID].url;
        this.textField.display();
      } else {
        this.switchField.input.checked = false;
        this.textField.hide();
      }

      this.setHTML();
    }
  };
  var OptionalLinkField = Object.assign(OptionalLinkFieldBase, field);

  var SettingsView = {
    $ctn: generateElement$1('div'),
    $heading: generateElement$1('h1', {
      textContent: 'Settings'
    }),

    /**
     * init - Initialize the Settings view. Creates the applicable fields to allow
     *  users to adjust the settings of their email.
     *
     * @param {Modal} modal The Modal in which the SettingsView will be displayed.
     *
     * @returns {SettingsView} Returns this view.
     */
    init: function init(modal, docInfo) {
      this.modal = modal;
      this.docInfo = docInfo;
      this.$ctn.innerHTML = '';
      this.$ctn.appendChild(this.$heading);
      this.generateFields();
      return this;
    },

    /**
     * generateFields - Generates the settings fields. then loads them.
     *
     */
    generateFields: function generateFields() {
      this.fields = [];
      var title = Object.create(TextField);
      title.init(this.docInfo, 'Email Title', 'title');
      var advisingLink = Object.create(OptionalLinkField);
      advisingLink.init(this.docInfo.links, 'Advising Session', 'advisingLink');
      var applicationLink = Object.create(OptionalLinkField);
      applicationLink.init(this.docInfo.links, 'Application Link', 'applicationLink');
      this.fields.push(title, advisingLink, applicationLink);
      this.loadFields();
    },

    /**
     * loadFields - Updates the current value of the fields.
     *
     */
    loadFields: function loadFields() {
      var _this = this;

      this.fields.forEach(function (field) {
        field.load(field.input);

        _this.$ctn.appendChild(field.ctn);
      });
    },

    /**
     * display - Displays this view, utilizing the modal.
     *
     * @returns {Element} Returns the modal containing this view.
     */
    display: function display() {
      this.loadFields();
      this.modal.setSaveHandler('Save', this.save.bind(this));
      return this.modal.display(this.$ctn);
    },

    /**
     * save - Saves the user's settings by iterating through each field and
     *  calling its save method.
     *
     * @returns {boolean} Returns true if the settings were successfully saved.
     *  Otherwise returns false.
     */
    save: function save() {
      var errors = [];
      this.fields.forEach(function (field) {
        try {
          if (field.hideError) field.hideError();
          field.save();
        } catch (err) {
          if (field.showError) {
            field.showError(err.message);
          } else {
            throw err;
          }

          errors.push(err);
        }
      });
      if (errors.length === 0) this.modal.hide();
      return true;
    }
  };

  var CopyView = {
    $ctn: generateElement$1('div'),
    $heading: generateElement$1('h1', {
      textContent: 'Copy Your Email'
    }),
    $description: generateElement$1('p'),
    $textarea: generateElement$1('textarea', {
      style: {
        width: '35rem',
        height: '10rem',
        resize: 'vertical'
      }
    }),

    /**
     * init - Initialize the copy view. The copy view displays a text box filled
     *  with the content of the email editor.
     *
     * @param {Modal} modal The Modal in which the CopyView will be displayed.
     *
     * @returns {CopyView} Returns this view.
     */
    init: function init(modal) {
      this.modal = modal;
      this.$description.textContent = 'Copy the code for your email below.';
      this.$ctn.appendChild(this.$heading);
      this.$ctn.appendChild(this.$description);
      this.$ctn.appendChild(this.$textarea);
      return this;
    },

    /**
     * fillText - Fill the view with the text to be copied.
     *
     * @param {string} text The text to be copied.
     *
     */
    fillText: function fillText(text) {
      this.$textarea.value = text;
      return this.$textarea;
    },

    /**
     * copyContents - Copy the contents of the copy view.
     *
     * @returns {string} Returns the copied content.
     */
    copyContents: function copyContents() {
      this.$textarea.focus();
      this.$textarea.select();
      var successful;

      try {
        successful = document.execCommand('copy');
      } catch (exc) {
        successful = false;
      }

      if (successful) {
        this.$heading.textContent = 'Email Content Copied!';
        this.$description.textContent = 'You can now paste the email content into GRS.';
      } else {
        this.$heading.textContent = 'Uh oh...';
        this.$description.textContent = "We couldn't copy the email content. Try again or manually copy the content below";
      }

      return successful;
    },

    /**
     * display - Displays the view, utilizing the modal.
     *
     * @returns {Element} Returns the modal containing this view.
     */
    display: function display() {
      this.modal.setSaveHandler('Copy', this.copyContents.bind(this));
      return this.modal.display(this.$ctn);
    },

    /**
     * displayAndCopy - This function fills, copies, and displays the copyView in
     *  one fell swoop.
     *
     * @param {string} content The content to be displayed/copied.
     *
     * @returns {boolean} Returns true if successfully copied. Else returns false.
     */
    displayAndCopy: function displayAndCopy(content) {
      this.fillText(content);
      this.display();
      return this.copyContents();
    }
  };

  var style = {
    display: 'inline-block',
    width: '13em',
    height: '7em'
  };
  var saveLoadView = {
    fileType: 'ISAEmail_config',
    $ctn: generateElement$1('div'),
    $heading: generateElement$1('h1', {
      textContent: 'Save / Load an Email'
    }),
    $loadBtn: generateStandardButton('Load a Previous Email', {
      style: style
    }),
    $saveBtn: generateStandardButton('Save Current Email', {
      style: style
    }),
    $btnSeparator: generateElement$1('div', {
      style: {
        width: '1px',
        height: '10rem',
        background: '#ddd',
        display: 'inline-block',
        'vertical-align': 'middle',
        margin: '1rem 2rem'
      }
    }),

    /**
     * init - Initialize the saveLoadView. Saves a reference to the modal it will
     *  use as well as a loadCallBack called when the user updloads a config file,
     *  and a getDocInfo function used when generating a config file for saving.
     *
     * @param {Modal} modal           The modal used to display the saveLoadView.
     * @param {function} loadCallback The function called once the file uploaded
     *  by a user is processed.
     * @param {function} getDocInfo   The function called to get information about
     *  the doucment to be saved (eg. title, contents, etc)
     *
     * @returns {saveLoadView} Returns this saveLoadView.
     */
    init: function init(modal, loadCallback, getDocInfo) {
      this.modal = modal;
      this.loadCallback = loadCallback;
      this.getDocInfo = getDocInfo;
      this.$ctn.append(this.$heading);
      this.$ctn.append(this.$loadBtn);
      this.$ctn.append(this.$btnSeparator);
      this.$ctn.append(this.$saveBtn);
      this.$loadBtn.addEventListener('click', this.load.bind(this));
      this.$saveBtn.addEventListener('click', this.save.bind(this));
      return this;
    },

    /**
     * load - This function, attached as a 'click' handler for $loadBtn, prompts
     *  the user to select a config file, parses that file, and loads that file in
     *  the editor.
     *
     * @param {Event} event The click event to handle.
     *
     */
    load: function load(event) {
      event.preventDefault();
      var fileInput = generateElement$1('input', {
        type: 'file',
        style: {
          display: 'none'
        }
      });
      fileInput.addEventListener('change', this.parseFile.bind(this));
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    },

    /**
     * parseFile - This function is attached as a 'change' handler to the
     *  fileInput created in this.load. It parses the uploaded file, ensures it's
     *  the proper format and type of file, then calls the loadCallback, passing
     *  in the configuration information for the Editor to load.
     *
     * @param {Event} event The change event to handle.
     *
     */
    parseFile: function parseFile(event) {
      var _this = this;

      var file = event.target.files[0];
      if (!file) return false;
      var reader = new FileReader();

      reader.onload = function () {
        var docInfo = JSON.parse(reader.result);
        if (!docInfo.fileType === 'ISAEmail_config') return false;

        _this.loadCallback(docInfo);

        _this.modal.hide();

        return docInfo;
      };

      reader.readAsText(file);
      return true;
    },

    /**
     * save - This function is attached as a 'click' handler to this.$saveBtn.
     *  When called, this function will generate the configuration file by calling
     *  the this.getDocInfo function. If there is a title in the doc info
     *  obtained, this will be used as the name of the file. Otherwise it will use
     *  a generic name.
     *
     * @returns {boolean} Returns true if the file was successfully created. Else
     *  it returns false.
     */
    save: function save(e) {
      e.preventDefault();
      var rawDocInfo = this.getDocInfo();
      if (!rawDocInfo) return false;
      rawDocInfo.fileType = this.fileType;
      var docInfo = JSON.stringify(rawDocInfo);
      var href = "data:text/plain;charset=utf-8,".concat(encodeURIComponent(docInfo));
      var downloadLink = generateElement$1('a', {
        href: href,
        download: "".concat(cleanFileName(rawDocInfo.title), ".isaemail"),
        style: {
          display: 'none'
        }
      });
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      this.modal.hide();
      return true;
    },

    /**
     * display - Calls the modal's display method, passing in this.$ctn.
     *
     * @returns {Element} Returns the modal containing this saveLoadView.
     */
    display: function display() {
      this.modal.setSaveHandler('Ok', this.modal.hide());
      return this.modal.display(this.$ctn);
    }
  };

  var SimpleHelp = {
    /**
     * init - Initializes this simpleHelp view. The simpleHelp view simply
     *  displays a list of steps, one at a time or all at once. The user can click
     *  through each step or choose to display all on a single page.
     *
     * @param {string} title The title of the simpleHelp view. This is used in the
     *  H1 element at the top of the modal.
     * @param {Element[]} steps An array of HTML elements, steps represents each
     *  step for the help view.
     *
     * @returns {simpleHelp} Returns this simpleHelp view.
     */
    init: function init(title, steps, modal) {
      var _this = this;

      this.initHTML();
      this.$heading.textContent = title;
      this.steps = steps;
      this.modal = modal;
      this.steps.map(function (step) {
        return _this.$allSteps.appendChild(step.cloneNode(true));
      });
      this.$ctn.appendChild(this.$heading);
      this.$btnCtn.appendChild(this.$prevBtn);
      this.$btnCtn.appendChild(this.$displayAllBtn);
      this.$btnCtn.appendChild(this.$nextBtn);
      this.$ctn.appendChild(this.$btnCtn);
      this.setCurrentStep(0);
      this.$nextBtn.addEventListener('click', this.nextStep.bind(this));
      this.$prevBtn.addEventListener('click', this.prevStep.bind(this));
      this.$displayAllBtn.addEventListener('click', this.toggleDisplayAll.bind(this));
      return this;
    },
    initHTML: function initHTML() {
      this.$ctn = generateElement$1('div');
      this.$heading = generateElement$1('h1');
      this.$allSteps = generateElement$1('div');
      this.$btnCtn = generateElement$1('div');
      this.$prevBtn = generateStandardButton('Previous');
      this.$nextBtn = generateStandardButton('Next');
      this.$displayAllBtn = generateStandardButton('Display All Steps', {
        klasses: ['standardBtn--margin-right-large', 'standardBtn--margin-left-large']
      });
    },

    /**
     * setCurrentStep - Sets the current step index to that given or to all then
     *  displays the appropriate step.
     *
     * @param {number|string} stepIndex If number, this function will display the
     *  step at the corresponding index in this.steps. If 'all', this function
     *  will display all steps.
     *
     * @returns {boolean} Returns true if the requested step is displayed properly
     *  otherwise returns false.
     */
    setCurrentStep: function setCurrentStep(stepIndex) {
      if (String(stepIndex).toLowerCase() !== 'all' && !this.steps[stepIndex]) return false;
      var stepHTML = null; // Remove currently displayed step.

      if (this.currentStep === 'all') {
        this.$ctn.removeChild(this.$allSteps);
      } else if (this.currentStep >= 0) {
        this.$ctn.removeChild(this.steps[this.currentStep]);
      }

      this.currentStep = stepIndex; // Set and display new current step.

      if (String(stepIndex).toLowerCase() === 'all') {
        stepHTML = this.$allSteps;
      } else {
        stepHTML = this.steps[stepIndex];
      } // this.$ctn.insertBefore(stepHTML, this.$btnCtn);


      this.$ctn.appendChild(stepHTML);
      this.toggleDisabledButtons();
      return true;
    },

    /**
     * toggleDisabledButtons - Toggles the disabled state on $nextBtn and $prevBtn.
     *  If there is no step after the current one, $nextBtn will be disabled. If
     *  there is no step before the current one, $prevBtn will be disabled.
     *
     */
    toggleDisabledButtons: function toggleDisabledButtons() {
      var prevDisabled = false;
      var nextDisabled = false;
      var displayAllText = 'Display All Steps';

      if (this.currentStep === 'all') {
        nextDisabled = true;
        prevDisabled = true;
        displayAllText = 'Display Single Step';
      } else {
        displayAllText = 'Display All Steps';

        if (this.steps[this.currentStep - 1]) {
          prevDisabled = false;
        } else {
          prevDisabled = true;
        }

        if (this.steps[this.currentStep + 1]) {
          nextDisabled = false;
        } else {
          nextDisabled = true;
        }
      }

      this.$prevBtn.disabled = prevDisabled;
      this.$nextBtn.disabled = nextDisabled;
      this.$displayAllBtn.textContent = displayAllText;
    },

    /**
     * prevStep - Displays the previous step, if it exists.
     *
     */
    prevStep: function prevStep() {
      if (this.currentStep !== 'all' && this.steps[this.currentStep - 1]) {
        this.render(this.currentStep - 1);
      }
    },

    /**
     * nextStep - Displays the next step, if it exists.
     *
     */
    nextStep: function nextStep() {
      if (this.currentStep !== 'all' && this.steps[this.currentStep + 1]) {
        this.render(this.currentStep + 1);
      }
    },

    /**
     * toggleDisplayAll - Will either display all steps on a single page or the
     *  first step, depending on what is already displayed.
     *
     */
    toggleDisplayAll: function toggleDisplayAll() {
      if (this.currentStep === 'all') {
        this.render(0);
      } else {
        this.render('all');
      }
    },

    /**
     * render - Renders this simpleHelp by setting the current step to that given
     *  and calling the modal's display method.
     *
     * @returns {Element} Returns this.$ctn.
     */
    render: function render(step) {
      var newStep = step;

      if (!(newStep >= 0) && newStep !== 'all') {
        newStep = this.currentStep;
      }

      this.setCurrentStep(newStep);
      this.modal.display(this.$ctn);
    }
  };

  /**
   * toggleClicksEnabled - Disables or enables click, mousedown, and mouseup
   *  events in the document. Clicks are always enabled for the exit button and
   *  can be enabled for a given HTML element (the allowed parameter).
   *
   * @param {Element} allowed An HTML Element which should still be clickable.
   *
   */
  function toggleClicksEnabled(allowed) {
    function disableClicks(e) {
      if (allowed instanceof Element && allowed.contains(e.target)) return false;
      if (this.$exitBtn.contains(e.target)) return toggleClicksEnabled.call(this);
      e.preventDefault();
      e.stopPropagation();
      return true;
    }

    if (document.disableFunction) {
      document.removeEventListener('click', document.disableFunction, true);
      document.removeEventListener('mousedown', document.disableFunction, true);
      document.removeEventListener('mouseup', document.disableFunction, true);
      document.disableFunction = null;
    }

    if (allowed && allowed instanceof Element) {
      document.disableFunction = disableClicks.bind(this);
      document.addEventListener('click', document.disableFunction, true);
      document.addEventListener('mousedown', document.disableFunction, true);
      document.addEventListener('mouseup', document.disableFunction, true);
    }
  }

  var substeps = [{
    target: 'tutorialExitBtn',
    description: "\n      <p>Click this button at any time to exit this tutorial.</p>\n    "
  }, {
    target: 'wfeditor',
    description: "\n      <p>This is the editor and preview section. This section allows you to compose and edit your email.</p>\n    "
  }, {
    target: 'controller',
    description: "\n      <p>These buttons allow you to manipulate your email in a broad manner, similar to the File menu in most programs.</p>\n    "
  }, {
    target: 'metaDisplayCtn',
    description: "\n      <p>You can see important info about your email here, such as its title.</p>\n    "
  }, {
    target: 'helpBtnCtn',
    description: "\n      <p>Click this button if you ever need help with ISA Easy Email or if you would like to go through this tutorial again.</p>\n    "
  }];
  function layoutOverview() {
    var currentIndex = 0;
    var nextBtn = generateStandardButton('Continue');
    toggleClicksEnabled.call(this, nextBtn);

    var next = function next() {
      if (currentIndex === 0) this.$window.classList.remove('vertical-center');

      if (!substeps[currentIndex]) {
        toggleClicksEnabled.call(this);
        return this.nextStep();
      }

      var target = document.getElementById(substeps[currentIndex].target);
      this.highlight(target);
      this.positionWindow(target);
      this.$window.innerHTML = substeps[currentIndex].description;
      this.$window.appendChild(nextBtn);
      currentIndex += 1;
      return null;
    };

    nextBtn.addEventListener('click', next.bind(this));
    this.$window.innerHTML = "\n    <h1>Welcome!</h1>\n    <p>\n      This tutorial is designed to take you through the core features and\n      functions of the ISA Easy Email Generator. We'll start with a basic\n      overview of the layout of the page. Click \"Continue\" below to begin.\n    </p>\n  ";
    this.$window.appendChild(nextBtn);
    this.centerWindow();
  }

  var editorOverview = (function init() {
    var editor;
    var editBtns;
    var insertBtns;
    var firstEditorPar; // An Array of the substeps through which the user will proceed

    var substeps = [];
    var currentStep = 0; // Reusable button to proceed to the next substep

    var nextBtn = generateStandardButton('Next'); // Length of time in ms which the demo will display the effects of each edit button

    var demoButtonDuration = 750;
    var demoButtonInitialDelay = 250;
    /**
     * selectNodeContents - Selects the contents of the given node.
     *
     * @param {Element} node The HTML Element to select.
     *
     */

    function selectNodeContents(node) {
      var sel = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(node);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    /**
     * selectFirstParagraphContents - Finds and selects the very first paragraph
     *  in the editor.
     *
     */


    function selectFirstParagraphContents() {
      firstEditorPar = editor.firstChild.firstChild;
      selectNodeContents(firstEditorPar);
    }
    /**
     * nextSubStep - Proceed to the next substep in the substeps array. If the
     *  user is at the final substep, this function calls the overarching nextStep
     *  function to proceed to the next section.
     *
     */


    function nextSubStep() {
      currentStep += 1;
      if (!substeps[currentStep]) return this.nextStep();
      substeps[currentStep].call(this);
      return null;
    }
    /**
     * prepNextBtn - Prepares the nextBtn to be used. This must be called each
     *  time the nextBtn is to be used. Otherwise, the current step will be set to
     *  a previous value if the user exits then relaunches the tutorial.
     *
     */


    function prepNextBtn() {
      if (nextBtn.handler) {
        nextBtn.removeEventListener('click', nextBtn.handler);
      }

      nextBtn.handler = nextSubStep.bind(this);
      nextBtn.addEventListener('click', nextBtn.handler);
    }
    /**
     * getEditButtons - Finds all buttons in the edit toolbar in the document.
     *  Returns these buttons in an object.
     *
     */


    function getEditButtons() {
      return {
        bold: document.querySelector('[title="Bold Selection"]'),
        italic: document.querySelector('[title="Italicize Selection"]'),
        heading: document.querySelector('[title="Wrap Selection with Heading"]'),
        link: document.querySelector('[title="Wrap Selection with Link"]')
      };
    }
    /**
     * getInsertButtons - Finds all buttons in the insert toolbar in the document.
     *  Returns these buttons in an object.
     *
     */


    function getInsertButtons() {
      return {
        image: document.querySelector('[title="Insert an Image"]'),
        line: document.querySelector('[title="Insert a Horizontal Rule"]')
      };
    }
    /**
     * toggleClicksEnabled - Disables or enables click, mousedown, and mouseup
     *  events in the document. Clicks are always enabled for the exit button and
     *  can be enabled for a given HTML element (the allowed parameter).
     *
     * @param {Element} allowed An HTML Element which should still be clickable.
     *
     */


    function toggleClicksEnabled(allowed) {
      function disableClicks(e) {
        if (allowed instanceof Element && allowed.contains(e.target)) return false;
        if (this.$exitBtn.contains(e.target)) return toggleClicksEnabled.call(this);
        e.preventDefault();
        e.stopPropagation();
        return true;
      }

      if (document.disableFunction) {
        document.removeEventListener('click', document.disableFunction, true);
        document.removeEventListener('mousedown', document.disableFunction, true);
        document.removeEventListener('mouseup', document.disableFunction, true);
        document.disableFunction = null;
      } else {
        document.disableFunction = disableClicks.bind(this);
        document.addEventListener('click', document.disableFunction, true);
        document.addEventListener('mousedown', document.disableFunction, true);
        document.addEventListener('mouseup', document.disableFunction, true);
      }
    }
    /**
     * intro - The introduction to the Editor. Displays a brief overview message.
     *
     */


    substeps[0] = function intro() {
      this.$window.innerHTML = "\n      <p>\n        Let's talk about the editor first. It allows you to easily compose an\n        email complete with images, links, and common styling elements.\n      </p>\n    ";
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };
    /**
     * tryTyping - This substep has the user try typing in the editor. The user
     *  must type in the targetText completely and exactly in order to proceed.
     *
     */


    substeps[1] = function tryTyping() {
      var targetText = 'Hello Students!';
      this.$window.innerHTML = "\n      <p>\n        Let's see what this thing can do! Try typing \"".concat(targetText, "\" in the editor.\n      </p>\n    ");

      var boundIsHelloStudents = function isHelloStudents() {
        if (firstEditorPar.textContent === targetText) {
          editor.removeEventListener('keyup', boundIsHelloStudents);
          nextSubStep.call(this);
        }
      }.bind(this);

      editor.addEventListener('keyup', boundIsHelloStudents);
    };
    /**
     * displayEditToolbar - This substep selects the just-entered text to display
     *  the edit toolbar. It then adds the next button to the window for the user
     *  to proceed.
     *
     */


    substeps[2] = function displayEditToolbar() {
      var _this = this;

      this.$window.innerHTML = "\n      <p>\n        Perfect. Did you notice I highlighted the text you entered?\n        Highlighting text will bring up the editing toolbar which allows you to\n        manipulate the text.\n      </p>\n    ";
      toggleClicksEnabled.call(this, nextBtn);
      setTimeout(function () {
        selectFirstParagraphContents();
        setTimeout(function () {
          prepNextBtn.call(_this);

          _this.$window.appendChild(nextBtn);
        }, demoButtonDuration);
      }, demoButtonInitialDelay);
    };
    /**
     * highlightBoldBtn - Highlights and demonstrates the bold button.
     *
     */


    substeps[3] = function highlightBoldBtn() {
      var _this2 = this;

      this.$window.innerHTML = "\n      <p>\n        The \"B\" button bolds your selection.\n      </p>\n    ";
      selectFirstParagraphContents();
      setTimeout(function () {
        // temporarily reenable clicks, click on bold button, disable clicks
        toggleClicksEnabled.call(_this2);
        editBtns.bold.click();
        toggleClicksEnabled.call(_this2);
        setTimeout(function () {
          toggleClicksEnabled.call(_this2);
          editBtns.bold.click();
          toggleClicksEnabled.call(_this2, nextBtn);

          _this2.$window.appendChild(nextBtn);
        }, demoButtonDuration);
      }, demoButtonInitialDelay);
      prepNextBtn.call(this);
      editBtns.bold.prevBorder = editBtns.bold.style.borderColor;
      editBtns.bold.style.borderColor = 'white';
    };
    /**
     * highlightItalicBtn - Highlights and demonstrates the italic button.
     *
     */


    substeps[4] = function highlightItalicBtn() {
      var _this3 = this;

      this.$window.innerHTML = "\n      <p>\n        The \"i\" button italicizes your selection.\n      </p>\n    ";
      selectFirstParagraphContents();
      setTimeout(function () {
        // temporarily reenable clicks, click on italic button, disable clicks
        toggleClicksEnabled.call(_this3);
        editBtns.italic.click();
        toggleClicksEnabled.call(_this3);
        setTimeout(function () {
          toggleClicksEnabled.call(_this3);
          editBtns.italic.click();
          toggleClicksEnabled.call(_this3, nextBtn);

          _this3.$window.appendChild(nextBtn);
        }, demoButtonDuration);
      }, demoButtonInitialDelay);
      prepNextBtn.call(this);
      editBtns.bold.style.borderColor = editBtns.bold.prevBorder;
      editBtns.italic.prevBorder = editBtns.italic.style.borderColor;
      editBtns.italic.style.borderColor = 'white';
    };
    /**
     * highlightHeadingBtn - Highlights and demonstrates the heading button. It
     *  does this by cycling through all heading options and back to normal.
     *
     */


    substeps[5] = function highlightHeadingBtn() {
      var _this4 = this;

      this.$window.innerHTML = "\n      <p>\n        The \"H\" button wraps your selection in a heading. There are two heading\n        styles to choose from. Clicking this button will cycle through the\n        heading and normal styles.\n      </p>\n    ";
      selectFirstParagraphContents();
      setTimeout(function () {
        // temporarily reenable clicks, click on heading button, disable clicks
        toggleClicksEnabled.call(_this4);
        editBtns.heading.click();
        toggleClicksEnabled.call(_this4, nextBtn);
        selectFirstParagraphContents();
        setTimeout(function () {
          selectFirstParagraphContents();
          toggleClicksEnabled.call(_this4);
          editBtns.heading.click();
          toggleClicksEnabled.call(_this4, nextBtn);
          selectFirstParagraphContents();
          setTimeout(function () {
            selectFirstParagraphContents();
            toggleClicksEnabled.call(_this4);
            editBtns.heading.click();
            toggleClicksEnabled.call(_this4, nextBtn);
            selectFirstParagraphContents();

            _this4.$window.appendChild(nextBtn);
          }, demoButtonDuration);
        }, demoButtonDuration);
      }, demoButtonInitialDelay);
      prepNextBtn.call(this);
      editBtns.italic.style.borderColor = editBtns.italic.prevBorder;
      editBtns.heading.prevBorder = editBtns.heading.style.borderColor;
      editBtns.heading.style.borderColor = 'white';
    };
    /**
     * highlightLinkBtn - Highlights and demonstrates the link button.
     *
     */


    substeps[6] = function highlightLinkBtn() {
      this.$window.innerHTML = "\n      <p>\n        The link button wraps your selection in a link. Pressing this button\n        will bring up an interface to insert your link. Just type or paste the URL,\n        press enter, and you're good to go!\n      </p>\n    ";
      selectFirstParagraphContents();
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      editBtns.heading.style.borderColor = editBtns.heading.prevBorder;
      editBtns.link.prevBorder = editBtns.link.style.borderColor;
      editBtns.link.style.borderColor = 'white';
    };
    /**
     * createHeading - Takes the user through the process of making their text
     *  into a heading. Disables all clicks except those on the heading button,
     *  then proceeds when the user clicks on the heading button.
     *
     */


    substeps[7] = function createHeading() {
      this.$window.innerHTML = "\n      <p>\n        Let's create a heading. Go ahead and click the heading button. (The one outlined in white.)\n      </p>\n      <p><i>Hint: if you can't see the editing toolbar, try selecting the text again</i></p>\n    ";
      toggleClicksEnabled.call(this);
      toggleClicksEnabled.call(this, editBtns.heading);
      /**
       * headingNextStep - Resets the heading button's style, reenables clicks,
       *  then moves on to the next substep.
       *
       */

      function headingNextStep() {
        editBtns.heading.style.borderColor = editBtns.heading.prevBorder;
        toggleClicksEnabled.call(this);
        editBtns.heading.removeEventListener('click', editBtns.heading.tutClickHandler);
        nextSubStep.call(this);
      }

      editBtns.heading.tutClickHandler = headingNextStep.bind(this);
      editBtns.heading.addEventListener('click', editBtns.heading.tutClickHandler);
      selectFirstParagraphContents();
      editBtns.link.style.borderColor = editBtns.link.prevBorder;
      editBtns.heading.prevBorder = editBtns.heading.style.borderColor;
      editBtns.heading.style.borderColor = 'white';
    };
    /**
     * goToNewLine - Has the user move to a new line in order to demonstrate the
     *  insert toolbar.
     *
     */


    substeps[8] = function goToNewLine() {
      this.$window.innerHTML = "\n      <p>\n        Cool, right? Let's throw an image into the mix now. First, press \"Enter\"\n        to go to a new line.\n      </p>\n    ";
      /**
       * checkForEnter - Checks if the user presses enter in the editor. If they do,
       *  proceeds to the next substep.
       *
       * @param {Event} e The click event to monitor.
       *
       */

      function checkForEnter(e) {
        if (e.key === 'Enter') {
          nextSubStep.call(this);
          editor.removeEventListener('keyup', editor.tutKeyListener);
        }
      }

      editor.tutKeyListener = checkForEnter.bind(this);
      editor.addEventListener('keyup', editor.tutKeyListener);
    };
    /**
     * startAddImage - Has the user start to add an image to their email.
     *
     */


    substeps[9] = function startAddImage() {
      this.$window.innerHTML = "\n      <p>\n        Are you on a new line? Is it empty? Awesome! You should now see the\n        insert toolbar. This toolbar allows you to insert an image or a horizontal\n        rule (a line to separate sections).\n      </p>\n      <p>\n        To add an image, click the image button (it's highlighted in white).\n      </p>\n      <p><i>If you don't see the insert toolbar make sure you are on an empty line.</i></p>\n    ";
      toggleClicksEnabled.call(this, insertBtns.image);

      function imageClickHandler() {
        insertBtns.image.style.borderColor = insertBtns.image.prevBorder;
        insertBtns.image.removeEventListener('click', insertBtns.image.tutClickHandler);
        toggleClicksEnabled.call(this);
        nextSubStep.call(this);
      }

      insertBtns.image.tutClickHandler = imageClickHandler.bind(this);
      insertBtns.image.addEventListener('click', insertBtns.image.tutClickHandler);
      insertBtns.image.prevBorder = insertBtns.image.style.borderColor;
      insertBtns.image.style.borderColor = 'white';
    };
    /**
     * endAddImage - Has the user finish up adding an image to their email.
     *
     */


    substeps[10] = function endAddImage() {
      this.positionWindow(editor);
      var imgURL = 'http://studiesabroad.com/html-email-files/images/scot.jpg';
      this.$window.innerHTML = "\n      <p>\n        Notice how the toolbar changed? You can now type or paste the url for\n        the image you would like to add. Go ahead and copy and paste the URL below,\n        then press enter.\n      </p>\n      <p>\n        ".concat(imgURL, "\n      </p>\n    ");
      var atAltText = false;

      function enterHandler(e) {
        if (e.key !== 'Enter') return;

        if (!atAltText) {
          atAltText = true;
          this.$window.innerHTML = "\n          <p>\n            Now that you've entered the URL, you need to add the alt text. Your\n            alt text should describe what the image is supposed to convey. For\n            instance, you could put the following alt text in for the image you\n            are adding:\n          </p>\n          <p>\"The beautifully jagged landscape of Scotland at sunrise.\"</p>\n          <p>\n            Copy and paste the example text above and press enter again to\n            finalize your image.\n          </p>\n          <p><i>If you loose the insert toolbar, just click on the empty line,\n          then click the image icon and repaste the url:<br/><br/>\n          ".concat(imgURL, "</i></p>\n        ");
        } else {
          editor.removeEventListener('keyup', editor.tutEnterHandler);
          this.$window.innerHTML = "\n          <p>\n            Alt text is <strong>VERY</strong> important because it is displayed when\n            the image doesn't load. This is important because many email clients\n            disable automatic image loading by default and because those with\n            visual impairments rely on the alt text to know what the image is\n            supposed to convey.\n          </p>\n        ";
          prepNextBtn.call(this);
          this.$window.appendChild(nextBtn);
        }
      }

      editor.tutEnterHandler = enterHandler.bind(this);
      editor.addEventListener('keyup', editor.tutEnterHandler);
    };
    /**
     * wrapUp - Tell users how to delete images and add links.
     *
     */


    substeps[11] = function wrapUp() {
      this.$window.innerHTML = "\n      <p>\n        Our email is looking pretty good, now, isn't it? If you decide you don't\n        like the image or anything else, you can just click in the line below it\n        and press \"Backspace.\" Oh, and remember that adding links is similar to\n        adding images: just choose the text you want to use as your link, press\n        the link button, and paste or type the URL to which you want to link.\n      </p>\n    ";
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };
    /**
     * end - Finish the Editor section of the tutorial. Have user move on to the
     *  next section.
     *
     */


    substeps[12] = function end() {
      this.$window.innerHTML = "\n      <p>\n        That just about wraps up the Editor section of this tutorial. There's a\n        lot more to explore though so take some time after this tutorial to play\n        around with it! In the meantime, click \"Next\" below to continue to the\n        next section of this tutorial.\n      </p>\n    ";
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };

    function main() {
      prepNextBtn.call(this);
      editor = document.getElementById('wfeditor');
      editBtns = getEditButtons();
      insertBtns = getInsertButtons();
      firstEditorPar = editor.querySelector('.wf__text-section');
      this.highlight(editor);
      this.positionWindow(editor);
      currentStep = 0;
      substeps[0].call(this);
    }

    return main;
  })();

  var controllerOverview = (function init() {
    var substeps = [];
    var currentStep = 0;
    var controller;
    var controllerBtns;
    var mainModal;
    var nextBtn = generateStandardButton('Next');
    /**
     * getControllerAndButtons - map the Controller and its buttons to variables.
     *
     */

    function getControllerAndButtons() {
      controller = document.getElementById('controller');
      controllerBtns = {
        startOver: document.getElementById('startoverBtn'),
        copyCode: document.getElementById('copyCodeBtn'),
        saveLoad: document.getElementById('saveLoadBtn'),
        settings: document.getElementById('settingsBtn')
      };
    }
    /**
     * nextSubStep - Proceed to the next substep in the substeps array. If the
     *  user is at the final substep, this function calls the overarching nextStep
     *  function to proceed to the next section.
     *
     */


    function nextSubStep() {
      currentStep += 1;
      if (!substeps[currentStep]) return this.nextStep();
      substeps[currentStep].call(this);
      return null;
    }
    /**
     * prepNextBtn - Prepares the nextBtn to be used. This must be called each
     *  time the nextBtn is to be used. Otherwise, the current step will be set to
     *  a previous value if the user exits then relaunches the tutorial.
     *
     */


    function prepNextBtn(handler) {
      if (nextBtn.handler) {
        nextBtn.removeEventListener('click', nextBtn.handler);
      }

      var finalHandler;

      if (handler && typeof handler === 'function') {
        finalHandler = handler.bind(this);
      } else {
        finalHandler = nextSubStep.bind(this);
      }

      nextBtn.handler = finalHandler;
      nextBtn.addEventListener('click', nextBtn.handler);
    }
    /**
     * openModalListener - Generates the listener for buttons which open up
     *  modals. Makes sure the tutorial window is positioned properly and that
     *  the user can interact with the modal. This function generates the actual
     *  listener and must be given the button to which the listener will be attached.
     *
     * @param {HTML Element} target The HTML Button to which the listener will be
     *  attached.
     *
     * @returns {Function} The listener to attach to the button.
     */


    function openModalListener(target) {
      var targetBtn = target;
      return function innerListener() {
        var _this = this;

        this.highlight(mainModal);
        this.minimizeOverlay();
        targetBtn.removeEventListener('click', targetBtn.tutClickHandler);
        toggleClicksEnabled.call(this);
        this.$window.display = 'none';
        setTimeout(function () {
          _this.$window.display = 'block';

          _this.positionWindow(mainModal);
        }, 100);
        nextSubStep.call(this);
      }.bind(this);
    }
    /**
     * closeModalListener - Generates the listener for buttons which close modals.
     *  Essentially disables all clicks, repositions the tutorial overlay, and
     *  calls the next step.
     *
     * @returns {Function} The listener to attach to the button.
     */


    function closeModalListener(close) {
      var closeBtn = close;
      return function innerListener() {
        this.maximizeOverlay();
        toggleClicksEnabled.call(this);
        closeBtn.removeEventListener('click', closeBtn.tutClickHandler);
        nextSubStep.call(this);
      }.bind(this);
    }
    /**
     * intro - Provides a brief overview of the Controller section.
     *
     */


    substeps[0] = function intro() {
      this.$window.innerHTML = "\n      <p>\n        This is the Controller. It provides broad functionality that affects the\n        editor and/or your email as a whole.\n      </p>\n    ";
      toggleClicksEnabled.call(this, nextBtn);
      this.positionWindow(controller);
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };
    /**
     * startOver - Provides a brief overview of the Start Over button.
     *
     */


    substeps[1] = function startOver() {
      this.$window.innerHTML = "\n      <p>\n        The \"Start Over\" button has a fairly obvious purpose. Just be careful as\n        you will loose all your work if you press it.\n      </p>\n    ";
      this.positionWindow(controllerBtns.startOver);
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };
    /**
     * copyCodeOverview - Provides a brief overview of the Copy Code button.
     *
     * @returns {type} Description
     */


    substeps[2] = function copyCodeOverview() {
      this.$window.innerHTML = "\n      <p>\n        The \"Copy Code\" button will copy the source code of your email to your\n        clipboard so you can paste it into the GRS HTML Template editor.\n      </p>\n    ";
      this.positionWindow(controllerBtns.copyCode);
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };
    /**
     * copyCodeOpen - Prompts the user to click the Copy Code button to view the
     *  copy code interface. Disables all clicks but on the copy code button.
     *
     */


    substeps[3] = function copyCodeOpen() {
      this.$window.innerHTML = "\n      <p>Go ahead and give the \"Copy Code\" button a click to see what happens.</p>\n    ";
      toggleClicksEnabled.call(this, controllerBtns.copyCode);
      controllerBtns.copyCode.tutClickHandler = openModalListener.call(this, controllerBtns.copyCode);
      controllerBtns.copyCode.addEventListener('click', controllerBtns.copyCode.tutClickHandler);
    };
    /**
     * copyCodeInterface - Demonstrates the functionality of the copy code
     *  interface.
     *
     */


    substeps[4] = function copyCodeInterface() {
      this.$window.innerHTML = "\n      <p>\n        This is the code copying interface. ISA Easy Email will attempt to copy\n        the code straight to your clipboard as soon as you click the \"Copy Code\"\n        button but this doesn't always work due to browser settings (especially\n        Firefox).\n      </p>\n      <p>\n        Regardless, you can view and copy the code in the textbox here. You can\n        try to copy again using the \"Copy\" button or you can right-click to copy\n        the text straight from the textbox.\n      </p>\n      <p>\n        Press \"Close\" to continue.\n      </p>\n    ";
      var closeBtn = mainModal.lastChild.lastChild;
      closeBtn.tutClickHandler = closeModalListener.call(this, closeBtn);
      closeBtn.addEventListener('click', closeBtn.tutClickHandler);
      toggleClicksEnabled.call(this, closeBtn);
    };
    /**
     * saveLoadOverview - Provides a basic overview of the save and load
     *  functionality.
     *
     */


    substeps[5] = function saveLoadOverview() {
      this.$window.innerHTML = "\n      <p>\n        The \"Save / Load\" button, you guessed it, let's you save your email or\n        load up previous emails! This is super helpful if you want to share a\n        template with someone else or if you want to come back to your email\n        later.\n      </p>\n    ";
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      toggleClicksEnabled.call(this, nextBtn);
      this.highlight(controller);
      this.positionWindow(controllerBtns.saveLoad);
    };

    substeps[6] = function settingsOverview() {
      this.$window.innerHTML = "\n      <p>\n        The \"Settings\" button allows you to adjust a few settings in the email.\n        Go ahead and give it a click.\n      </p>\n    ";
      controllerBtns.settings.tutClickHandler = openModalListener.call(this, controllerBtns.settings);
      controllerBtns.settings.addEventListener('click', controllerBtns.settings.tutClickHandler);
      toggleClicksEnabled.call(this, controllerBtns.settings);
      this.positionWindow(controllerBtns.settings);
    };

    substeps[7] = function settingsInterface() {
      this.$window.innerHTML = "\n      <p>\n        Here you can see the settings you can adjust within your email.\n      </p>\n    ";
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      toggleClicksEnabled.call(this, nextBtn);
    };

    substeps[8] = function emailTitle() {
      this.$window.innerHTML = "\n      <p>\n        The Email Title allows you to easily keep track of your ISA Easy Email\n        files. Your email is automatically given a title based on the date and\n        time it was created but you can change it here. The title of the current\n        email is displayed in the bottom right of the screen and is used as the\n        name of the file when you save your work.\n      </p>\n      <p>\n        <i>Recipients of the email won't see the title.</i>\n      </p>\n    ";
      var emailTitleField = mainModal.querySelector('.settingsField');
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      toggleClicksEnabled.call(this, nextBtn);
      this.positionWindow(emailTitleField);
    };

    substeps[9] = function changeTitle() {
      var targetText = 'Fun Tutorial Email';
      this.$window.innerHTML = "\n      <p>\n        Let's try changing the Email Title to something more useful. Try\n        changing it to the following:\n      </p>\n      <p>\n        \"".concat(targetText, "\"\n      </p>\n    ");
      var emailTitleField = mainModal.querySelector('.settingsField');
      var emailInput = emailTitleField.querySelector('input');

      function titleIsTarget() {
        if (emailInput.value === targetText) {
          emailInput.removeEventListener('keyup', emailInput.tutKeyHandler);
          nextSubStep.call(this);
        }
      }

      emailInput.tutKeyHandler = titleIsTarget.bind(this);
      emailInput.addEventListener('keyup', emailInput.tutKeyHandler);
      toggleClicksEnabled.call(this, emailTitleField);
    };

    substeps[10] = function linkOverview() {
      this.$window.innerHTML = "\n      <p>\n        Perfect. The following fields allow you to manipulate the two large\n        buttons at the bottom of the email. These buttons provide links to a\n        place to book an advising session (eg. SimpleBook.me) and to the online\n        application. They have default values but you can choose to override\n        them here.\n      </p>\n    ";
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
      toggleClicksEnabled.call(this, nextBtn);
    };

    substeps[11] = function switchingLinks() {
      this.$window.innerHTML = "\n      <p>\n        For instance, let's say we <strong>don't</strong> want to include an\n        advising session link but <strong>do</strong> want to provide a link to\n        an online application, but at a new location.\n      </p>\n      <p>\n        First, let's get rid of that advising session link. You can remove it by\n        clicking the toggle switch after \"Include Advising Session Link\". Try\n        this now.\n      </p>\n    ";
      var advisingSeshField = mainModal.querySelectorAll('.settingsField')[1];
      var advisingSeshSwitch = advisingSeshField.querySelector('.switch');

      function changeToggle(e) {
        e.target.removeEventListener('change', e.target.tutChangeHandler);
        nextSubStep.call(this);
      }

      advisingSeshSwitch.tutChangeHandler = changeToggle.bind(this);
      advisingSeshSwitch.addEventListener('change', advisingSeshSwitch.tutChangeHandler);
      toggleClicksEnabled.call(this, advisingSeshField);
      this.highlight(advisingSeshField);
      this.positionWindow(advisingSeshField);
    };

    substeps[12] = function editingLinkURLs() {
      var targetText = 'google.com';
      this.$window.innerHTML = "\n      <p>\n        Did you notice how the text box for the advising session URL went away?\n        Once you hit save the link itself will be removed from the email, too.\n        Pretty neat, right?\n      </p>\n      <p>\n        Now let's change the URL for the link to the online application. We'll\n        just set it to something easy, like google for now. Change the contents\n        of the Application Link URL box to say \"".concat(targetText, "\".\n      </p>\n    ");
      var applicationLinkField = mainModal.querySelectorAll('.settingsField')[2];
      var applicationLinkTextBox = applicationLinkField.querySelector('input[type="text"]');

      function isCorrectURL() {
        if (applicationLinkTextBox.value === targetText) {
          applicationLinkTextBox.removeEventListener('keyup', applicationLinkTextBox.tutKeyHandler);
          nextSubStep.call(this);
        }
      }

      applicationLinkTextBox.tutKeyHandler = isCorrectURL.bind(this);
      applicationLinkTextBox.addEventListener('keyup', applicationLinkTextBox.tutKeyHandler);
      this.highlight(applicationLinkField);
      this.positionWindow(applicationLinkField);
      toggleClicksEnabled.call(this, applicationLinkTextBox);
    };

    substeps[13] = function thatsIt() {
      this.$window.innerHTML = "\n      <p>\n        Awesome! Now click \"Save\" to save these settings.\n      </p>\n    ";
      var saveBtn = mainModal.lastChild.firstChild;
      saveBtn.tutClickHandler = closeModalListener.call(this, saveBtn);
      saveBtn.addEventListener('click', saveBtn.tutClickHandler);
      toggleClicksEnabled.call(this, saveBtn);
    };

    substeps[14] = function wrapUp() {
      this.$window.innerHTML = "\n      <p>\n        That's it for the controller section. Check out the email now: it only\n        has the application link. You should also notice that the title in the\n        bottom right of the corner has changed.\n      </p>\n    ";
      toggleClicksEnabled.call(this);
      this.positionWindow(controller);
      prepNextBtn.call(this);
      this.$window.appendChild(nextBtn);
    };

    function main() {
      getControllerAndButtons();
      this.highlight(controller);
      mainModal = document.getElementById('main-modal');
      substeps[0].call(this);
      return null;
    }

    return main;
  })();

  function wrapUp() {
    var closeBtn = generateStandardButton('Exit Tutorial');
    closeBtn.addEventListener('click', this.hide.bind(this));
    this.$window.innerHTML = "\n    <h1>And That's It!</h1>\n    <p>\n      Hopefully this tutorial has given you a bit of insight into how to\n      effectively use ISA Easy Email. I encourage you to play around with the\n      editor and explore all its functionality! You should also read the \"GRS\n      Help\" and \"Images Help\" in the Help section so you can take full advantage\n      of ISA Easy Email!\n    </p>\n  ";
    this.$window.appendChild(closeBtn);
    this.centerWindow();
  }

  var windowPosOffset = 20;
  var currentStep = 0;
  /**
   * Tutorial - A walkthrough of the features of the ISA Easy Email Generator.
   *  This tutorial operates by placing an overlay over the entire screen and
   *  highlighting one component at a time while annotating with a popout box. It
   *  does this by iterating through the 'steps' property, which is an Array of
   *  functions which manipulate the popout and highlighted elements to take the
   *  user through each function.
   */

  var Tutorial = {
    $overlay: generateElement$1('div', {
      klasses: ['modal-overlay', 'tutorial-overlay']
    }),
    $window: generateElement$1('div', {
      klasses: ['tutorial-window']
    }),
    $exitBtn: generateStandardButton('&times;', {
      klasses: ['tutorial-exit'],
      id: 'tutorialExitBtn'
    }),
    steps: [],
    minimizedOverlayStyle: {
      position: 'static',
      width: '1px',
      height: '1px',
      zIndex: '1'
    },

    /**
     * init - Initialize the Tutorial.
     *
     */
    init: function init() {
      currentStep = 0;
      this.$exitBtn.addEventListener('click', this.hide.bind(this));
      this.$overlay.appendChild(this.$exitBtn);
      this.$overlay.appendChild(this.$window);
      document.body.appendChild(this.$overlay);
      return this;
    },

    /**
     * beginTutorial - Begins the tutorial by calling the first step.
     *
     */
    beginTutorial: function beginTutorial() {
      this.resetWindowPosition();
      currentStep = 0;
      this.display();
      this.steps[currentStep].call(this);
    },

    /**
     * nextStep - Move to the next step in the tutorial process.
     *
     */
    nextStep: function nextStep() {
      currentStep += 1;
      if (!this.steps[currentStep]) return this.hide();
      this.steps[currentStep].call(this);
      return null;
    },

    /**
     * resetWindowPosition - Reset the position of the tutorial popout window.
     *
     */
    resetWindowPosition: function resetWindowPosition() {
      this.$window.style.left = '';
      this.$window.style.right = '';
      this.$window.style.top = '';
      this.$window.style.bottom = '';
      if (this.$window.classList.contains('vertical-center')) this.$window.classList.remove('vertical-center');
    },

    /**
     * positionWindow - Position the tutorial popout window to display next to the
     *  given HTML Element.
     *
     * @param {type} target Description
     *
     * @returns {type} Description
     */
    positionWindow: function positionWindow(target) {
      var modalRect = this.$window.getBoundingClientRect();
      var targetRect = target.getBoundingClientRect();
      this.resetWindowPosition();

      if (window.innerWidth - modalRect.width > targetRect.right) {
        this.$window.style.left = targetRect.right + windowPosOffset;
      } else {
        this.$window.style.right = window.innerWidth - targetRect.left + windowPosOffset;
      }

      if (targetRect.top + modalRect.height < window.innerHeight) {
        this.$window.style.top = targetRect.top;
      } else {
        this.$window.style.bottom = windowPosOffset;
      }
    },

    /**
     * highlight - Highlights the given target by bringing it above the overlay.
     *
     * @param {HTML Element} target The Element to highlight.
     *
     */
    highlight: function highlight(target) {
      this.releaseHighlighted();
      this.highlightedHTML = target;

      if (target.id === 'wfeditor') {
        this.highlightedHTML.style.background = 'white';
      }

      this.highlightedHTML.prevPos = this.highlightedHTML.style.position;
      this.highlightedHTML.prevZ = this.highlightedHTML.style.zIndex;

      if (this.highlightedHTML.id === 'controller') {
        this.highlightedHTML.style.position = 'absolute';
      } else if (this.highlightedHTML.id === 'wfeditor') {
        this.highlightedHTML.style.position = 'relative';
      }

      this.highlightedHTML.style.zIndex = '10';
    },

    /**
     * releaseHighlighted - Releases the currently highlighted element, if there
     *  is one. It does this by setting its position and zIndex to their previous
     *  values.
     *
     */
    releaseHighlighted: function releaseHighlighted() {
      if (this.highlightedHTML) {
        this.highlightedHTML.style.position = this.highlightedHTML.prevPos;
        this.highlightedHTML.style.zIndex = this.highlightedHTML.prevZ;
        if (this.highlightedHTML.id === 'wfeditor') this.highlightedHTML.style.background = '';
      }
    },

    /**
     * display - Display the tutorial.
     *
     */
    display: function display() {
      this.$overlay.style.display = 'block';
    },

    /**
     * hide - Hide the tutorial.
     *
     */
    hide: function hide() {
      this.releaseHighlighted();
      this.$overlay.style.display = 'none';
      window.location.reload();
    },

    /**
     * minimizeOverlay - Make the overlay minimized. That is to say, make is so
     *  the main modal window can be displayed in the tutorial with the tutorial
     *  modal alongside it.
     *
     */
    minimizeOverlay: function minimizeOverlay() {
      var _this = this;

      Object.keys(this.minimizedOverlayStyle).forEach(function (prop) {
        _this.$overlay.style[prop] = _this.minimizedOverlayStyle[prop];
      });
      this.$window.style.zIndex = '1000';
    },

    /**
     * maximizeOverlay - Make the overlay cover the entire screen again.
     *
     */
    maximizeOverlay: function maximizeOverlay() {
      this.$overlay.style = '';
      this.$overlay.style.display = 'block';
    },

    /**
     * centerWindow - Centers the modal window vertically and horizontally.
     *
     */
    centerWindow: function centerWindow() {
      this.$window.classList.add('vertical-center');
      this.$window.style = '';
    }
  };
  Tutorial.steps[0] = layoutOverview;
  Tutorial.steps[1] = editorOverview;
  Tutorial.steps[2] = controllerOverview;
  Tutorial.steps[3] = wrapUp;

  /*
   ######   ########   ######     ##     ## ######## ##       ########
  ##    ##  ##     ## ##    ##    ##     ## ##       ##       ##     ##
  ##        ##     ## ##          ##     ## ##       ##       ##     ##
  ##   #### ########   ######     ######### ######   ##       ########
  ##    ##  ##   ##         ##    ##     ## ##       ##       ##
  ##    ##  ##    ##  ##    ##    ##     ## ##       ##       ##
   ######   ##     ##  ######     ##     ## ######## ######## ##
  */
  var grsHelpSteps = [];
  grsHelpSteps[0] = ['1. Open GRS\'s HTML Template Editor', "\n  <p>\n    Your first step in sending your email through GRS is creating a template\n    shell to contain your email content. To start, navigate to the\n    <a href=\"https://grs.studiesabroad.com/tools/\" target=\"_blank\">GRS Tools</a>\n    section. Then, click <a href=\"https://grs.studiesabroad.com/htmltemplate\" target=\"_blank\">\"HTML Template Editor\"</a>\n    (shown below).\n  </p>\n  <img class='img-max-width' src=\"./assets/images/grs-help/grs-tools.png\" alt=\"Location of the GRS HTML Template Editor.\">\n"];
  grsHelpSteps[1] = ['2. Create a New Template', "\n  <p>\n    You should now be in the HTML Template Editor seeing a screen similar to\n    that below. Click \"New Template\" at the top of the screen.\n  </p>\n  <img class='img-max-width' src=\"./assets/images/grs-help/template-landing.png\" alt=\"Initial screen of the GRS HTML Template Editor.\">\n  <p>\n    You should now see the screen below. Click \"Standar Email\" to begin creating\n    your template shell.\n  </p>\n  <img class='img-max-width' src=\"./assets/images/grs-help/new-template.png\" alt=\"Creating a Standar Email\">\n"];
  grsHelpSteps[2] = ['3. Complete Template Settings', "\n  <p>\n    You are now ready to begin creating your template. You will see a screen\n    like the one below. Fill out the information as laid out below:\n  </p>\n  <dl>\n    <dt>Template Name</dt>\n    <dd>\n      Choose a descriptive name for your email. This is for internal use only\n      and won't be visible to anyone receiving the email.\n    </dd>\n    <dt>Business Division</dt>\n    <dd>Choose the appropriate business division (ISA, WSISACP, etc).</dd>\n    <dt>Category</dt>\n    <dd>\n      Choose the appropriate category (Interested Student, Admissions Email, etc).\n      Please note that different categories may have additional options in this\n      section (eg. Admissions Email have a subcategory option). Choose the options\n      best suited to your use case.\n    </dd>\n    <dt>Include Unsubscribe Link</dt>\n    <dd>Choose \"Yes\" - <strong>Always</strong> choose Yes.</dd>\n    <dt>Teplate Width (px)</dt>\n    <dd>Type in \"600\". It defaults to 650 but the format works best at 600px.</dd>\n    <dt>Template Status</dt>\n    <dd>Choose \"Active\".</dd>\n    <dt>When to Send</dt>\n    <dd>Choose the most appropriate option. In general, this will be \"Manual\".</dd>\n    <dt>Email To</dt>\n    <dd>Again, choose the most appropriate option. In general, this will be \"Primary Email\".</dd>\n  </dl>\n  <p>\n    Your setting should now look something like the image below. You now move on\n    to the next step. Click on \"Header\" at the top. Do <strong>not</strong> click \"Save\".\n    </p>\n  <img class='img-max-width' src=\"./assets/images/grs-help/template-settings.png\" alt=\"Initial template settings\">\n"];
  grsHelpSteps[3] = ['4. Add Email Headers', "\n  <p>\n    Headers are what keeps our HTML emails uniform and identifiable. As such,\n    it is important that we include them on every email we send. After clicking\n    \"Header\" at the top, you will be brought to a screen with several check boxes.\n    Check the boxes so your settings look like the image below:\n  </p>\n  <img class='img-max-width' src=\"./assets/images/grs-help/header-options.png\" alt=\"Appropriate header options\">\n  <p>\n    Ensure \"Use General Header?\" and \"Use General Footer?\" are both checked. Once\n    you check \"Use General Header?\" you will be presented with options for\n    choosing the Google Campaign Name, Campaign Source, and Campaign Medium. These\n    are used by marketing to track the success of email campaigns. You should\n    coordinate with the marketing department to determine the best values of these\n    fields for your email.\n  </p>\n  <p>\n    Once your settings look similar to those above, move on to the next step by\n    clicking \"Content\" at the top of the page. Do <strong>not</strong> click \"Save\".\n  </p>\n"];
  grsHelpSteps[4] = ['5. Finish the Template Shell', "\n  <p>\n    Clicking \"Content\" at the top of the page will bring you to the standard\n    interface for adding content to your email. This is the interface we are\n    circumventing by using the ISA Easy Email Generator. However, we still need\n    to use it actually insert our generated content into the email in GRS.\n  </p>\n  <p>Start by filling out the Email Subject, Preview, and Title fields as follows:</p>\n  <dl>\n    <dt>Email Subject</dt>\n    <dd>This is the subject of your email. Your subject should be captivating but concise.</dd>\n    <dt>Email Preview</dt>\n    <dd>\n      This is the small blurb displayed to recipients in their email client\n      before actually opening the email. You should write a sentence or two here\n      which summarizes your email and/or entices your recipient to open your email.\n    </dd>\n    <dt>Email Title</dt>\n    <dd>\n      In general, leave this blank. This will insert a large title at the very\n      beginning of your email (before even the header).\n    </dd>\n  </dl>\n  <p>\n    To finish your template shell, you should enter a word or two in the \"Body\"\n    section. This will allow you to finally click that \"Save\" button and have\n    GRS save your email template. Remember the template title so you can find it\n    later.\n  </p>\n"];
  grsHelpSteps[5] = ['6. Insert Your Content', "\n  <p>\n    Once your Template Shell is created in GRS, you are ready to compose your\n    email in the ISA Easy Email Generator. To do this, simply press \"Copy Code\"\n    in the ISA Easy Email Generator to copy the source code of the contents of\n    your email. Then, navigate to the \"Content\" section of your Template Shell in\n    GRS, click the \"<>Source\" button in the Body section, and paste your email\n    in the body section (see image below). Click \"Save\" and your email's contents will be saved in\n    GRS. Click \"Preview\" at the top to ensure your email has been successfully\n    saved.\n  </p>\n  <img class='img-max-width' src=\"./assets/images/grs-help/insert-source.png\" alt=\"Inserting source code into the GRS HTML Template Editor.\">\n"];
  /*
  #### ##     ##    ###     ######   ########    ##     ## ######## ##       ########
   ##  ###   ###   ## ##   ##    ##  ##          ##     ## ##       ##       ##     ##
   ##  #### ####  ##   ##  ##        ##          ##     ## ##       ##       ##     ##
   ##  ## ### ## ##     ## ##   #### ######      ######### ######   ##       ########
   ##  ##     ## ######### ##    ##  ##          ##     ## ##       ##       ##
   ##  ##     ## ##     ## ##    ##  ##          ##     ## ##       ##       ##
  #### ##     ## ##     ##  ######   ########    ##     ## ######## ######## ##
  */

  var imgHelpSteps = [];
  imgHelpSteps[0] = ['1. Preparing to Add Your Image', "\n  <p>\n    Before you can add any images to your email, you must first decide where they\n    are going to live. If you have found an image online (make sure it has a\n    license allowing for commercial use!) you can choose to either just copy its\n    address (right click > \"Copy image address\" or \"Copy Image Location\") and\n    paste it into the ISA Easy Email Generator. If you have an image saved to\n    your computer, it needs to be uploaded it to the ISA server. To do so, you must\n    first create a template shell in GRS's HTML Template editor. See the\n    \"GRS Help\" section to learn how to do this.\n  </p>\n  <p>\n    Once you have created your template shell, you will need to navigate to the\n    \"Content\" section of your template shell. From here, click the \"Image\" button\n    in the editor control panel (see below) to launch the Image Properties editor.\n  </p>\n  <img class=\"img-max-width\" src=\"assets/images/img-help/add-image-btn.png\" alt=\"Location of the Image button in the GRS HTML Template Editor.\">\n"];
  imgHelpSteps[1] = ['2. Uploading Your Image to the ISA Server', "\n  <p>\n    You should now see a window like that below. Click the \"Browse Server\" button\n    to launch the server file browser.\n  </p>\n  <img class=\"img-max-width\" src=\"./assets/images/img-help/image-properties-browse.png\" alt=\"The Image Properties box.\">\n  <p>\n    The File Browser (see below) functions similarly to that on Windows or Mac.\n    Choose the best folder in which to store your image, then click \"Upload\" in\n    the upper-left to upload your image. Once it has been uploaded, double click\n    it to select it and return to the \"Image Properties\" window.\n  </p>\n  <img class=\"img-max-width\" src=\"./assets/images/img-help/file-browser.png\" alt=\"GRS's image file browser\">\n"];
  imgHelpSteps[2] = ['3. Copying the Image URL', "\n  <p>\n    The \"Image Properties\" box should now have the URL to your image in its URL\n    box. Select the entire URL and copy it. You will paste this into the ISA\n    Easy Email Generator. Once you have copied the URL, click \"Cancel\" to close\n    the Image Properties window. You can now return to the ISA Easey Email Generator\n    to paste your image URL. You do not need to do anything else for your image\n    in GRS.\n  </p>\n  <img class=\"img-max-width\" src=\"./assets/images/img-help/copy-url.png\" alt=\"Copying the image URL from the Image Properties window\">\n"];
  /*
  ######## ##     ## ########   #######  ########  ########
  ##        ##   ##  ##     ## ##     ## ##     ##    ##
  ##         ## ##   ##     ## ##     ## ##     ##    ##
  ######      ###    ########  ##     ## ########     ##
  ##         ## ##   ##        ##     ## ##   ##      ##
  ##        ##   ##  ##        ##     ## ##    ##     ##
  ######## ##     ## ##         #######  ##     ##    ##
  */
  // Wraps each step in a div and returns it to the new array.

  function wrapHelpSteps(step) {
    var ctn = document.createElement('div');
    var innerCtn = document.createElement('div');
    var heading = document.createElement('h2');
    ctn.appendChild(heading);
    ctn.appendChild(innerCtn);

    var _step = _slicedToArray(step, 2);

    heading.textContent = _step[0];
    innerCtn.innerHTML = _step[1];
    ctn.classList.add('max-35');
    return ctn;
  }

  var GRSHelpSteps = grsHelpSteps.map(wrapHelpSteps);
  var IMGHelpSteps = imgHelpSteps.map(wrapHelpSteps);

  var descriptionHTML = "\n  <p>Welcome to the ISA Easy Email Generator! This editor is here to provide\n  a simple, easy-to-use tool to compose your HTML emails. Though this editor\n  offers an alternative to GRS's HTML template editor, you will still need to\n  use the GRS editor to actually create and send your email.</p>\n\n  <p>If it's your first time using this editor, please click the \"Tutorial\"\n  button below to learn about its features and how to use them. You should also\n  read the \"GRS Help\" and \"Images Help\" sections below to learn about how you\n  should create the GRS portion of your email and add images to the ISA server\n  for use here.</p>\n";
  var btnStyle = {
    display: 'block',
    padding: '2em 1rem',
    'margin-left': 'auto',
    'margin-right': 'auto',
    width: '20em'
  };

  function setModalBackButton() {
    var backText = 'Back to Help';
    this.modal.setSaveHandler(backText, this.display.bind(this));
  }

  var helpView = {
    $ctn: generateElement$1('div'),
    $heading: generateElement$1('h1', {
      textContent: 'Help'
    }),
    $description: generateElement$1('div', {
      innerHTML: descriptionHTML,
      style: {
        'text-align': 'left',
        'max-width': '35em',
        margin: '2em auto'
      }
    }),
    $tutorialBtn: generateStandardButton('Tutorial<br/>(unsaved progress will be lost)', {
      style: btnStyle
    }),
    $grsBtn: generateStandardButton('GRS Help', {
      style: btnStyle
    }),
    $imagesBtn: generateStandardButton('Images Help', {
      style: btnStyle
    }),

    /**
     * init - Initialize the helpView. Saves a reference to the moadl it will use
     *  and prepares the container to display in the modal.
     *
     * @param {Modal} modal The modal used to display the helpView.
     *
     * @returns {helpView} Returns this helpView.
     */
    init: function init(modal) {
      this.modal = modal;
      this.baseElements = [this.$heading, this.$description, this.$tutorialBtn, this.$grsBtn, this.$imagesBtn];
      this.tutorial = Object.create(Tutorial);
      this.tutorial.init();
      this.$tutorialBtn.addEventListener('click', this.startTutorial.bind(this));
      window.tut = this.tutorial;
      this.grsHelp = Object.create(SimpleHelp);
      this.grsHelp.init('Add and Send Your Email in GRS', GRSHelpSteps, this.modal);
      this.$grsBtn.addEventListener('click', this.displayGRSTutorial.bind(this));
      this.imgHelp = Object.create(SimpleHelp);
      this.imgHelp.init('Add Images to Your Email', IMGHelpSteps, this.modal);
      this.$imagesBtn.addEventListener('click', this.displayImagesTutorial.bind(this));
      this.setBaseView();
    },

    /**
     * startTutorial - Starts the live tutorial.
     *
     * @returns {type} Description
     */
    startTutorial: function startTutorial() {
      this.modal.hide();
      this.tutorial.beginTutorial();
    },

    /**
     * displayGRSTutorial - Display the GRS tutorial.
     *
     */
    displayGRSTutorial: function displayGRSTutorial() {
      this.modal.hide();
      setModalBackButton.call(this);
      this.grsHelp.render(0);
    },

    /**
     * displayImagesTutorial - Display the images tutorial.
     *
     */
    displayImagesTutorial: function displayImagesTutorial() {
      this.modal.hide();
      setModalBackButton.call(this);
      this.imgHelp.render(0);
    },

    /**
     * setBaseView - Sets the view to display the base information, that is to
     *  say, sets the view to display everything in the baseElements array. It
     *  also sets the modal savehandler to null which also hides the auxiliary
     *  button on the modal.
     *
     * @returns {type} Description
     */
    setBaseView: function setBaseView() {
      var _this = this;

      this.$ctn.innerHTML = '';
      this.baseElements.forEach(function (el) {
        return _this.$ctn.appendChild(el);
      });
      this.modal.setSaveHandler(null);
    },

    /**
     * display - Display the modal, passing in this.$ctn.
     *
     */
    display: function display() {
      this.setBaseView();
      this.modal.display(this.$ctn);
    }
  };

  var tutorialCookieTitle = 'ISAEasyEmailTutorial';
  var containerStyle = {
    'box-sizing': 'border-box',
    padding: '20px 5px',
    width: '600px'
  };
  var largeHeadingStyle = {
    'font-family': "'Helvetica', sans-serif",
    'font-weight': 'normal',
    'font-size': '24px',
    color: '#333',
    'padding-left': '10px',
    'padding-right': '10px'
  };
  var smallHeadingStyle = {
    'font-family': "'Helvetica', sans-serif",
    'font-weight': 'normal',
    'font-size': '20px',
    color: '#888',
    'padding-left': '10px',
    'padding-right': '10px'
  };
  var imgStyle = {
    'max-width': '100%',
    'text-align': 'center',
    margin: '1em auto'
  };
  var sectionStyle = {
    overflow: 'hidden',
    width: '100%',
    'padding-left': '10px',
    'padding-right': '10px',
    'box-sizing': 'border-box',
    'font-family': 'Times',
    'font-size': '16px',
    'line-height': '1.25em'
  };
  var options = {
    divOrPar: 'p',
    containerStyle: containerStyle,
    largeHeadingStyle: largeHeadingStyle,
    smallHeadingStyle: smallHeadingStyle,
    imgStyle: imgStyle,
    sectionStyle: sectionStyle,
    emptyPlaceholder: 'Compose your email here...'
  };

  function setButtons() {
    return {
      $startoverBtn: document.getElementById('startoverBtn'),
      $copyCodeBtn: document.getElementById('copyCodeBtn'),
      $saveLoadBtn: document.getElementById('saveLoadBtn'),
      $settingsBtn: document.getElementById('settingsBtn'),
      $helpBtn: document.getElementById('helpBtn')
    };
  }

  function checkTutorialCookie() {
    return Cookies.getItem(tutorialCookieTitle);
  }

  function setTutorialCookie() {
    var date = new Date();
    Cookies.setItem(tutorialCookieTitle, date.toUTCString());
  }

  var Controller = {
    docInfo: {
      fileType: DocumentFileType,
      dateCreated: generateCurrentDateString()
    },

    /**
     * init - Initialize the Controller object. The Controller object is what, in
     *  turn, initializes the editor and modalViews.
     *
     * @returns {Controller} Returns this.
     */
    init: function init() {
      // Initialize Controller HTML
      this.btns = setButtons();
      this.$copyTargetCtn = document.getElementById('copyTargetCtn');
      this.$copyTargetInnerCtn = document.getElementById('copyTargetInnerCtn');
      this.$copyTargetBottomBtns = document.getElementById('copyTarget-bottomBtns');
      this.$bottomBtns = document.getElementById('bottomBtns');
      this.$metaDisplay = document.getElementById('metaDisplay'); // Initialize the editor

      this.editorCtn = document.getElementById('wfeditor');
      this.editor = WriteFree(this.editorCtn, options); // Set the document meta data

      this.setDocInfo(); // Initialize the modal views. This must come after setDocInfo.

      this.initModalViews();
      document.addEventListener('click', this.buttonClickHandler.bind(this));
      window.ed = this.editor;
      window.docInfo = this.docInfo;

      if (!checkTutorialCookie()) {
        this.helpView.startTutorial();
        setTutorialCookie();
      }

      return this;
    },

    /**
     * initModalViews - Initialize the modal views.
     *
     */
    initModalViews: function initModalViews() {
      this.modal = Object.create(Modal);
      this.modal.init();
      this.settingsview = Object.create(SettingsView);
      this.settingsview.init(this.modal, this.docInfo);
      this.copyview = Object.create(CopyView);
      this.copyview.init(this.modal);
      this.saveLoadView = Object.create(saveLoadView);
      this.saveLoadView.init(this.modal, this.setDocInfo.bind(this), this.getDocInfo.bind(this));
      this.helpView = Object.create(helpView);
      this.helpView.init(this.modal);
    },

    /**
     * initDocInfo - Initialize the document info past what is done in property
     *  declarations above. The properties defined here are done so because they
     *  utilize getters and setters which must wait for other portions of the app
     *  to initialize before they can be set up.
     *
     */
    initDocInfo: function initDocInfo() {
      if (!this.docInfo.contents) {
        var closureEditor = this.editor; // docInfo.contents is linked up with the editor

        Object.defineProperty(this.docInfo, 'contents', {
          configurable: false,
          writeable: true,
          enumerable: true,
          get: function get() {
            return closureEditor.html(true);
          },
          set: function set(htmlString) {
            return closureEditor.load(htmlString);
          }
        });
      }

      if (!this.docInfo.title) {
        var closureTitle = '';
        var closureMetaDisplay = this.$metaDisplay; // title defined with setter to facilitate side-effects like updating the
        // current title at the bottom of the screen.

        Object.defineProperty(this.docInfo, 'title', {
          configurable: false,
          writeable: true,
          enumerable: true,
          set: function set(val) {
            closureTitle = val;
            closureMetaDisplay.textContent = val;
          },
          get: function get() {
            return closureTitle;
          }
        });

        if (!this.docInfo.links) {
          var advisingLink = document.getElementById('advisingLink');
          var applicationLink = document.getElementById('applicationLink');
          this.docInfo.links = {
            advisingLink: {
              text: advisingLink.textContent,
              url: advisingLink.href
            },
            applicationLink: {
              text: applicationLink.textContent,
              url: applicationLink.href
            }
          };
        }

        this.docInfo.title = "ISA Email ".concat(this.docInfo.dateCreated);
      }
    },

    /**
     * setDocInfo - Sets the meta information for the current document. If given
     *  passed a docInfo object, it will attempt to set the docInfo of the current
     *  document to match that. Otherwise, it will provide generic defaults.
     *
     * @param {object} [docInfo] An optional object containing information about a
     *  document.
     *
     * @returns {object} returns the current docInfo.
     *
     */
    setDocInfo: function setDocInfo() {
      var _this = this;

      var docInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.initDocInfo();

      if (docInfo && docInfo.title && docInfo.contents) {
        if (docInfo.fileType !== DocumentFileType) return false;
        Object.keys(docInfo).forEach(function (key) {
          _this.docInfo[key] = docInfo[key];
        });
      }

      if (this.settingsview) {
        this.settingsview.init(this.modal, this.docInfo);
      }

      return this.docInfo;
    },

    /**
     * getDocInfo - Retrieve the meta information for the current document in
     *  JSON format. The returned object includes the ocntent of the editor.
     *
     * @returns {object} The meta information for the document.
     */
    getDocInfo: function getDocInfo() {
      return this.docInfo;
    },

    /**
     * loadEditorFile - Loads the given docInfo into the current document. Sets
     *  the contents of the editor and updates the title of the current document.
     *
     * @param {object} docInfo The meta information, including editor contents, of
     *  the document to be loaded.
     *
     * @returns {type} Description
     */
    loadEditorFile: function loadEditorFile(docInfo) {
      this.editor.load(docInfo.contents);
    },

    /**
     * buttonClickHandler - Handle clicks on the Controller buttons.
     *
     * @param {event} e The click event.
     *
     */
    buttonClickHandler: function buttonClickHandler(e) {
      if (e.target === this.btns.$startoverBtn) {
        window.location.reload();
      } else if (e.target === this.btns.$copyCodeBtn) {
        this.$copyTargetInnerCtn.innerHTML = this.editor.html();
        this.$copyTargetBottomBtns.innerHTML = this.$bottomBtns.innerHTML;
        this.$copyTargetBottomBtns.querySelectorAll('a').forEach(function (link) {
          if (link.style.display === 'none') {
            var tr = findAncestorOfType('TR', link);
            tr.parentNode.removeChild(tr); // link.parentNode.parentNode.parentNode.removeChild(link.parentNode.parentNode);
          }
        });
        this.copyview.displayAndCopy(this.$copyTargetCtn.outerHTML);
        this.btns.$copyCodeBtn.blur();
      } else if (e.target === this.btns.$saveLoadBtn) {
        this.saveLoadView.display();
        this.btns.$saveLoadBtn.blur();
      } else if (e.target === this.btns.$settingsBtn) {
        this.settingsview.display();
        this.btns.$settingsBtn.blur();
      } else if (e.target === this.btns.$helpBtn) {
        this.helpView.display();
        this.btns.$settingsBtn.blur();
      }
    }
  }; // Initialize the Controller object.

  document.addEventListener('DOMContentLoaded', Controller.init.bind(Controller));

}());