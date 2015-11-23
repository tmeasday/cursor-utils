Package.describe({
  name: 'cursor-utils',
  version: '0.0.1',
  summary: 'Alter cursors to avoid repeating yourself',
  git: 'https://github.com/tmeasday/cursor-utils',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'underscore'
  ]);
  api.addFiles('cursor-utils.js');
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'practicalmeteor:mocha@2.1.0_5',
    'cursor-utils',
    'mongo'
  ]);
  api.addFiles('cursor-utils-tests.js');
});
