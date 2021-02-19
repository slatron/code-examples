const results = {
  log(text) {
    let elem = document.createElement('p');
    elem.textContent = text;
    document.getElementById('results').appendChild(elem);
  }
}

const getValue = (elemID) => {
  return parseInt(document.getElementById(elemID).value)
} 

const degToRad = (degrees) => {
  return degrees * Math.PI / 180;
}
const random = (min,max) => {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

const examples = {
  example_example: {
    title: 'Title Here',
    setup: () => {},
    execute: () => {}
  },

  simple_js_blocking: {
    title: 'Simple JS Blocking',
    execute: () => {
      
      let myDate;

      for (let i = 0; i < 10000000; i++) {
        let date = new Date();
        myDate = date
      }

      results.log('This line was Blocked by new Date loop')
    }
  },
  simple_js_worker: {
    title: 'Simple JS Worker',
    setup: () => {},
    execute: () => {

      const worker = new Worker('./simple_worker.js')
      worker.postMessage('Begin Working')

      results.log('This text is from the main execution thread')

      worker.onmessage = function(e) {
        results.log(`Worker Returned Date:${e.data}`)
      }

      // simple_worker.js contents:
      //
      // onmessage = function() {
      //   let myDate;
      //
      //   for(let i = 0; i < 10000000; i++) {
      //     let date = new Date();
      //     myDate = date
      //   }
      //
      //   postMessage(myDate);
      // }

    }
  },
  simple_browser_blocking: {
    title: 'SVG JS Blocking',
    setup: () => {
      const canvas = document.createElement('canvas')
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
      document.getElementById('ui').appendChild(timesInput)

      let lElem = document.createElement('label');
      lElem.id = 'timesValuelbl'
      lElem.textContent = 'times';
      lElem.setAttribute('for', 'timesValue');
      document.getElementById('ui').appendChild(lElem);

      const clearBtn = document.createElement('button');
      clearBtn.id = 'clearBtn'
      clearBtn.innerText = 'clear'
      clearBtn.onclick = () => {
        const canvas = document.getElementById('drawing');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'pink';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      document.getElementById('ui').appendChild(clearBtn)
    },
    execute: () => {

      let times = getValue('timesValue')
      if (times > 100000) times = 100000

      const canvas = document.getElementById('drawing')
      let ctx = canvas.getContext('2d')

      function expensiveOperation() {
        for(let i = 0; i < times; i++) {
          ctx.fillStyle = 'rgba(0,0,255, 0.2)'
          ctx.beginPath()
          ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false)
          ctx.fill()
        }
      }

      expensiveOperation()
    }
  },
  event_loop_example_one: {
    title: 'Event Loop One',
    setup: () => {},
    execute: () => {

      results.log('First')

      setTimeout(function () {
        results.log('Second')
      }, 1000)

      results.log('Third')

    }
  },
  event_loop_example_two: {
    title: 'Event Loop Two',
    setup: () => {},
    execute: () => {

      results.log('First')

      setTimeout(function () {
        results.log('Second')
      }, 0)

      results.log('Third')

    }
  },

  callback_example: {
    title: 'Using Callbacks (wsg XMLHttpRequest)',
    setup: () => {},
    execute: () => {
      // User navigates to /user/1
      const userID = 1
      let user, albums, posts, comments

      const requestObj = new XMLHttpRequest()

      requestObj.open("GET", getUser(userID))
      requestObj.onreadystatechange = () => {

        if (requestObj.readyState === 4) {
          user = JSON.parse(requestObj.response)

          requestObj.open("GET", getUserAlbums(userID))
          requestObj.onreadystatechange = () => {

            if (requestObj.readyState === 4) {
              albums = JSON.parse(requestObj.response)

              requestObj.open("GET", getUserPosts(userID))
              requestObj.onreadystatechange = () => {

                if (requestObj.readyState === 4) {
                  posts = JSON.parse(requestObj.response)
                  const postID = posts[0].id

                  requestObj.open("GET",  getPostComments(postID))
                  requestObj.onreadystatechange = () => {
                    
                    if (requestObj.readyState === 4) {
                      comments = JSON.parse(requestObj.response)
                      renderPage(user, albums, posts, comments)
                    }
                  }
                  requestObj.send(null)
                }
              }
              requestObj.send(null)
            }
          }
          requestObj.send(null)
        }
      }
      requestObj.send(null)
    }   
  },

  promise_example: {
    title: 'Using Promises',
    setup: () => {},
    execute: () => {
      // User navigates to /user/1
      const userID = 1
      let user, albums, post, comments

      get.user(userID)
         .then(userResponse => { user = userResponse })
         .then(() => { get.userAlbums(userID)
           .then(albumsResponse => albums = albumsResponse)
         })
         .then(() => { get.userFirstPost(userID)
           .then(postReponse => post = postReponse)
           .then(() => { get.postComments(post.id)
             .then(commentResponse => comments = commentResponse)
             .then(() => renderPage(user, albums, [post], comments))
           })
         })
         .catch(err => console.warn(err))
    }    
  },

  promise_all_example: {
    title: 'Using Promise.all',
    setup: () => {},
    execute: () => {
      // User navigates to /user/1
      const userID = 1
      let comments

      Promise.all([
        get.user(userID),
        get.userAlbums(userID),
        get.userFirstPost(userID)
      ])
      .then(([userResponse, albumsResponse, postReponse]) => {
        const user = userResponse
        const albums = albumsResponse
        const post = postReponse
        get.postComments(post.id)
           .then(commentResponse => comments = commentResponse)
           .then(() => renderPage(user, albums, [post], comments))
      })
    }    
  },

  promise_priority: {
    title: 'Priority Queue',
    execute: () => {

      results.log('First')

      setTimeout(function () {
        results.log('Second')
      }, 0)

      new Promise(function (res) {
        res('Third')
      }).then(results.log)

      results.log('Fourth')

    }
  },

  async_await_example: {
    title: 'Using async/await',
    setup: () => {},
    execute: async () => {

      // User navigates to /user/1
      const userID = 1

      const user   = await get.user(userID)
      const albums = await get.userAlbums(userID)
      const post   = await get.userFirstPost(userID)

      const comments = await get.postComments(post.id)

      renderPage(user, albums, [post], comments)
    }    
  },

  async_await_promise_all: {
    title: 'Combine Async/await + Promise.all',
    setup: () => {},
    execute: async () => {

      // User navigates to /user/1
      const userID = 1
      const [user, albums, post] = await Promise.all([
        get.user(userID),
        get.userAlbums(userID),
        get.userFirstPost(userID)
      ])
    
      const comments = await get.postComments(post.id)
    
      renderPage(user, albums, [post], comments)
    }
    
  }
}