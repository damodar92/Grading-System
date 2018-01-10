const fs = require('fs');

function loadAssignmentsList(req,res,basePath,cb) {
    let grader = req.body.grader;
    fs.readFile(basePath + grader + '_assignments.txt','utf-8',(err,res) => {
        if(err) {
            cb({
                code:400,
                message:"Error in reading file",
                data:err
            })
        } else {
            let data = [];
            res = res.split("\n");
            for(let i = 0;i<res.length;i++) {
                res[i] = res[i].replace("\r","");
                if(res[i] == "")
                    continue;
                data.push(
                    res[i]
                )
            }
            cb({
                code:200,
                message:"Success",
                data:data
            })
        }
    })
}

module.exports.loadAssignmentsList = loadAssignmentsList;