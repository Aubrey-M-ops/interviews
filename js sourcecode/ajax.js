const ajax = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (200 <= xhr.status < 300 || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.responseText));
        }
      }
    };
    xhr.send()
  });
};
