// const { rand } = require("@tensorflow/tfjs-node");

let array=[];
for(let i=0;i<100;i++)
{
    let obj={};
    obj.first=0;
    obj.second=0;
    obj.third=0;
    obj.fourth=0;
    obj.fifth=0;
    obj.bloodPressure=Math.floor(Math.random() * (140-60  + 1)) + 60;
    obj.month=Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    obj.weight=Math.floor(Math.random() * (200 - 30 + 1)) + 30;
    obj.height=Math.floor(Math.random() * (180-125 + 1)) + 125;
    if(obj.bloodPressure>=140)
    {
        obj.first=1;
    }
    else if(obj.bloodPressure<=90)
    {
        obj.second=1;
    }
    if(obj.month<=3)
    {
        obj.first=1
    }
    let temp=obj.height/100;
    temp=(temp*temp);
    let bmi=(obj.weight)/(temp);
    if(bmi>=30)
    {
        obj.fifth=1
    }
    obj.third=Math.floor(Math.random()*(1-0))+1;
    array.push(obj);
}
// console.log(array);
module.exports=array;