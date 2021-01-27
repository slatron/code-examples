const examples = {
  simple_js_blocking: {
    title: 'Simple JS Blocking',
    execute: () => {
      let myDate;
      for (let i = 0; i < 10000000; i++) {
        let date = new Date();
        myDate = date
      }
      const finishedText = document.createElement('p')
      finishedText.id = 'finishedText'
      finishedText.innerText = 'This line was Blocked by new Date loop'
      document.getElementById('results').appendChild(finishedText);
    },
    cleanup: () => {
      document.getElementById('results').innerHTML = ''
    }
  },
  simple_browser_blocking: {
    title: 'SVG JS Blocking',
    setup: () => {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      canvas.id = 'drawing'
      const title = document.createElement('h2')
      title.innerText = 'Canvas'
      document.getElementById('results').appendChild(title);
      document.getElementById('results').appendChild(canvas);

      const longBtn = document.createElement('button');
      longBtn.id = 'longo'
      longBtn.innerText = 'Run Example Ten Thousand Times'
      longBtn.onclick = () => examples.simple_browser_blocking.execute(10000)
      document.querySelector('section').appendChild(longBtn)

      const alertBtn = document.createElement('button');
      alertBtn.id = 'alertie'
      alertBtn.innerText = 'alert'
      alertBtn.onclick = () => alert('click!')
      document.querySelector('section').appendChild(alertBtn)
    },
    execute: (times=1000) => {
      const canvas = document.getElementById('drawing');
      let ctx = canvas.getContext('2d');

      function degToRad(degrees) {
        return degrees * Math.PI / 180;
      }
      function random(min,max) {
        var num = Math.floor(Math.random()*(max-min)) + min;
        return num;
      }
      function expensiveOperation() {
        for(let i = 0; i < times; i++) {
          console.log(i)
          ctx.fillStyle = 'rgba(0,0,255, 0.2)';
          ctx.beginPath();
          ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false);
          ctx.fill()
        }
      }
      expensiveOperation()
    },
    cleanup: () => {
      document.getElementById('drawing').remove()
      document.getElementById('longo').remove()
      document.getElementById('alertie').remove()
      document.querySelector('#results h2').remove()
    }
  }
}