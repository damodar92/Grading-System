import React, { Component } from 'react';
import './App.css';
import CodePane from './components/codePane.js'
import FeedbackPane from './components/feedbackPane.js'
import Notifications, {notify} from 'react-notify-toast';
import LeftPane from './components/leftPane.js'

var loadRubric = require('./actions/loadRubric.js')
var updateFeedBackApi = require('./actions/updateFeedBackApi.js')
var loadCodeandFeedback = require('./actions/loadCodeandFeedback.js')

class App extends Component {
	componentWillMount() {
		this.setState({codeData:"", feedback:""})
		loadRubric.loadRubric(() => {

		})
	}

	loadData = () => {
		loadCodeandFeedback.loadData((res) => {
			this.setState({
            	codeData:res.code, 
            	feedback:res.feedback
            });
		})
	}

	callUpdateFeedbackApi = () => {
		let val = document.getElementById('feedback').value;
		updateFeedBackApi.update(val,(res) => {
			if(res.code == 200) {
				notify.show('Successfully updated',"success",1500,"green");				
			} else {
				notify.show('Error in updating',"error",1500,"red");
			}
		})
	}

	render() {
		return (
		<div id = 'app'>
		  <div id = 'topPane'>
		  	<h3>Grading System</h3>
		  </div>
		  <div id='mainDiv' className="App">      	
		    <div id = 'leftPane'>
				<LeftPane />	    	
		    </div>
		    <div id = 'rightPane'>
		        <CodePane data={this.state.codeData}/>
		        <FeedbackPane data={this.state.feedback}/>	        
		    </div>
		    <Notifications />
		    <div id ='submitDiv'>
				<input type='submit' id = 'submit' onClick={this.callUpdateFeedbackApi}></input>
			</div>
		  </div>
		</div>
		);
	}
}

export default App;
//<input type='file' accept='.txt' id='codeInput' onChange={this.readCodeFile}></input>