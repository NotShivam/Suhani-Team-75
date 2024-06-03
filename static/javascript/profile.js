async function sendData() {
  let data=document.getElementById('profile-image');
  const formData  = new FormData();
  formData.append('image', data.files[0]);
  const response = await fetch('/api/user/profile-pic', {
    method: 'POST',
    body: formData
  });
  const ans=await response.json();
  console.log(ans);
  let dataText;
  let array;
  Tesseract.recognize(
      ans.profilePic,
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      dataText=text.trim();
      array=dataText.split('\n');
      console.log(array);
      array.forEach(item=>{
          if(item==="")
          {
            
          }
          else{
            let temp=item.split(":-");
          console.log(temp[0].trim());
          document.getElementById(temp[0].trim()).value=temp[1];
          }
          
      })
    })
    
}
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
var tech = GetURLParameter('id');
console.log(tech)
async function save(){
  let obj={};
  let data=document.getElementById('blah-1');
  const formData  = new FormData();
  formData.append('image', data.files[0]);
  formData.append('id',tech);
  formData.append('name',document.getElementById('Name').value.trim());
  formData.append( 'location',document.getElementById('Location').value.trim());
  formData.append('height',document.getElementById('Height').value.trim());
  formData.append('weight',document.getElementById('Weight').value.trim());
  formData.append('haemoglobin',document.getElementById('Haemoglobin').value.trim());
  formData.append('bloodPressure',document.getElementById('BloodPressure').value.trim());
  formData.append('month',document.getElementById('Time').value.trim());
  formData.append('gender',document.getElementById('Gender').value.trim());
  obj.name=document.getElementById('Name').value;
  obj.location=document.getElementById('Location').value;
  obj.height=document.getElementById('Height').value;
  obj.weight=document.getElementById('Weight').value;
  obj.haemoglobin=document.getElementById('Haemoglobin').value;
  obj.bloodPressure=document.getElementById('BloodPressure').value;
  obj.month=document.getElementById('Time').value;
  obj.gender=document.getElementById('Gender').value;
  let res=await fetch('/api/user/savewomen',{
      method:"POST",
      body:formData
  })
  let ans=await res.json();
  console.log(ans);
}
async function addingWomen(){
  let obj={};
  let data=document.getElementById('blah-1');
  const formData  = new FormData();
  formData.append('image', data.files[0]);
  // formData.append('id',tech);
  formData.append('name',document.getElementById('Name').value.trim());
  formData.append( 'location',document.getElementById('Location').value.trim());
  formData.append('height',document.getElementById('Height').value.trim());
  formData.append('weight',document.getElementById('Weight').value.trim());
  formData.append('haemoglobin',document.getElementById('Haemoglobin').value.trim());
  formData.append('bloodPressure',document.getElementById('BloodPressure').value.trim());
  formData.append('month',document.getElementById('Time').value.trim());
  formData.append('gender',document.getElementById('Gender').value.trim());
  obj.name=document.getElementById('Name').value;
  obj.location=document.getElementById('Location').value;
  obj.height=document.getElementById('Height').value;
  obj.weight=document.getElementById('Weight').value;
  obj.haemoglobin=document.getElementById('Haemoglobin').value;
  obj.bloodPressure=document.getElementById('BloodPressure').value;
  obj.month=document.getElementById('Time').value;
  obj.gender=document.getElementById('Gender').value;
  let res=await fetch('/api/user/addwomen',{
      method:"POST",
      body:formData
  })
  let ans=await res.json();
  console.log(ans);
}
async function getGuidelines(){
  console.log(tech);
  if(tech)
  {
    let obj={};
    obj.id=tech;
    // console.log(obj);
    // let response=await fetch('/api/user/getwomendetails',{
    //   method:'POST',
    //   headers:{
    //     'Content-Type':"application/json"
    //   },
    //   body:JSON.stringify(obj)
    // });
    // let answer=await response.json();
    // console.log(answer);
    let res=await fetch('/api/user/prediction',{
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(obj)
    });
    let ans=await res.json();
    console.log(ans);
    obj.id=tech;
    document.getElementById('Name').value=ans.women.name;
    document.getElementById('Location').value=ans.women.location;
    document.getElementById('Height').value=ans.women.height;
    document.getElementById('Weight').value=ans.women.weight;
    document.getElementById('Haemoglobin').value=ans.women.haemoglobin;
    document.getElementById('BloodPressure').value=ans.women.bloodPressure;
    document.getElementById('Time').value=ans.women.month;
    document.getElementById('Gender').value=ans.women.gender;


    let dev=document.getElementById('row');
    let html='';
    ans.data.forEach(item=>{
      html+=`<div class="col-md-4">
      <div class="card p-3 mb-2">
          <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                  <div class="icon"> <i class="bx bxl-mailchimp"></i> </div>
                  <div class="ms-2 c-details">
                      <h6 class="mb-0">Recommendation</h6>
                  </div>
              </div>
              <div class="badge">  </div>
          </div>
          <div class="mt-5">
              <h3 class="custom-class">${item}<br></h3>
              
          </div>
      </div>
  </div>`
    });
    dev.innerHTML=html;
  }
  else{
    let data=[];
    data.push("Set up first prenatal appointment ");
    data.push("intake of folic rich supplements ");
    data.push("No consumption of undercooked food");
    let dev=document.getElementById('row');
    let html='';
    data.forEach(item=>{
      html+=`<div class="col-md-4">
      <div class="card p-3 mb-2">
          <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                  <div class="icon"> <i class="bx bxl-mailchimp"></i> </div>
                  <div class="ms-2 c-details">
                      <h6 class="mb-0">Recommendation</h6>
                  </div>
              </div>
              <div class="badge">  </div>
          </div>
          <div class="mt-5">
              <h3 class="custom-class">${item}<br></h3>
              
          </div>
      </div>
  </div>`
    });
    dev.innerHTML=html;
  }
}
getGuidelines();
function readURL1(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah')
              .attr('src', e.target.result)
              .width(150)
              .height(200);
      };

      reader.readAsDataURL(input.files[0]);
  }
}
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#profile-image-img')
              .attr('src', e.target.result)
              .width(150)
              .height(200);
      };

      reader.readAsDataURL(input.files[0]);
  }
}