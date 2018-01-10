const loadStudents = (state = { loadStudents: "", studentsLoaded: false, displayStudents: false }, action) => {
    switch (action.type) {
        case 'STUDENTSLIST_RECEIVED':
            state = {
                ...state,
                loadStudents: action.payload,
                studentsLoaded: true
            }
            break;
        case 'DISPLAY_STUDENTS' :
         	state ={
         		...state,
         		displayStudents:true,
         		studentsLoaded:false
         	}
         	break;
    }
    return state;
}

export default loadStudents;