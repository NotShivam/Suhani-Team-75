async function contact(){
    console.log("error");
    var form = document.getElementById("myForm");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
    let email=document.getElementById('email').value;
    let name=document.getElementById('name').value;
    let subject=document.getElementById('subject').value;
    let message=document.getElementById('message').value;
    let phone=document.getElementById('phone').value;
    let obj={email,name,subject,message,phone};
    const respone=await fetch('/api/general/contact-us',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(obj)
    });
    const data=await respone.json();
    console.log(data);
}