import React,{Component} from 'react';
import { connect } from 'react-redux'
import loadRubric from '../actions/loadRubric.js'
import loadData from '../actions/loadCodeandFeedback.js'
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
import Notifications, {notify} from 'react-notify-toast';
import SkyLight from 'react-skylight';
import Loader from './loader.js';
import loadStudents from '../actions/loadStudents.js';
import Assignments from './assignments.js';

var modal = {    
    width: '45%',
    height: '18%',
    borderRadius: '15px'
};

class LeftPane extends Component {
	componentWillMount = () => {
		this.setState({guidelines:<Loader />,studentsList:""});
		this.props.dispatch(loadStudents());
		this.props.dispatch(loadRubric());
	}

	componentWillReceiveProps = (nextProps) => {
		console.log("inside componentWillReceiveProps")
		let guidelines = [];
		let studentsListArray = [];
		let rubricData = nextProps.loadRubric;
		let studentsList = nextProps.loadStudents;		
		if(nextProps.rubricLoaded == true) {
			console.log("inside nextProps",rubricData)
			for(let i = 0;i<rubricData.length;i++) {
				guidelines.push(
					<div id = 'block'>
						<input type = 'checkbox' id = {i} className = 'guidelinesCheckbox' onClick={()=>this.checkboxClicked(rubricData[i], i)}></input>						
						<input type = 'text' className = 'guidelinesData borderProps' value = {rubricData[i].shortForm} disabled></input>&nbsp;
						<label className = 'gradeClass'>{rubricData[i].grade}</label>
						<button value = 'more' className = 'more' onClick = { () => this.showFullInfo(rubricData[i].fullForm)}>More</button>
					</div>
					)
			}
		this.setState({guidelines:guidelines})
		}

		if(nextProps.studentsLoaded == true) {
			console.log("inside studentsList", studentsList)
			studentsListArray.push(
						<option selected disabled value = 'default'>Select students...</option>
				)			
			for(let i = 0;i<studentsList.length;i++) {
				studentsListArray.push(
						<option value = {studentsList[i]}>{studentsList[i]}</option>								
					)
			}
			this.setState({studentsList:studentsListArray})
		}
	}

	showFullInfo = (fullForm) => {
		this.simpleDialog.show();
		this.setState({fullForm:fullForm})		
	}

	checkboxClicked = (rubricData, index) => {
		if(document.getElementById(index).checked == true) {
			this.props.dispatch({type:"ADDRUBRIC", rubricData:rubricData, rubricId:index, rubricOperation:1})
		} else {
			this.props.dispatch({type:"REMOVERUBRIC", rubricData:rubricData, rubricId:index, rubricOperation:0})
		}
	}
	
	loadStudentData = () => {
		let student = document.getElementById('studDropdown').value
        let assignment = document.getElementById('assignmentsDropdown').value
        if(assignment != "default")
		    this.props.dispatch(loadData(student, assignment));
	}

	render = () =>{
		return(
				<div id = 'leftPane'>                    
					<div id = 'studentsList'>
						<div id = 'selectStudentsDiv' className = 'borderProps'>
							<h4>Students</h4>
							<hr/>						
							<select id = 'studDropdown' className = 'borderProps' onChange = {this.loadStudentData}>
								{this.state.studentsList}
							</select>
                            <Assignments />
						</div>
					</div>
					<div id = 'rubric' className = 'borderProps'>
						<h4>Guidelines</h4>
						<hr/>
						<div id = 'guidelines'>							
							{this.state.guidelines}
						</div>
					</div>
					<Notifications />
					<SkyLight dialogStyles = {modal} hideOnOverlayClicked ref = {ref => this.simpleDialog = ref}>
						<div>
							<h4>Description</h4>
							<hr />
							{this.state.fullForm}	
						</div>			       
			        </SkyLight>
				</div>
			)
	}
}

const mapStateToProps = (store) => {
	return {
		loadRubric:store.loadRubric.loadRubric,
		rubricLoaded:store.loadRubric.rubricLoaded,
		loadStudents:store.loadStudents.loadStudents,
		studentsLoaded:store.loadStudents.studentsLoaded
	}
}

export default connect(mapStateToProps)(LeftPane);

//<a href="javascript:void(0)" onClick={this.loadData}>Student1</a>