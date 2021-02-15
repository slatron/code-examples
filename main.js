let example = window.location.search.substring(1).split('=')[1] || 'simple_js_blocking'

const cleanupExample = () => {
  document.getElementById('results').innerHTML = ''
  document.getElementById('ui').innerHTML = ''
}

function renderPage(user, albums, posts, comments) {
  results.log(` ******************** `)
  results.log(` ** ${user.name}`)
  results.log(` ** ${user.email}`)
  results.log(` ******************** `)

  results.log(' ** Latest Post:')
  results.log(posts[0].title)

  results.log(' ** Latest Post Comment')
  results.log(comments[0].body)

  results.log(' ** Albums:')
  results.log(`• ${albums[0].title}`)
  results.log(`• ${albums[1].title}`)
  results.log(`• ${albums[2].title}`)
}

function selectExample(e) {
  const name = e.target.id
  cleanupExample()
  if ('setup' in examples[name]) examples[name].setup()
  document.getElementById('main-example').innerText = examples[name].execute.toString()
  document.querySelector('h1').innerText = examples[name].title
  document.querySelectorAll('nav li').forEach(li => {
    li.classList.remove('active')
  })
  document.querySelector(`li#${name}`).classList.add('active')
  example = name
}
selectExample({target: {id: example}})

const arrowIcon = document.querySelector('.arrow')
const codeArea = document.querySelector('code pre')
const arrowClasses = arrowIcon.classList
const codeClasses = codeArea.classList

const toggleCode = () => {
  if (arrowClasses.value.includes('active')) {
    arrowIcon.classList.remove('active')
    codeClasses.add('hidden')
  } else {
    arrowClasses.add('active')
    codeClasses.remove('hidden')
  }
}