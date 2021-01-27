let example = 'simple_js_blocking'

function selectExample(e) {
  const name = e.target.id
  if ('cleanup' in examples[example]) examples[example].cleanup()
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
