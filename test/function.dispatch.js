$(document).ready(function() {

  QUnit.module("underscore.function.dispatch");

  QUnit.test('attempt', function(assert) {
    var obj = {x: '', y: function() { return true; }, z: function() { return _.toArray(arguments).join(''); }};
    assert.strictEqual(_.attempt(obj, 'x'), undefined);
    assert.strictEqual(_.attempt(obj, 'y'), true);
    assert.strictEqual(_.attempt(obj, 'z', 1, 2, 3), '123');
    assert.strictEqual(_.attempt(null, 'x'), undefined);
    assert.strictEqual(_.attempt(undefined, 'x'), undefined);
  });

});
