function throttle(fn, delay = 500) {
  //节流
  let timer = null;
  return function (...args) {
    if (!timer) {
      //定时器走完之后，再重新计时执行下一次
      timer = setTimeout(() => {
        fn.call(this, args);
        timer = null;
      }, delay);
    }
  };
}

function throttle(fn, delay = 500) {
  //节流
  let timer = null;
  let prev;
  return function (...args) {
    let now = new Date();
    let pass = now - prev;
    if (timer) {
      timer = setTimeout(() => {
        fn.call(this, args);
        prev = now;
        timer = null;
      }, delay - pass);
    }
    if (!timer) {
      //定时器走完之后，再重新计时执行下一次
      timer = setTimeout(() => {
        fn.call(this, args);
        timer = null;
      }, delay);
    }
  };
}

function debounce(fn, delay = 500) {
  //防抖
  let timer;
  return function (...args) {
    //触发事件后先清除定时器，后计时
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
}

function throttled1(fn, delay = 500) {
  let timer = null;
  let oldTime = new Date();
  return function (args) {
    const newTime = new Date();
    const remain = newTime - oldTime;
    if (remain <= 0) {
      fn.call(args);
      oldTime = new Date();
    } else {
      timer = setTimeout(fn.call(args), remain);
    }
  };
}

const func = function (data) {
  console.log(data);
};

const myThrottle = throttled1(func, 500);
myThrottle("shabi");
