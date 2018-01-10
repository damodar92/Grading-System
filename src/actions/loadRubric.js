var request = require('superagent');

export default function loadRubric() {
	return function (dispatch) {
	console.log("inside loadRubric")
	request
		.get('http://localhost:3009/loadRubric')
		.end((err,res) => {
			if(err) {
				console.log("Error",err);
			}
			else {
				if(res.body.code == 200)
					dispatch({type:"RUBRICDATA_RECEIVED",payload:res.body.data})
			}
		})	
	}
}