(function (global) {

  global.when = function (condition) {
    var queue = [], 
    loop = null;

    function callNow(fn) {
      try {
        fn();
      } catch (e) {
        throw new Error('When.js encountered a problem running your callback: \n' + e );
      }
    }

    function callLater(callback) {
      queue.push([condition, callback]);
      if (loop) { return ;}
      loop = setInterval(function () {
        if (queue.length == 0) {
          clearInterval(loop);
        } else {
          for (var i=0; i < queue.length; i++) {
            if (queue[i][0]()) {
              callNow(queue[i][1]);
              queue.splice(i,1);
            }
          }
        }
      },100);
    }
    return {
      do: function (callback) {
        if (condition()) {
          callNow(callback);
        } else {
          callLater(callback);
        }
      }
    }
  }

})(window)
