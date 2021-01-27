onmessage = function() {
  let myDate;
  for(let i = 0; i < 100000; i++) {
    let date = new Date();
    myDate = date
  }
  postMessage(myDate);
}