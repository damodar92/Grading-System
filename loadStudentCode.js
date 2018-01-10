const fs = require('fs');

function loadStudentCode (req,res,basePath,cb) {
	let student = req.body.student;
	let assignment = req.body.assignment;
	let codePath = basePath + student + '/' + assignment;
    let code = "";
    let feedback = "";
    let path = false;
    fs.readdir(codePath, (err, folders) => {
        if(err) {
            let response = {
                code:400,
                message:"Assignment folders not present"
            };
            res.send(response);
        } else {
            for(let i = folders.length - 1;i >= 0 ; i--) {
                let directoryCheck = fs.lstatSync(codePath + '/' + folders[i]).isDirectory();
                if (directoryCheck) {
                    path = codePath + '/' + folders[i];
                    break;
                }
            }

            if(path == false) {
                res.send({
                    code:400,
                    message:"Code not present"
                })
            } else {
                fs.readdir(path, (err, files) => {
                    for(let j = files.length - 1; j >= 0; j--) {
                        if(files[j].includes(".java")) {
                            code = fs.readFileSync(path + '/' + files[j], 'utf-8');
                            break;
                        }
                    }

                    let feedbackFileExists = fs.existsSync(path + '/feedback.txt');
                    if(feedbackFileExists) {
                        feedback = fs.readFileSync(path + '/feedback.txt', 'utf-8');
                    }

                    res.send({
                        code:200,
                        message:"Success",
                        data:{
                            code:code,
                            feedback:feedback
                        }
                    })
                })
            }
        }
    })
}

module.exports.loadStudentCode = loadStudentCode;