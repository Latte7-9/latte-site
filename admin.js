var R="",T="",site=null,blog=null,gbData=[];

function db(b){return decodeURIComponent(escape(atob(b.replace(/\s/g,""))));}
function eb(s){return btoa(unescape(encodeURIComponent(s)));}
function hb(s){return(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

function api(m,p,c,sha){
  var url="https://api.github.com/repos/"+R+"/contents/"+p;
  var hdrs={"Authorization":"Bearer "+T,"Accept":"application/vnd.github+json"};
  var body=null;
  if(m==="PUT"){body={message:"Update "+p,content:eb(c)};if(sha)body.sha=sha;}
  return fetch(url,{method:m,headers:hdrs,body:body?JSON.stringify(body):null})
  .then(function(r){if(!r.ok)throw new Error(r.status);return r.json();});
}

function msg(id,type,text){
  var el=document.getElementById(id);el.textContent=text;el.className="msg msg"+type;
}

function login(){
  R=document.getElementById("repo").value.trim();
  T=document.getElementById("token").value.trim();
  if(!R||!T){alert("Fill in both fields");return;}
  var s=document.getElementById("status");
  s.textContent="Connecting...";s.className="status sinfo";
  sessionStorage.setItem("mgmt",JSON.stringify({r:R,t:T}));
  api("GET","data/site.json").then(function(j){
    site=JSON.parse(db(j.content));
    return api("GET","data/blog.json");
  }).then(function(j){
    blog=JSON.parse(db(j.content));
  }).catch(function(){
    blog={posts:[]};
  }).then(function(){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("panel").style.display="block";
    fillAll();
    s.textContent="Connected";s.className="status sok";
  }).catch(function(err){
    s.textContent="Failed: "+err.message;s.className="status serr";
  });
}

document.getElementById("tabs").addEventListener("click",function(e){
  var btn=e.target.closest(".tab");if(!btn)return;
  var name=btn.getAttribute("data-tab");
  document.querySelectorAll(".tab").forEach(function(t){t.classList.remove("on");});
  btn.classList.add("on");
  document.querySelectorAll(".tc").forEach(function(t){t.classList.remove("on");});
  document.getElementById("tab-"+name).classList.add("on");
});

function fillAll(){
  document.getElementById("sName").value=site.name||"";
  document.getElementById("sTagline").value=site.tagline||"";
  document.getElementById("sAbout").value=site.about||"";
  document.getElementById("sEmail").value=(site.contact&&site.contact.email)||"";
  if(site.currently){
    document.getElementById("sReading").value=site.currently.reading||"";
    document.getElementById("sListening").value=site.currently.listening||"";
    document.getElementById("sLearning").value=site.currently.learning||"";
    document.getElementById("sWorkingOn").value=site.currently.workingOn||"";
  }
  if(site.books)document.getElementById("sBooks").value=site.books.map(function(b){return b.title+" | "+b.author+" | "+(b.cover||"");}).join("\n");
  fillPhoto();fillBooks();fillHobbies();fillHiking();fillBlog();loadGuestbook();loadImgs();
}

function saveSite(){
  site.name=document.getElementById("sName").value;
  site.tagline=document.getElementById("sTagline").value;
  site.about=document.getElementById("sAbout").value;
  if(!site.contact)site.contact={};site.contact.email=document.getElementById("sEmail").value;
  if(!site.currently)site.currently={};
  site.currently.reading=document.getElementById("sReading").value;
  site.currently.listening=document.getElementById("sListening").value;
  site.currently.learning=document.getElementById("sLearning").value;
  site.currently.workingOn=document.getElementById("sWorkingOn").value;
  var bl=document.getElementById("sBooks").value.split("\n").filter(function(l){return l.trim();});
  site.books=bl.map(function(l){var p=l.split("|");return{title:(p[0]||"").trim(),author:(p[1]||"").trim(),cover:(p[2]||"").trim()};});
  api("GET","data/site.json").then(function(j){return api("PUT","data/site.json",JSON.stringify(site,null,2),j.sha);})
  .then(function(){msg("msgSite","ok","Saved");}).catch(function(err){msg("msgSite","err","Failed: "+err.message);});
}

function fillPhoto(){
  var it=site.interests.find(function(i){return i.name==="\u6444\u5f71";});
  if(!it||!it.albums)it={albums:[]};
  var hh="";
  (it.albums||[]).forEach(function(a,i){
    hh+='<div class="acard"><h4>Album '+(i+1)+'</h4>';
    hh+='<label>Name</label><input class="an" value="'+hb(a.name||'')+'">';
    hh+='<label>Description</label><input class="ad" value="'+hb(a.description||'')+'">';
    hh+='<label>Cover path</label><input class="ac" value="'+hb(a.cover||'')+'">';
    hh+='<label>Images (one per line)</label><textarea class="ai" rows="2">'+(a.images||[]).join("\n")+'</textarea>';
    hh+='<label>Journal</label><textarea class="aj" rows="2" data-rich>'+hb(a.journal||'')+'</textarea>';
    hh+='<button class="btndel" onclick="delAlbum('+i+')">Delete</button></div>';
  });
  document.getElementById("photoList").innerHTML=hh;
}
function addAlbum(){
  var it=site.interests.find(function(i){return i.name==="\u6444\u5f71";});
  if(!it){it={name:"\u6444\u5f71",icon:"camera",page:"interests/photography.html",albums:[]};site.interests.push(it);}
  it.albums.push({name:"",description:"",cover:"",images:[],journal:""});fillPhoto();
}
function delAlbum(i){site.interests.find(function(x){return x.name==="\u6444\u5f71";}).albums.splice(i,1);fillPhoto();}
function savePhoto(){
  var it=site.interests.find(function(i){return i.name==="\u6444\u5f71";});
  if(!it){it={name:"\u6444\u5f71",icon:"camera",page:"interests/photography.html",albums:[]};site.interests.push(it);}
  it.albums=[];
  document.querySelectorAll(".acard").forEach(function(card){
    it.albums.push({name:card.querySelector(".an").value,description:card.querySelector(".ad").value,cover:card.querySelector(".ac").value,images:card.querySelector(".ai").value.split("\n").filter(function(l){return l.trim();}),journal:card.querySelector(".aj").value});
  });
  api("GET","data/site.json").then(function(j){return api("PUT","data/site.json",JSON.stringify(site,null,2),j.sha);})
  .then(function(){msg("msgPhoto","ok","Saved");fillPhoto();}).catch(function(err){msg("msgPhoto","err","Failed: "+err.message);});
}

function fillBooks(){
  var it=site.interests.find(function(i){return i.name==="\u4e66\u7c4d";});if(!it)return;
  function f(arr){return(arr||[]).map(function(b){return b.title+" | "+b.author+" | "+(b.review||"");}).join("\n");}
  document.getElementById("bRead").value=f(it.read);
  document.getElementById("bReading").value=f(it.reading);
  document.getElementById("bWantRead").value=f(it.wantToRead);
}
function saveBooks(){
  var it=site.interests.find(function(i){return i.name==="\u4e66\u7c4d";});
  if(!it){it={name:"\u4e66\u7c4d",icon:"book",page:"interests/books.html"};site.interests.push(it);}
  function p(txt){return txt.split("\n").filter(function(l){return l.trim();}).map(function(l){var x=l.split("|");return{title:(x[0]||"").trim(),author:(x[1]||"").trim(),review:(x[2]||"").trim()};});}
  it.read=p(document.getElementById("bRead").value);
  it.reading=p(document.getElementById("bReading").value);
  it.wantToRead=p(document.getElementById("bWantRead").value);
  api("GET","data/site.json").then(function(j){return api("PUT","data/site.json",JSON.stringify(site,null,2),j.sha);})
  .then(function(){msg("msgBooks","ok","Saved");}).catch(function(err){msg("msgBooks","err","Failed: "+err.message);});
}

function fillHobbies(){
  var it=site.interests.find(function(i){return i.name==="\u4e09\u5206\u949f\u70ed\u5ea6";});
  if(it&&it.hobbies)document.getElementById("hList").value=it.hobbies.join("\n");
}
function saveHobbies(){
  var it=site.interests.find(function(i){return i.name==="\u4e09\u5206\u949f\u70ed\u5ea6";});
  if(!it){it={name:"\u4e09\u5206\u949f\u70ed\u5ea6",icon:"sparkle",page:"interests/hobbies.html"};site.interests.push(it);}
  it.hobbies=document.getElementById("hList").value.split("\n").filter(function(l){return l.trim();});
  api("GET","data/site.json").then(function(j){return api("PUT","data/site.json",JSON.stringify(site,null,2),j.sha);})
  .then(function(){msg("msgHobbies","ok","Saved");}).catch(function(err){msg("msgHobbies","err","Failed: "+err.message);});
}

function fillHiking(){
  var it=site.interests.find(function(i){return i.name==="\u767b\u5c71";});if(!it)return;
  function f(arr,k1,k2){return(arr||[]).map(function(b){return b.name+" | "+(b[k1]||"")+" | "+(b[k2]||"");}).join("\n");}
  document.getElementById("hkClimbed").value=f(it.climbed,"date","note");
  document.getElementById("hkWant").value=f(it.wantToClimb,"reason","reason");
  document.getElementById("hkJournal").value=it.journal||"";
  document.getElementById("hkImages").value=(it.images||[]).join("\n");
}
function saveHiking(){
  var it=site.interests.find(function(i){return i.name==="\u767b\u5c71";});
  if(!it){it={name:"\u767b\u5c71",icon:"mountain",page:"interests/hiking.html"};site.interests.push(it);}
  function p(txt,k1,k2){return txt.split("\n").filter(function(l){return l.trim();}).map(function(l){var x=l.split("|");var o={};o.name=(x[0]||"").trim();o[k1]=(x[1]||"").trim();o[k2]=(x[2]||"").trim();return o;});}
  it.climbed=p(document.getElementById("hkClimbed").value,"date","note");
  it.wantToClimb=p(document.getElementById("hkWant").value,"reason","reason");
  it.journal=document.getElementById("hkJournal").value;
  it.images=document.getElementById("hkImages").value.split("\n").filter(function(l){return l.trim();});
  api("GET","data/site.json").then(function(j){return api("PUT","data/site.json",JSON.stringify(site,null,2),j.sha);})
  .then(function(){msg("msgHiking","ok","Saved");}).catch(function(err){msg("msgHiking","err","Failed: "+err.message);});
}

function fillBlog(){
  if(!blog||!blog.posts)blog={posts:[]};
  var hh="";
  blog.posts.forEach(function(p,i){
    hh+='<div class="bpost">';
    hh+='<label>Title</label><input class="bt" value="'+hb(p.title||'')+'">';
    hh+='<label>Date</label><input class="bd" type="date" value="'+(p.date||'')+'">';
    hh+='<label>Summary</label><input class="bs" value="'+hb(p.summary||'')+'">';
    hh+='<label>Filename (.html)</label><input class="bf" value="'+hb(p.file||'')+'">';
    hh+='<label>Content</label><textarea class="bc" rows="6" data-rich>'+hb(p.content||'')+'</textarea>';
    hh+='<button class="btndel" onclick="delBlog('+i+')">Delete</button></div>';
  });
  document.getElementById("blogList").innerHTML=hh||'<div style="color:#ccc;padding:1rem 0">No posts yet</div>';
}
function addBlog(){
  if(!blog.posts)blog.posts=[];
  blog.posts.push({title:"New Post",date:new Date().toISOString().slice(0,10),summary:"",file:"post-"+Date.now()+".html",content:""});
  fillBlog();
}
function delBlog(i){blog.posts.splice(i,1);fillBlog();}
function saveBlog(){
  var cards=document.querySelectorAll(".bpost");blog.posts=[];
  cards.forEach(function(card){
    blog.posts.push({title:card.querySelector(".bt").value,date:card.querySelector(".bd").value,summary:card.querySelector(".bs").value,file:card.querySelector(".bf").value,content:card.querySelector(".bc").value});
  });
  api("GET","data/blog.json").then(function(j){
    return api("PUT","data/blog.json",JSON.stringify(blog,null,2),j.sha);
  }).then(function(){
    var done=0;
    function next(i){
      if(i>=blog.posts.length){msg("msgBlog","ok","Saved "+done+" posts");fillBlog();return;}
      var p=blog.posts[i];
      var pH='<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1.0">\n<title>'+hb(p.title)+' - Latte</title>\n<link rel="stylesheet" href="../../css/style.css">\n</head>\n<body>\n<nav class="site-nav"><div class="nav-inner"><a class="nav-brand" href="../../index.html">Latte</a><ul class="nav-links"><li><a href="../../index.html">Home</a></li><li><a href="../../blog/">Blog</a></li></ul></div></nav>\n<article class="blog-article"><div class="container"><div class="blog-post-header"><p class="blog-post-date">'+p.date+'</p><h1>'+hb(p.title)+'</h1></div><div class="blog-post-content">'+(p.content||'')+'</div><p class="blog-back"><a href="../../blog/">&larr; Back</a></p></div></article>\n<footer><div class="container"><span>&copy; 2026 Latte</span></div></footer>\n<\/script>\n</body>\n</html>';
      api("GET","blog/posts/"+p.file).then(function(j){return api("PUT","blog/posts/"+p.file,pH,j.sha);}).catch(function(){return api("PUT","blog/posts/"+p.file,pH,null);}).then(function(){done++;next(i+1);}).catch(function(){done++;next(i+1);});
    }
    next(0);
  }).catch(function(err){msg("msgBlog","err","Failed: "+err.message);});
}

function loadGuestbook(){
  api("GET","data/comments.json").then(function(j){
    gbData=JSON.parse(db(j.content));if(!Array.isArray(gbData))gbData=[];renderGb();
  }).catch(function(){gbData=[];renderGb();});
}
function renderGb(){
  var hh="";
  gbData.forEach(function(c,i){
    hh+='<div style="background:#fafaf8;border:1px solid #eee;border-radius:8px;padding:0.8rem;margin-bottom:0.5rem">';
    hh+='<div style="display:flex;justify-content:space-between"><strong>'+hb(c.name||"Anonymous")+'</strong>';
    hh+='<button class="btndel" onclick="delGb('+i+')">Delete</button></div>';
    hh+='<div style="font-size:0.72rem;color:#bbb">'+(c.date||"")+'</div>';
    hh+='<p style="margin:0.3rem 0 0">'+hb(c.text||"")+'</p></div>';
  });
  document.getElementById("gbList").innerHTML=hh||'<span style="color:#ccc">No comments</span>';
}
function delGb(i){gbData.splice(i,1);renderGb();}
function saveGuestbook(){
  api("GET","data/comments.json").then(function(j){return api("PUT","data/comments.json",JSON.stringify(gbData,null,2),j.sha);})
  .catch(function(){return api("PUT","data/comments.json",JSON.stringify(gbData,null,2),null);})
  .then(function(){msg("msgGuestbook","ok","Saved");loadGuestbook();})
  .catch(function(err){msg("msgGuestbook","err","Failed: "+err.message);});
}

function uploadImg(){
  var file=document.getElementById("imgFile").files[0];if(!file){alert("Select an image");return;}
  var reader=new FileReader();
  reader.onload=function(e){
    var b64=e.target.result.split(",")[1];
    document.getElementById("msgImg").textContent="Uploading...";document.getElementById("msgImg").className="msg msgok";
    api("GET","images/"+file.name).then(function(j){return api("PUT","images/"+file.name,b64,j.sha);})
    .catch(function(){return api("PUT","images/"+file.name,b64,null);})
    .then(function(){document.getElementById("msgImg").textContent="Uploaded: images/"+file.name;loadImgs();})
    .catch(function(err){document.getElementById("msgImg").textContent="Failed: "+err.message;document.getElementById("msgImg").className="msg msgerr";});
  };
  reader.readAsDataURL(file);
}
function loadImgs(){
  fetch("https://api.github.com/repos/"+R+"/contents/images",{headers:{"Authorization":"Bearer "+T}})
  .then(function(r){if(!r.ok)throw new Error("");return r.json();})
  .then(function(files){
    var hh="";files.forEach(function(f){if(f.type==="file"&&/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name))hh+='<img src="'+f.download_url+'" style="max-width:80px;max-height:80px;border-radius:6px;margin:0.3rem" title="'+f.name+'"><code style="font-size:0.72rem">images/'+f.name+'</code><br>';});
    document.getElementById("imgList").innerHTML=hh||'<span style="color:#ccc">None</span>';
  }).catch(function(){document.getElementById("imgList").innerHTML='<span style="color:#ccc">None</span>';});
}

(function(){
  var ta=null,tb=document.getElementById("rtb");if(!tb)return;
  document.addEventListener("focusin",function(e){
    if(e.target.tagName==="TEXTAREA"&&e.target.hasAttribute("data-rich")){
      ta=e.target;var r=e.target.getBoundingClientRect();
      tb.style.left=Math.max(5,r.left)+"px";tb.style.top=Math.max(5,r.top+window.scrollY-44)+"px";tb.classList.add("on");
    }
  });
  document.addEventListener("click",function(e){
    if(!e.target.closest("[data-rich]")&&!e.target.closest("#rtb")){tb.classList.remove("on");ta=null;}
  });
  tb.addEventListener("click",function(e){
    var btn=e.target.closest("button");if(!btn||!ta)return;e.preventDefault();
    var tag=btn.getAttribute("data-tag");if(!tag)return;
    var s=ta.selectionStart,n=ta.selectionEnd,v=ta.value,sel=v.substring(s,n),w=["",""];
    switch(tag){
      case"b":w=["<strong>","</strong>"];break;
      case"i":w=["<em>","</em>"];break;
      case"br":w=["","<br>"];sel="";break;
      case"p":w=["<p>","</p>"];break;
      case"h3":w=["<h3>","</h3>"];break;
      case"blockquote":w=["<blockquote><p>","</p></blockquote>"];break;
      case"mark":w=["<mark>","</mark>"];break;
      case"a":var url=prompt("Link URL:","https://");if(!url)return;w=['<a href="'+url+'">',"</a>"];break;
    }
    var rep=w[0]+sel+w[1];ta.value=v.substring(0,s)+rep+v.substring(n);
    var np=s+w[0].length+sel.length+(tag==="br"?4:0);
    ta.focus();ta.setSelectionRange(np,np);ta.dispatchEvent(new Event("input",{bubbles:true}));
  });
})();

(function(){var s=sessionStorage.getItem("mgmt");if(s){try{var c=JSON.parse(s);R=c.r;T=c.t;login();}catch(e){}}})();
