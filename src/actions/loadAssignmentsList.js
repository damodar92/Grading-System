var request = require('superagent');

export default function loadAssignmentsList() {
    return function (dispatch) {
        console.log("inside loadAssignmentsList")
        request
            .post('http://localhost:3009/loadAssignmentsList')
            .send({grader:"grader1"})
            .end((err,res) => {
                if(err) {
                    console.log("Error",err);
                }
                else {
                    console.log(res.body)
                    if(res.body.code == 200)
                        dispatch({type:"ASSIGNMENTSLIST_RECEIVED",payload:res.body.data})
                }
            })
    }
}