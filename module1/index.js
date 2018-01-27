const fs = require('fs')
const csv = require('csvtojson')

const fileIn = 'customer-data.csv'
const fileOut = 'customer-data.json'

fs.readFile(fileIn, 'utf8', (err,data) => {
	if (err) return console.log(err);

	parseData(data)
});

const parseData = (data) => {
	let obj = {
		jsonstr : []
	}

	csv().fromString(data)
		.on('json', (jsonObj) => {

			obj.jsonstr.push(jsonObj)
		})
		.on('done',() => {
			
			let str = JSON.stringify(obj.jsonstr,null,2)

			fs.writeFile(fileOut, str, (err) => {  
			    
			    if (err) throw err;

			    console.log('Json saved!');
			}); 
		})
}
