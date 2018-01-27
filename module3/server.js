const async = require('async')
const mongodb = require('mongodb')
const customers = require('./m3-customer-data.json')
const addrData = require('./m3-customer-address-data.json')
const url = 'mongodb://localhost:27017/customers'

let p = parseInt(process.argv[2])

mongodb.MongoClient.connect(url, (error, db) => {
  	if (error) return process.exit(1)
	let tasks = []
	let prev = 0
	customers.forEach((element, index, array) => {
		customers[index] = Object.assign(element, addrData[index])
		
		if ((index + 1) % p == 0 || index == customers.length - 1) {

			let start = prev
			let end = index
			tasks.push((done) => {
				console.log("processing indexes " + start + " to " + end)
				db.collection('users').insert(customers.slice(start, end+1), (error, results) => {
					done(error,results)
				})
			})
			prev = end + 1
		}
	})

	async.parallel(tasks, (error, results) => {
	  if (error) console.error(error)

	  db.close()
	})
})

