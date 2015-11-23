const CursorUtils = {
  /**
   * "Extend" a cursor by adding more query clauses / options
   *
   * NOTE: doesn't (yet) work with (amongst other things possibly)
   *   - non object queries
   *   - sort options in the source cursor
   *
   * @param {Cursor} cursor The cursor to be modified
   * @param {Object} query Description of new query clauses
   * @param {Object} options New Options
   * @returns {Cursor} A new cursor
   */
  find: function(cursor, query = {}, options = {}) {
    const selector = cursor.matcher ? cursor.matcher._selector : cursor._cursorDescription.selector;
    const newQuery = _.extend({}, selector, query);

    const oldOptions = cursor._cursorDescription ? cursor._cursorDescription.options : cursor;
    const newOptions = _.extend(_.pick(oldOptions, 'skip', 'limit', 'fields'), options);
    if (oldOptions._transform) {
      newOptions.transform = oldOptions._transform;
    }

    if (cursor.collection) {
      return cursor.collection.find(newQuery, newOptions);
    }
    return cursor._mongo.find(cursor._cursorDescription.collectionName, newQuery, newOptions);
  },

  /**
   * Extend a cursor and findOne.
   *
   * NOTE @see find for caveats
   *
   * @param {Cursor} cursor The cursor to be modified
   * @param {Object} query Description of new query clauses
   * @param {Object} options New Options
   * @returns {Object} The matching document (or null)
   */
  findOne: function(cursor, query = {}, options = {}) {
    options.limit = 1;
    return CursorUtils.find(cursor, query, options).fetch()[0];
  }
};

// "export"
this.CursorUtils = CursorUtils;
