/*
 * @author Will Steinmetz
 * notific8 Javascript plug-in - build task
 * Copyright (c)2013-2016, Will Steinmetz
 * Licensed under the BSD license.
 * http://opensource.org/licenses/BSD-3-Clause
 */

module.exports = {
  'default': [
    'build',
    'karma:unit',
    'watch'
  ],
  'build': [
    'pug',
    'sass',
    'cssmin',
    'babel:dist',
    'uglify'
  ],
  'release': [
    'build',
    'update_json'
  ]
};
