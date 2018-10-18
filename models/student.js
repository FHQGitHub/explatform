const connection=require("./connect")

/**
 * Author: 
 * Date: 
 * Time: 
 * Comment: 
 */
exports.getCourse= async function(student_id){
    let data=await connection.batch(`
    SELECT * FROM subject WHERE subject_id in(
        SELECT DISTINCT subject_id FROM class WHERE class_id IN (
            SELECT DISTINCT class_id FROM class_join WHERE student_id=?
        )
    )`,[student_id]);
    //return data
    console.log(data)
    if(data.status == 0){
        return data
    }
    else if(data.info==""){
        data.status=0
        return data
    }
    else{
        for(let i=0; i<data.info.length; i++){
            data.info[i]={
                course_id:data.info[i].subject_id,
                course_name:data.info[i].subject_name
            }
        }
        return data
    }
}

/**
 * Author: 
 * Date: 
 * Time: 
 * Comment: 
 */
exports.getExp=async function(course_id,student_id){
    //let data =await connection.execute("SELECT * FROM `experiment_recard` where student_id=? and experiment_id in (SELECT experiment_id FROM experiment WHERE `subject_id` = ?)",[student_id, course_id]);
    let data =await connection.batch(`SELECT * FROM 
    experiment_recard JOIN experiment
    ON experiment_recard.experiment_id=experiment.experiment_id
    where 
    student_id= ? and experiment_recard.experiment_id in (
    SELECT DISTINCT experiment_id FROM experiment_recard WHERE subject_id = ?
    )`,[student_id, course_id]);
    console.log(data)
    if(data.info==""){
        data.status=0
        return data
    }
    else if(data.status != 1){
        return data
    }
    else{
        for(let i=0; i<data.info.length; i++){
            data.info[i] = {
                id: data.info[i].experiment_id,
                name: data.info[i].name,
                score:{
                    report:data.info[i].grade,
                    action:data.info[i].operation
                },
                student_id:data.info[i].student_id
            }
        }
        return data
    }
}

/**
 * Author: 
 * Date: 
 * Time: 
 * Comment: 
 */
exports.setReport=async function(student_id,exp_id,article){
    let data = await connection.execute("UPDATE experiment_recard set `section` = ? where `student_id` = ? and `experiment_id` = ?",[article, student_id,exp_id]);
    return{
       status:1,
       info:"EXECUTE DOWN!"
    }
}