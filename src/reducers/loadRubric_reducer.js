const loadRubric = (state = { loadRubric: "", rubricLoaded: false, displayRubric: false }, action) => {
    switch (action.type) {
        case 'RUBRICDATA_RECEIVED':
            state = {
                ...state,
                loadRubric: action.payload,
                rubricLoaded: true
            }
            break;
        case 'DISPLAY_RUBRIC' :
         	state ={
         		...state,
         		displayRubric:true,
         		rubricLoaded:false
         	}
         	break;
    }
    return state;
}

export default loadRubric;