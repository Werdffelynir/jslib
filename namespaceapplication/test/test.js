
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should;


describe("NamespaceApplication.typeOf", function() {

  it("typeOf is null", function() {
    chai.assert.ok(NamespaceApplication.typeOf(null) === 'null', 'should be null');
    chai.assert.ok(NamespaceApplication.typeOf(null, 'null'));
  });

  it("typeOf is boolean", function() {
    chai.assert.ok(NamespaceApplication.typeOf(true) === 'boolean', 'should be boolean - true');
    chai.assert.ok(NamespaceApplication.typeOf(true, 'boolean'));
  });

  it("typeOf is undefined", function() {
    chai.assert.ok(NamespaceApplication.typeOf(undefined) === 'undefined', 'should be undefined');
    chai.assert.ok(NamespaceApplication.typeOf(undefined, 'undefined'));
  });

  it("typeOf is function", function() {
    chai.assert(NamespaceApplication.typeOf(function(){}) === 'function', 'should be function');
    chai.assert.ok(NamespaceApplication.typeOf(function(){}, 'function'));
  });

  it("typeOf is string", function() {
    chai.assert(NamespaceApplication.typeOf('myString') === 'string', 'should be string');
    chai.assert(NamespaceApplication.typeOf('myString'));
  });

  it("typeOf is number", function() {
    chai.assert(NamespaceApplication.typeOf(103) === 'number', 'should be number');
    chai.assert(NamespaceApplication.typeOf(103, 'number'));
  });

});
