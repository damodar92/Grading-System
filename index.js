const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const updateFeedback = require('./updateFeedback.js');
const loadStudentCode = require('./loadStudentCode.js');
const loadRubric = require('./loadRubric.js');
const loadStudents = require('./loadStudents.js');
const loadAssignmentsList = require('./loadAssignmentsList.js');
const downloadFile = require('./downloadFile.js');

const basePath = '/Users/DamodarBhat/WebstormProjects/grading_system/apis/401-handin/'

app.use(bodyParser.json());

app.use((req,res,next)=>{	
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
})

app.listen(3009,() => {
    console.log("Listening on 3009");
})

app.post('/loadStudents', (req,res,next) => {
	loadStudents.loadStudents(req,res,basePath,(response) => {
		res.send(response);
	})
})

app.post('/loadAssignmentsList', (req,res,next) => {
    loadAssignmentsList.loadAssignmentsList(req,res,basePath,(response) => {
        res.send(response);
    })
})

app.post('/createzip', (req,res,next) => {
    downloadFile.downloadFile(req, res, basePath, (response) => {
    	res.send(response);
    })
    //let file = __dirname + '/apis.zip';
    //res.download(file)
})

app.get('/download/:student/:assignment', (req, res, next) => {
	let student = req.params.student
	let assignment = req.params.assignment
	let file = basePath + student + '/' + assignment + '/' + student +'.zip' 
	console.log("file - -", file);
	res.download(file);	
})

app.post('/updateFeedback',(req, res, next) => {
	updateFeedback.updateFeedback(req, res, basePath,(response) => {
		res.send(response);
	})
})

app.post('/loadStudentCode',(req,res,next) => {
	loadStudentCode.loadStudentCode(req,res,basePath,(response) => {
		res.send(response);
	})	
})

app.get('/loadRubric',(req,res,next) => {
	loadRubric.loadRubric(req,res,(response) => {
		res.send(response);
	})
})