const loadAssignmentsList = (state = { loadAssignmentsList: "", assignmentsListLoaded: false, displayAssignmentsList: false }, action) => {
    switch (action.type) {
        case 'ASSIGNMENTSLIST_RECEIVED':
            state = {
                ...state,
                loadAssignmentsList: action.payload,
                assignmentsListLoaded: true
            }
            break;
        case 'DISPLAY_ASSIGNMENTSLIST' :
            state ={
                ...state,
                displayAssignmentsList:true,
                assignmentsListLoaded:false
            }
            break;
    }
    return state;
}

export default loadAssignmentsList;