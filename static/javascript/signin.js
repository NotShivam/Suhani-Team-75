async function login(){
    // console.log('hello');
    // console.log(document.getElementById('form3Example3'));
    var form = document.getElementById("signInMyForm");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
    let email=document.getElementById('signInUsername').value;
    let password=document.getElementById('signInPassword').value;
    let obj={email,password};
    const response=await fetch('/api/user/signin',{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    const data=await response.json();
    // console.log(data);
    if(!data.error)
    {
        console.log("Hello");
        location.href='/dashboard';
    }
    else{
        console.log(data);
    }
}
async function signup(){
    // console.log('hello');
    // console.log(document.getElementById('form3Example3'));
    var form = document.getElementById("signUpMyForm");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
    let email=document.getElementById('signUpEmail').value;
    let password=document.getElementById('signUpPassword').value;
    let name=document.getElementById('signUpName').value;
    let phone=document.getElementById('signUpPhone').value;
    let obj={email,password,name,phone};
    const response=await fetch('/api/user/signup',{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    const data=await response.json();
    // console.log(data);
    if(!data.error)
    {
        
        location.href='/dashboard';
    }
    else{
        console.log(data);
    }
}