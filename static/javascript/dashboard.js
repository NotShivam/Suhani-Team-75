$('.button, .close').on('click', function(e) {
    e.preventDefault();
    $('.detail, html, body').toggleClass('open');
  });

  function redirect(url)
  {
    url="/profile/?id="+url;
    location.href=url;
  }

  function travel(){
    location.href="/profile";
  }

  async function signout(){
    let res=await fetch('/api/user/signout');
    let ans=await res.json();
    if(!ans.error)
    {
      location.href='/';
    }
  }