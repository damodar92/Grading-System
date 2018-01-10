var request = require('superagent');

export function update(value,cb) {
	request
		.post('http://localhost:3009/updateFeedback')
		.send({feedbackData:value})
		.end((err,res) => {
			if(err) {
				cb(err);
			}
			else {
				cb(res.body);
			}
		})
}
//module.exports.update = update;