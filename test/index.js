/*jshint browser:true */
/*global require */

/**
 * @fileOverview
 * Contains unit tests for the common colors library.
 */

describe('Common colors library', function() {
  'use strict';

  var colors = require('colors-common');
  var _ = require('lodash');
  var assert = window.assert;

  describe('validate', function() {
    var DATA_SET = [
      { input: '#aaa', passes: true },
      { input: '#000000', passes: true },
      { input: '#123abc', passes: true },
      { input: 'blue', passes: false }, // color names not supported
      { input: 'f00', passes: false }, // no leading hashmark
      { input: '#aa', passes: false }, // too short
      { input: '#0000000', passes: false}, // too long
      { input: '#abcd', passes: false }, // not valid length
      { input: {}, passes: false } // not a string
    ];

    function runTest(data) {
      it((data.passes ? 'passes' : 'fails') + ' for input ' + data.input,
      function() {
        var passed = colors.validate(data.input);
        assert.equal(passed, data.passes);
      });
    }

    _.each(DATA_SET, runTest);
  });

  describe('get', function() {
    it('returns the color defined in the user if its valid', function() {
      var user = { avatarColor: '#f00' };
      assert.equal(colors.get(user), '#f00');
    });

    it('returns the default color if the user color is invalid', function() {
      var user = { avatarColor: '#f0' };
      assert.equal(colors.get(user), colors.DEFAULT);
    });

    it('returns the default color if the user does not have one', function() {
      var user = { };
      assert.equal(colors.get(user), colors.DEFAULT);
    });
  });
});
