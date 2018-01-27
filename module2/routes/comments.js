module.exports = {
  getComments(req, res) {
    res.status(200).send(req.store.posts[req.params.postId].comments)
  }, 
  addComment(req, res) {
    let newComment = req.body.text
    let postId = req.params.postId;
	let id = req.store.posts[postId].comments.length

	req.store.posts[postId].comments.push(newComment)
	res.status(201).send({id: id})
  },
  updateComment(req, res) {
  	let newComment = req.body.text
    let postId = req.params.postId;
	let id = req.params.id;

    req.store.posts[postId].comments[id] = newComment
	res.status(200).send(req.store.posts[postId])
  },
  removeComment(req, res) {
  	let postId = req.params.postId;
	let id = req.params.id;

    req.store.posts[postId].comments.splice(id, 1)
  	res.status(204).send()
  }  
}