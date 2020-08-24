
$(document).ready(function() {

  QUnit.module('underscore.util.strings');

  QUnit.test('explode', function(assert) {
    assert.deepEqual(_.explode('Virgil'), ['V','i','r','g','i','l'], 'Should explode a string into an array of characters.');
  });

  QUnit.test('fromQuery', function(assert) {
    var query = 'foo%5Bbar%5D%5Bbaz%5D%5Bblargl%5D=blah&foo%5Bbar%5D%5Bbaz%5D%5Bblargr%5D=woop&blar=bluh&abc[]=123&abc[]=234';
    assert.ok(_.isEqual(_.fromQuery(query), {
      'foo': {
        'bar': {
          'baz': {
            'blargl': 'blah',
            'blargr': 'woop'
          }
        }
      },
      'blar': 'bluh',
      'abc': [
        '123',
        '234'
      ]
    }), 'can convert a query string to a hash');
  });

  QUnit.test('implode', function(assert) {
    assert.equal(_.implode(['H','o','m','e','r']), 'Homer', 'Should implode an array of characters into a single string.');
  });

  QUnit.test('camelCase', function(assert) {
    assert.equal(_.camelCase('punic-wars'), 'punicWars', 'Should convert a dashed-format string to camelCase.');
  });

  QUnit.test('toDash', function(assert) {
    assert.equal(_.toDash('trojanWar'), 'trojan-war', 'Should convert a camelCase string to dashed-format.');
    assert.equal(_.toDash('PersianWar'), 'persian-war', 'Should convert a PascalCase string to dashed-format.');
  });

  QUnit.test('toQuery', function(assert) {
    var obj = {'foo&bar': 'baz', 'test': 'total success', 'nested': {'works': 'too'}, 'isn\'t': ['that', 'cool?']};
    assert.equal(_.toQuery(obj), 'foo%26bar=baz&test=total%20success&nested%5Bworks%5D=too&isn\'t%5B%5D=that&isn\'t%5B%5D=cool%3F', 'can convert a hash to a query string');
    assert.equal(_.toQuery(obj), jQuery.param(obj), 'query serialization matchs jQuery.param()');
  });

  QUnit.test('strContains', function(assert) {
    assert.equal(_.strContains('Metaphysics', 'physics'), true, 'Should return true if string contains search string.');
    assert.equal(_.strContains('Poetics', 'prose'), false, 'Should return false if string does not contain search string.');

    var thrower = function() { _.strContains([], ''); };
    assert.throws(thrower, TypeError, 'Throws TypeError if first argument is not a string.');
  });
});
