const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorHandler = require('errorhandler')
const routes = require('./routes')

let app = express()

let store = {
  posts: [
    {
	    name: 'Top 10 ES6 Features every Web Developer must know',
	    url: 'https://webapplog.com/es6',
	    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
	    comments: 
	    [
	      'Cruel…..var { house, mouse} = No type optimization at all',
	      'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
	      '(p1,p2)=>{ … } ,i understand this ,thank you !'      
	    ]
    }
  ]
}

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(function (req, res, next) {
  req.store = store
  next()
})
app.use(errorHandler())


app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:id', routes.posts.updatePost)
app.delete('/posts/:id', routes.posts.removePost)

app.get('/comments/:postId', routes.comments.getComments)
app.post('/comments/:postId', routes.comments.addComment)
app.put('/comments/:postId/:id', routes.comments.updateComment)
app.delete('/comments/:postId/:id', routes.comments.removeComment)


app.listen(3000);
