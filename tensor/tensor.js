// const cocoSsd=require('@tensorflow-models/coco-ssd');
// const { mod } = require('@tensorflow/tfjs-node');
const { mod, data } = require("@tensorflow/tfjs-node");
const axios=require('axios');
const tf=require("@tensorflow/tfjs-node");
const handler = tf.io.fileSystem("/Users/devpatel/Desktop/Development/CFG/trainedModel/model.json");
// require("@tensorflow/tfjs-node");
// const iris=require("./test-case-generator");
const irisTesting=require("./iris-testing.json");
// console.log(iris);
let array=[
    "start antihypertensive medication",
        "medicines that include hormone boosters, vitamin B-12 medicines and proper diet.",
        "In the later stages, women usually find it difficult to sleep on the back and this should also be avoided. This position puts pressure on the uterus and can be uncomfortable for both mother and child. Sleeping on your left is advisable at this stage.",
        "Eat enough calories (about 300 more calories than normal per day).",
        "the recommended weight gain is 11 to 20 pounds (about 5 to 9 kilograms).",
]
//convert/setup data
// const trainingData =tf.tensor2d(iris.map(item=>[
//     (item.bloodPressure)/180,(item.month)/9,(item.height)/200,(item.weight)/200
// ]));
// const outputData=tf.tensor2d(iris.map(item=>[
//     (item.first),(item.second),(item.third),(item.fourth),(item.fifth)
// ]));
// trainingData.print();
// outputData.print();
// testingData.print();
//build network
// let model=tf.sequential();
let model;
async function run(val){
    // console.log(val);
    const testingData =tf.tensor2d(val.map(item=>[
        (item.bloodPressure)/180,(item.month)/9,(item.height)/200,(item.weight)/200
    ]));
    // console.log("-------------------------------------------");
    // console.log(model);
    // let response=await axios.get('http:localhost:3000/api/general/model');
    // let ans=await response.json();
    // console.log(ans);
    model=await tf.loadLayersModel(handler);
    // console.log(model);
    model.compile({
        loss:'meanSquaredError',
        optimizer:tf.train.adam(0.06),
    });
    let answer=await model.predict(testingData).data();
    let suggestions=[],i=0;
    answer.forEach(item => {
        if(item>=0.7)
        {
            suggestions.push(array[i]);
            i++;
        }
    });
    return suggestions;
}
module.exports=run;
// model.add(tf.layers.dense({
//     inputShape:[4],
//     activation:'sigmoid',
//     units:8
// }));
// model.add(tf.layers.dense({
//     units:5,
//     activation:'sigmoid'
// }));
// model.compile({
//     loss:'meanSquaredError',
//     optimizer:tf.train.adam(0.06),
// })
// // train network
// model.fit(trainingData,outputData,{epochs:100})
// .then(async (history)=>{
//     console.log(history);
//     let data=model.predict(testingData);
//     console.log(data);
//     let dev=await model.save('file://trainedModel');
//     console.log(dev);
// });
//test our network
