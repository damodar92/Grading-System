const fs = require('fs');

function loadRubric(req,res,cb) {
	fs.readFile('/Users/DamodarBhat/WebstormProjects/grading_system/apis/Rubrik.txt','utf-8',(err,res) => {
		if(err) {
			cb({
				code:400,
				message:"Error in reading file",
				data:err
			})
		} else {
			let data = [];
			res = res.split("\n");
			for(let i = 0;i<res.length;i = i+3) {
				res[i] = res[i].replace("\t","");
				res[i] = res[i].replace("\r","");
				if(res[i] == "" || res[i+1] == "" || res[i+2] == "")
					continue;
				data.push({
					grade:res[i],
					shortForm:res[i+1],
					fullForm:res[i+2]
				})				
			}
			cb({
				code:200,
				message:"Success",
				data:data
			})
		}		
	})
}

module.exports.loadRubric = loadRubric;