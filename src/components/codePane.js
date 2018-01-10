import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import 'brace/theme/chrome';
import Switch from 'react-toggle-switch';
import "../switch.css"
import 'brace/theme/monokai'
import downloadIcon from '../download.png';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
let downloadFile = require('../actions/downloadFile.js');

export default class CodePane extends Component {
	componentWillMount = () =>{
		this.setState({codeData:"", switchTheme:true});
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({
			codeData:nextProps.codeData
		})
	}

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                switchTheme: !prevState.switchTheme
            };
        });
    };

	downloadFile = () => {
		let student = document.getElementById('studDropdown').value
        let assignment = document.getElementById('assignmentsDropdown').value
        if (assignment == 'default')
            toast.error("Please select assignment", {
                position: toast.POSITION.TOP_CENTER
            })
        else if (student == 'default') {
            toast.error("Please select student", {
                position: toast.POSITION.TOP_CENTER
            })
        } else {
		    downloadFile.downloadFile(student, assignment, (res) => {
		        if(res) {
	                window.location.href = 'http://localhost:3009/download/' + student + '/' + assignment;
	            } else {
	                toast.error("Error in downloading", {
	                    position: toast.POSITION.TOP_CENTER
	                })
	            }
	        })
		}
    }

	render() {
		return (<div id = 'codePane' className = 'borderProps'>
                  <div style = {{"height":"3%"}}>
                      <h4>Code</h4>
                      <Switch onClick={this.toggleSwitch} on={this.state.switchTheme}/>
                      <button id = 'downloadbutton' onClick={this.downloadFile} title = 'Download code'>Download(.zip)</button>
                  </div>
                  <hr/>
	              <AceEditor
					  mode="java"
					  theme={this.state.switchTheme ? "chrome":"monokai"}
					  name="codeDisplay"
					  value={this.state.codeData}
					  fontSize={12}
					  showPrintMargin={true}
					  showGutter={true}
					  highlightActiveLine={true}
					  style={{
					  	width:"98%",
					  	height:"91%",
    					"marginLeft": "1%",
    					"borderRadius":"4px"
					  }}
					  setOptions={{
					  enableBasicAutocompletion: false,
					  enableLiveAutocompletion: false,
					  enableSnippets: false,
					  showLineNumbers: true,
					  }}/>
                  <ToastContainer
                        type="error"
                        autoClose={3000}
                        closeOnClick
                        hideProgressBar
                  />
	    		</div>)
	}
}