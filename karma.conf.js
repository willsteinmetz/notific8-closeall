// Karma Configuration

module.exports = function(config) {
  return config.set({
    captureConsole: true,
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'bower_components/notific8/dist/notific8.js',
      'dist/notific8-closeall.js',
      'spec/*Spec.js'
    ],
    exclude: [],
    preprocessors: {
      'dist/notific8-closeall.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'karma_tests/coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  });
};
