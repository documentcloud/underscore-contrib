$(document).ready(function() {

  module("underscore.util.existential");

  test('fromQuery', function() {
    var query = 'foo%26bar=baz&test=success';
    console.log(_.fromQuery(query));
    console.log({'foo&bar': 'baz', 'test': 'success'});
    ok(_.isEqual(_.fromQuery(query), {'foo&bar': 'baz', 'test': 'success'}), 'can convert a query string to a hash');
  });

  test('toQuery', function() {
    var obj = {'foo&bar': 'baz', 'test': 'success'};
    equal(_.toQuery(obj), 'foo%26bar=baz&test=success', 'can convert a hash to a query string');
  });

});
