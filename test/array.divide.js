$(document).ready(function() {
  
  module("underscore.array.divide");

  test("at", function() {
    deepEqual(_.at([0,1,2,3,4,5],2,2),[2,3]);
    equal(_.at("abcde",3,2), "de");
    equal(_.at([0,1,2],-1,2), undefined);
    equal(_.at([0,1,2],1,4), undefined);
  });

  test("divide", function(){
    deepEqual(_.divide([1,1,2,2,1,2]),[[1,1],[2,2],[1],[2]]); 
    var p1 = function (prev, obj) {
      return (_.at(prev,0,1) === _.at(obj,0,1));
    };
    deepEqual(_.divide(["ab","abc","a","bc","ac","ba","bb"], p1),[["ab","abc","a"],["bc"],["ac"],["ba","bb"]]);
    deepEqual(_.divide("aabbaccdd"),["aa","bb","a","cc","dd"]);
  });
});