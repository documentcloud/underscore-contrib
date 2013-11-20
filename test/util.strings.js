
$(document).ready(function() {

  module('underscore.util.strings');

  // TODO: Test implode
  // TODO: Test explode
  // TODO: Test camelCase
  // TODO: Test toDash

  test('strContains', function() {
    equal(_.strContains('Metaphysics', 'physics'), true, 'Should return true if string contains search string.');
    equal(_.strContains('Poetics', 'prose'), false, 'Should return false if string does not contain search string.');

    var thrower = function() { _.strContains([], ''); };
    throws(thrower, TypeError, 'Throws TypeError if first argument is not a string.');
  });
});
