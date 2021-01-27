const examples = {
  example_example: {
    title: 'Title Here',
    setup: () => {},
    execute: () => {},
    cleanup: () => {
      // document.getElementById('results').innerHTML = ''
    }
  },
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
  simple_js_worker: {
    title: 'Simple JS Worker',
    setup: () => {},
    execute: () => {
      const worker = new Worker('./simple_worker.js');
      worker.postMessage('Go!');

      let pElem = document.createElement('p');
      pElem.textContent = 'This is a newly-added paragraph.';
      document.getElementById('results').appendChild(pElem);

      worker.onmessage = function(e) {
        let pElem = document.createElement('p');
        pElem.textContent = `Worker Returned Date:${e.data}`;
        document.getElementById('results').appendChild(pElem);
      }
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

      const timesInput = document.createElement('input')
      timesInput.type = 'number'
      timesInput.id = 'timesValue'
      timesInput.value = 100
      timesInput.min = 1
      timesInput.max = 100000
      document.querySelector('section').appendChild(timesInput)

      let lElem = document.createElement('label');
      lElem.id = 'timesValuelbl'
      lElem.textContent = 'times';
      lElem.setAttribute('for', 'timesValue');
      document.querySelector('section').appendChild(lElem);

      const alertBtn = document.createElement('button');
      alertBtn.id = 'alertie'
      alertBtn.innerText = 'alert'
      alertBtn.onclick = () => alert('click!')
      document.querySelector('section').appendChild(alertBtn)

      const clearBtn = document.createElement('button');
      clearBtn.id = 'clearBtn'
      clearBtn.innerText = 'clear'
      clearBtn.onclick = () => {
        const canvas = document.getElementById('drawing');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'pink';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      document.querySelector('section').appendChild(clearBtn)
    },
    execute: () => {
      let times = parseInt(document.getElementById('timesValue').value)
      if (times > 100000) times = 100000
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
      document.getElementById('alertie').remove()
      document.getElementById('clearBtn').remove()
      document.getElementById('timesValue').remove()
      document.getElementById('timesValuelbl').remove()
      document.querySelector('#results h2').remove()
    }
  }
}