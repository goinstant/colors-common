/*jshint browser:true*/
/*global module*/
'use strict';

/**
 * @fileOverview
 * Contains the colors common library, which is a collection of constants and
 * helper functions for dealing with user colors when working with components.
 */

var colors = {};
module.exports = colors;

/**
 * A RegExp that tests for a valid RGB color string. A valid color must be
 * a hashmark followed by either three or six hexadecimal characters.
 * @const
 */
colors.REGEX = /^#([0-9A-F]{6}|[0-9A-F]{3})$/i;

/**
 * The default color to use when no color is assigned to the user.
 * @const
 */
colors.DEFAULT = '#8b8f96';

/**
 * The default set of goinstant colors.
 * @const
 */
colors.DEFAULTS = [
  '#3bb200',
  '#E73E3D',
  '#06b8de',
  '#e6c615',
  '#8B72E9',
  '#8fe62e',
  '#f60889',
  '#51e8c3',
  '#e65515',
  '#c186ef',
  '#734701',
  '#3a9fab',
  '#b6004d',
  '#d4b37e',
  '#4f7603',
  '#8759b6',
  '#2a82cd',
  '#de9c8d',
  '#003f85',
  '#bd852c'
];

/**
 * The name of the property on the user object where the user color can be
 * found.
 * @const
 */
colors.USER_PROPERTY = 'avatarColor';

/**
 * Regex that can be used to test if a keyName references the user property that
 * stores the color.
 * @const
 */
colors.USER_PROPERTY_REGEX = new RegExp('/' + colors.USER_PROPERTY + '$');

/**
 * Validates that a string is an RGB color suitable for use in GoInstant
 * components. Only allows numeric colors (e.g. not 'red', 'blue', etc) due to
 * limitations in the UserColors library.
 * @param {string} color The color to validate.
 * @return boolean True iff the passed color is a valid css RGB color string.
 */
colors.validate = function(color) {
  return typeof color === 'string' && colors.REGEX.test(color);
};

/**
 * Returns a valid color code from the supplied user object if possible,
 * otherwise returns the default user color.
 * @param {object} user The user object that contains a color property.
 * @return {string} A valid color code. Will be the code stored in the user if
 *         it has one, or the default color otherwise
 */
colors.get = function(user) {
  var color = user[colors.USER_PROPERTY];
  return colors.validate(color) ? color : colors.DEFAULT;
};

/**
 * Determine if the supplied keyName references the user's avatarColor property.
 * @return {boolean} true iff the keyName references the property.
 */
colors.isUserProperty = function(keyName) {
  return typeof keyName === 'string' &&
         colors.USER_PROPERTY_REGEX.test(keyName);
};
