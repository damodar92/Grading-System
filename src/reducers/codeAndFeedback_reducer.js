const codeAndFeedbackReducer = (state = { loadFeedback:"", loadCode:"", cfReceived:false, loadDataError:false, loadDataErrorMessage:"" }, action ) => {
	switch(action.type) {
		case 'CODEFEEDBACKRECEIVED':
			state = 
                {
                    ...state,
                    cfReceived:true,
                    loadFeedback:action.feedback,
                    loadCode:action.code,
                    loadDataError:false,
                    loadDataErrorMessage:""
                }
			break;
        case 'ASSIGNMENT_FOLDER_NOT_FOUND':
            state =
                {
                    ...state,
                    cfReceived:false,
                    loadFeedback:"",
                    loadCode:false,
                    loadDataError:true,
                    loadDataErrorMessage:"Assignment folder not found"
                }
	}
	return state;
}

export default codeAndFeedbackReducer;