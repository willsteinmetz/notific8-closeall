/*
 * @author Will Steinmetz
 * Test suite for the close all module of the notific8 JavaScript plug-in
 * Copyright (c)2013-2016, Will Steinmetz
 * Licensed under the BSD license.
 * http://opensource.org/licenses/BSD-3-Clause
 */
describe('notific-closeall module', function() {
  beforeEach(function() {
    notific8('destroy');
  });

  it('should add a closeall button to the notification container', function() {
    var notification,
      notificationContainerClass,
      notificationCloseAll,
      notificationCloseAllClass;

    // enable the closeall module
    notific8('configure', {
      closeAll: true
    });

    // open two notifications
    notific8('first notification');
    notific8('second notification');

    notificationContainerClass = "." + notific8Defaults.namespace + "-container.top.right";
    notification = document.querySelector(notificationContainerClass);
    notificationCloseAllClass = "." + notific8Defaults.namespace + "-closeall-button";
    notificationCloseAll = notification.querySelectorAll(notificationCloseAllClass);

    expect(notificationCloseAll.length).toEqual(1);
  });

  it('should add the theme materialish and color lollypop', function() {
    var notification,
      notificationContainerClass,
      notificationCloseAll,
      notificationCloseAllClass,
      notificationCloseAllButtonClasses;

    // enable the closeall module
    notific8('configure', {
      closeAll: true,
      closeAllTheme: "materialish",
      closeAllColor: "lollypop"
    });

    // open two notifications
    notific8('first notification');
    notific8('second notification');

    notificationContainerClass = "." + notific8Defaults.namespace + "-container.top.right";
    notification = document.querySelector(notificationContainerClass);
    notificationCloseAllClass = "." + notific8Defaults.namespace + "-closeall-button";
    notificationCloseAll = notification.querySelector(notificationCloseAllClass);
    notificationCloseAllButtonClasses = notificationCloseAll.className.split(' ');

    expect(notificationCloseAllButtonClasses.indexOf('materialish')).not.toEqual(-1);
    expect(notificationCloseAllButtonClasses.indexOf('lollypop')).not.toEqual(-1);
  });

  it('should change the close all button text', function() {
    var notification,
      notificationContainerClass,
      notificationCloseAll,
      notificationCloseAllClass;

    // enable the closeall module
    notific8('configure', {
      closeAll: true,
      closeAllText: "adios!"
    });

    // open two notifications
    notific8('first notification');
    notific8('second notification');

    notificationContainerClass = "." + notific8Defaults.namespace + "-container.top.right";
    notification = document.querySelector(notificationContainerClass);
    notificationCloseAllClass = "." + notific8Defaults.namespace + "-closeall-button";
    notificationCloseAll = notification.querySelector(notificationCloseAllClass);

    expect(notificationCloseAll.innerHTML.toString().trim()).toEqual("adios!");
  });
});
