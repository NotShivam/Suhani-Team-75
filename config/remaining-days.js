var CronJob = require('cron').CronJob;
const User=require('../models/user');
var job = new CronJob('00 00 00 * * 0-6',async function() {
    help();
  }, function () {
    console.log('finished');
  },
  true, /* Start the job right now */
  "America/Los_Angeles"/* Time zone of this job. */
);
async function help(){
    console.log("hello");
    await User.find({},async(err,users)=>{
        if(!err)
        {
            users.forEach(async (item)=>{
                item.remainingDays--;
                await item.save();
            })
        }
        else{
            console.log(err);
        }
    }).clone();
    console.log("Done");
}