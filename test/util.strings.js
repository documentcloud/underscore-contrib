
$(document).ready(function() {

  module('underscore.util.strings');

  test('explode', function() {
    deepEqual(_.explode('Virgil'), ['V','i','r','g','i','l'], 'Should explode a string into an array of characters.');
  });

  test('implode', function() {
    equal(_.implode(['H','o','m','e','r']), 'Homer', 'Should implode an array of characters into a single string.');
  });

  test('camelCase', function() {
    equal(_.camelCase('punic-wars'), 'punicWars', 'Should convert a dashed-format string to camelCase.');
  });

  test('toDash', function() {
    equal(_.toDash('trojanWar'), 'trojan-war', 'Should convert a camelCase string to dashed-format.');
    equal(_.toDash('PersianWar'), 'persian-war', 'Should convert a PascalCase string to dashed-format.');
  });

  test('strContains', function() {
    equal(_.strContains('Metaphysics', 'physics'), true, 'Should return true if string contains search string.');
    equal(_.strContains('Poetics', 'prose'), false, 'Should return false if string does not contain search string.');

    var thrower = function() { _.strContains([], ''); };
    throws(thrower, TypeError, 'Throws TypeError if first argument is not a string.');
  });
});
