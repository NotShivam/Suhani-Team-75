console.log("hello");
async function getData(){
    let data=await fetch('/api/general/tracker');
    let answer=await data.json();
    console.log(answer);
    document.getElementById('active-workers').innerHTML=answer.user.length;
    document.getElementById('women-reached').innerHTML=answer.women.length;
}
getData();
