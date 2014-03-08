
$(document).ready(function() {

  module('underscore.util.strings');

  test('explode', function() {
    deepEqual(_.explode('Virgil'), ['V','i','r','g','i','l'], 'Should explode a string into an array of characters.');
  });

  test('fromQuery', function() {
    var query = 'foo%26bar=baz&test=success';
    console.log(_.fromQuery(query));
    console.log({'foo&bar': 'baz', 'test': 'success'});
    ok(_.isEqual(_.fromQuery(query), {'foo&bar': 'baz', 'test': 'success'}), 'can convert a query string to a hash');
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

  test('toQuery', function() {
    var obj = {'foo&bar': 'baz', 'test': 'success'};
    equal(_.toQuery(obj), 'foo%26bar=baz&test=success', 'can convert a hash to a query string');
  });

  test('strContains', function() {
    equal(_.strContains('Metaphysics', 'physics'), true, 'Should return true if string contains search string.');
    equal(_.strContains('Poetics', 'prose'), false, 'Should return false if string does not contain search string.');

    var thrower = function() { _.strContains([], ''); };
    throws(thrower, TypeError, 'Throws TypeError if first argument is not a string.');
  });
});
