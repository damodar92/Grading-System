var request = require('superagent');

export default function loadData(student, assignment) {
	return function(dispatch) {
		request
		.post('http://localhost:3009/loadStudentCode')
        .send({student:student, assignment:assignment})
		.end((err,res) => {
			if(err) {
				console.log("Error",err);
			}
			else {
				console.log("Response",res.body.data);
				if(res.body.code == 200)
				    dispatch({type:"CODEFEEDBACKRECEIVED" ,feedback:res.body.data.feedback, code:res.body.data.code});
				else
				    dispatch({type:"ASSIGNMENT_FOLDER_NOT_FOUND"});
			}
		})
	}
}