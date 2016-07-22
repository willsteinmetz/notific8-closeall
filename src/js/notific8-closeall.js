/*
@author Will Steinmetz
Close all module for the notific8 notification plug-in
Copyright (c)2013-2016, Will Steinmetz
Licensed under the BSD license.
http://opensource.org/licenses/BSD-3-Clause
 */

(function(window) {
  let buildClasses, buildHtml, closeAllCallback, getCloseAllButton, getContainer, getNumberOfNotifications, notific8Data;
  notific8Data = null;

  /*
  Build the HTML for close all
  @return string
   */
  buildHtml = function() {
    let closeAllClasses;
    if (notific8Data.closeAll) {
      closeAllClasses = [notific8Data.namespace + "-closeall-button", notific8Data.closeAllTheme, notific8Data.closeAllColor];
      return "<a class=\"" + (closeAllClasses.join(" ")) + "\"\n  href=\"#\">\n  " + notific8Data.closeAllText + "\n</a>";
    } else {
      return "";
    }
  };

  /*
  Build the classes array for close all
  @return string
   */
  buildClasses = function() {
    if (notific8Data.closeAll) {
      return [notific8Data.namespace + "-closeall"];
    } else {
      return [];
    }
  };

  /*
  Setup the callback for the notification
  @return object
   */
  closeAllCallback = function(data) {
    notific8Data = data;
    return {
      classes: buildClasses(),
      html: buildHtml()
    };
  };

  /*
  Get the container that the notification is inside of
  @params object data
  @return object
   */
  getContainer = function(data) {
    let containerClass, horizontalEdge, namespace, ref, verticalEdge;
    ref = data.settings, verticalEdge = ref.verticalEdge, horizontalEdge = ref.horizontalEdge, namespace = ref.namespace;
    containerClass = "." + namespace + "-container." + verticalEdge + "." + horizontalEdge;
    return document.querySelector(containerClass);
  };

  /*
  Get the number of notifications in the container
  @params object data
  @return number
   */
  getNumberOfNotifications = function(data) {
    let container, namespace;
    container = getContainer(data);
    namespace = data.settings.namespace;
    return container.querySelectorAll("." + namespace + "-notification.open").length;
  };

  /*
  Get the close all button
  @params object data
  @return object
   */
  getCloseAllButton = function(data) {
    let container, namespace;
    container = getContainer(data);
    namespace = data.settings.namespace;
    return container.querySelector("." + namespace + "-closeall-button");
  };

  window.notific8("configure", {
    onCreate: function(notification, data) {
      let closeButton;
      if (!window.notific8Defaults.closeAll) {
        return;
      }
      if (getNumberOfNotifications(data) > 0) {
        closeButton = getCloseAllButton(data);
        return closeButton.style.display = "block";
      }
    }
  });

  window.notific8("configure", {
    onClose: function(notification, data) {
      let closeButton;
      if (!window.notific8Defaults.closeAll) {
        return;
      }
      if (getNumberOfNotifications(data) <= 1) {
        closeButton = getCloseAllButton(data);
        return closeButton.style.display = "none";
      }
    }
  });

  window.notific8("configure", {
    onContainerCreate: function(container, options) {
      let containerClasses, containerPosition;
      containerPosition = "";
      containerClasses = container.className.split(" ");
      containerPosition += containerClasses.indexOf("top") > -1 ? "top" : "bottom";
      containerPosition += containerClasses.indexOf("right") > -1 ? "Right" : "Left";
      return container.addEventListener("click", function(event) {
        let closeAllButtonClass, fn, i, len, namespace, notification, notificationClass, notifications, target;
        event.preventDefault();
        target = event.target;
        namespace = options.namespace;
        closeAllButtonClass = namespace + "-closeall-button";
        if (target.className.split(" ").indexOf(closeAllButtonClass) === -1) {
          return;
        }
        notificationClass = "." + namespace + "-notification.open";
        notifications = container.querySelectorAll(notificationClass);
        fn = function(n, namespace) {
          return n.querySelector("." + namespace + "-close").click();
        };
        for (i = 0, len = notifications.length; i < len; i++) {
          notification = notifications[i];
          fn(notification, namespace);
        }
      });
    }
  });

  window.notific8("registerModule", "closeall", "insideContainer", {
    closeAll: false,
    closeAllText: "Close All",
    closeAllTheme: "legacy",
    closeAllColor: "teal"
  }, closeAllCallback);
})(window);
