/* eslint-env mocha */
/* global chai CursorUtils */


const TestCollection = new Meteor.Collection('cursor-utils-test-collection');
const LocalCollection = new Mongo.Collection(null);

describe('CursorUtils', () => {
  const tests = (Collection) => {
    before(() => {
      // It doesn't actually matter on the client
      if (Meteor.isServer) {
        Collection.remove({});
      }
      Collection.insert({_id: 'a', field: 'a', rank: 1});
      Collection.insert({_id: 'b', field: 'b', rank: 2});
    });

    it('can turn a cursor into a findOne', () => {
      const cursor = TestCollection.find({}, {sort: {rank: 1}});
      const doc = CursorUtils.findOne(cursor);
      chai.assert.equal(doc._id, 'a');
    });

    it('can make a cursor more specific', () => {
      const cursor = TestCollection.find();
      chai.assert.equal(cursor.count(), 2);

      const subCursor = CursorUtils.find(cursor, {field: 'a'});
      chai.assert.equal(subCursor.count(), 1);
    });

    // Some unimplemented tests
    it('can change the limit of a cursor');
    it('can change the skip of a cursor');
    it('can change the order of a cursor');
    it('gets the transform in a findOne');
    it('gets the transform in a find');
  };

  describe('with mongo collections', () => {
    tests(TestCollection);
  });

  describe('with local collections', () => {
    tests(LocalCollection);
  });
});
