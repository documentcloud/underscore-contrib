$(document).ready(function() {

  QUnit.module("underscore.util.existential");

  QUnit.test("exists", function(assert) {
    assert.equal(_.exists(null), false, 'should know that null is not existy');
    assert.equal(_.exists(undefined), false, 'should know that undefined is not existy');

    assert.equal(_.exists(1), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists(0), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists(-1), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists(3.14), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists('undefined'), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists(''), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists(NaN), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists(Infinity), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists(true), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists(false), true, 'should know that all but null and undefined are existy');
    assert.equal(_.exists(function(){}), true, 'should know that all but null and undefined are existy');
  });

  QUnit.test("truthy", function(assert) {
    assert.equal(_.truthy(null), false, 'should know that null, undefined and false are not truthy');
    assert.equal(_.truthy(undefined), false, 'should know that null, undefined and false are not truthy');
    assert.equal(_.truthy(false), false, 'should know that null, undefined and false are not truthy');

    assert.equal(_.truthy(1), true, 'should know that everything else is truthy');
    assert.equal(_.truthy(0), true, 'should know that everything else is truthy');
    assert.equal(_.truthy(-1), true, 'should know that everything else is truthy');
    assert.equal(_.truthy(3.14), true, 'should know that everything else is truthy');
    assert.equal(_.truthy('undefined'), true, 'should know that everything else is truthy');
    assert.equal(_.truthy(''), true, 'should know that everything else is truthy');
    assert.equal(_.truthy(NaN), true, 'should know that everything else is truthy');
    assert.equal(_.truthy(Infinity), true, 'should know that everything else is truthy');
    assert.equal(_.truthy(true), true, 'should know that everything else is truthy');
    assert.equal(_.truthy(function(){}), true, 'should know that everything else is truthy');
  });

  QUnit.test("falsey", function(assert) {
    assert.equal(_.falsey(null), true, 'should know that null, undefined and false are not falsey');
    assert.equal(_.falsey(undefined), true, 'should know that null, undefined and false are not falsey');
    assert.equal(_.falsey(false), true, 'should know that null, undefined and false are not falsey');

    assert.equal(_.falsey(1), false, 'should know that everything else is falsey');
    assert.equal(_.falsey(0), false, 'should know that everything else is falsey');
    assert.equal(_.falsey(-1), false, 'should know that everything else is falsey');
    assert.equal(_.falsey(3.14), false, 'should know that everything else is falsey');
    assert.equal(_.falsey('undefined'), false, 'should know that everything else is falsey');
    assert.equal(_.falsey(''), false, 'should know that everything else is falsey');
    assert.equal(_.falsey(NaN), false, 'should know that everything else is falsey');
    assert.equal(_.falsey(Infinity), false, 'should know that everything else is falsey');
    assert.equal(_.falsey(true), false, 'should know that everything else is falsey');
    assert.equal(_.falsey(function(){}), false, 'should know that everything else is falsey');
  });

  QUnit.test('firstExisting', function(assert) {
    assert.equal(_.firstExisting('first', 'second'), 'first', 'should return the first existing value');
    assert.equal(_.firstExisting(null, 'second'), 'second', 'should ignore null');
    assert.equal(_.firstExisting(void 0, 'second'), 'second', 'should ignore undefined');
    assert.equal(_.firstExisting(null, void 0, 'third'), 'third', 'should work with more arguments');
  });

});
