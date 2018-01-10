const fs = require('fs');
var zipFolder = require('zip-folder');

function downloadFile(req, res, basePath, cb) {
    let student = req.body.student;
    let assignment = req.body.assignment;
    let path = basePath + student + '/' + assignment
    fs.readdir(path ,(err, folders) => {
        if (err) {
            cb({
                code: 400,
                message: "Error in finding assignment folder",
                data: err
            })
        } else {
            for (let i = folders.length - 1; i >= 0; i--) {
                let directoryCheck = fs.lstatSync(path + '/' + folders[i]).isDirectory();
                if (directoryCheck) {
                    path = path + '/' + folders[i];
                    break;
                }
            }
            console.log(path)
            zipFolder(path, basePath + student + '/' + assignment + '/' + student + '.zip' ,(err) => {
                if(err) {
                    cb({
                        code:400,
                        message:"Error in creating zip file"
                    })
                } else {
                    cb({
                        code:200,
                        message:"Success",
                    })
                }
            })            
        }
    })
}

module.exports.downloadFile = downloadFile;