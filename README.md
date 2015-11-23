# Cursor Utils

Make a cursor more specific

```js
const cursor = Collection.find({some: 'query'}, {and: 'options'});

// returns a new cursor with the intersection of both sets of query and options
CursorUtils.find(cursor, {some: 'additional'}, {query: 'and-options'});

// as above but finds one
CursorUtils.findOne(cursor, {some: 'additional'}, {query: 'and-options'});

// a common use case
CursorUtils.findOne(cursor);
```

## Contributing

This project is a useful proof of concept. It still needs work!

1. Handling more query types (not just doing `_.extend()` on two objects)
2. Keeping sort from both queries
3. Completing the test suite
4. Unknown unknowns