const get = {
  user (userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
  },
  userAlbums (userId) {
    fetch(`https://jsonplaceholder.typicode.com/albums/?userId=${userId}`)
      .then(response => response.json())
  },
  userFirstPost (userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`)
      .then(response => response.json())
      .then(json => json[0])
  },
  postComments (postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => response.json())
  }
}

const getUser = (userId) => `https://jsonplaceholder.typicode.com/users/${userId}`
const getUserAlbums = (userId) => `https://jsonplaceholder.typicode.com/albums/?userId=${userId}`
const getUserPosts = (userId) => `https://jsonplaceholder.typicode.com/posts/?userId=${userId}`
const getPostComments = (postId) => `https://jsonplaceholder.typicode.com/posts/${postId}/comments`