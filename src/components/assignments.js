import React,{Component} from 'react';
import loadAssignmentsList from '../actions/loadAssignmentsList.js'
import loadData from '../actions/loadCodeandFeedback';
import {connect} from 'react-redux';

class Assignments extends Component {
    componentWillMount = () => {
        this.setState({assignmentsList:""})
        this.props.dispatch(loadAssignmentsList())
    }

    componentWillReceiveProps = (nextProps) => {
        let assignmentsListArray = []
        let assignmentsList = nextProps.loadAssignmentsList;
        console.log("inside componentwillreceiveprops asignment",nextProps)
        if(nextProps.assignmentsListLoaded == true) {
            assignmentsListArray.push(
                <option selected disabled value={"default"}>Select assignment...</option>
            )
            for(let i = 0;i<assignmentsList.length;i++) {
                assignmentsListArray.push(
                    <option value = {assignmentsList[i]}>{assignmentsList[i]}</option>
                )
            }
            this.setState({assignmentsList:assignmentsListArray})
        }
    }

    loadStudentData = () => {
        let student = document.getElementById('studDropdown').value
        let assignment = document.getElementById('assignmentsDropdown').value
        if(student != "default")
            this.props.dispatch(loadData(student, assignment));
    }

    render = () => {
        return (
            <select id = 'assignmentsDropdown' className = 'borderProps' onChange = {this.loadStudentData}>
                {this.state.assignmentsList}
            </select>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        loadAssignmentsList:store.loadAssignmentsList.loadAssignmentsList,
        assignmentsListLoaded:store.loadAssignmentsList.assignmentsListLoaded
    }
}

export default connect(mapStateToProps)(Assignments);