/**
 * eloader.js ~ cloned from SplashScreenLoader.js
 * authored by 9r3i
 * https://girhub.com/9r3i/eloader.js
 * started at december 16th 2023
 */
;function eloader(){
this.version='1.0.1';
this.loader=null;
this.text='Loading...';
this.textLoaded='Loaded.';
this.isLoaded=false;
this.testStarted=false;
this.fromProgressBarTest=function(cb,rm,tl,i){
  let progress=document.querySelector('progress');
  if(!progress){
    return;
  }
  if(!this.testStarted){
    this.fromProgressBar(cb,rm,tl);
    this.testStarted=true;
  }
  if(!i){
    setTimeout(()=>{
      this.fromProgressBarTest(cb,rm,tl,1);
    },2500);
    return;
  }
  progress.value=i;
  setTimeout(()=>{
    let ir=Math.floor(Math.random()*9);
    this.fromProgressBarTest(cb,rm,tl,i+ir);
  },0x5d);
  return this;
};
this.fromProgressBar=function(cb,rm,tl){
  let interval,
  max,
  value,
  span=document.querySelector('span'),
  progress=document.querySelector('progress');
  if(!progress||!progress.hasAttribute('max')){
    alert('Error: Cannot detect progress element.');
    return;
  }
  if(span){
    this.text=span.textContent;
  }
  this.open();
  interval=setInterval(()=>{
    if(progress&&progress.hasAttribute('value')){
      max=parseInt(progress.max);
      value=parseInt(progress.value);
      this.loading({
        loaded:value,
        total:max,
      });
      if(span){
        this.text=span.textContent;
      }
      if(this.isLoaded||value>=max){
        clearInterval(interval);
        if(typeof tl==='string'){
          this.textLoaded=tl;
        }
        return this.toLoaded(cb,rm);
      }
    }
  },10);
};
this.init=function(){
  this.loader=this.create();
  return this;
};
this.test=function(cb,rm){
  this.open();
  setTimeout(()=>{
    this.toLoading();
    setTimeout(()=>{
      this.toLoaded(cb,rm);
    },0x5dc);
  },0x5dc);
  return this;
};
this.loading=function(e){
  this.noListening();
  this.noLoading();
  this.noLoaded();
  let p=Math.floor(e.loaded/e.total*100);
  p=p.toString().match(/^\d+$/)?p:0;
  let q=p+'%';
  this.loader.text.dataset.text=''
    +(p===0x64?this.textLoaded:this.text);
  this.loader.progress.style.width=q;
  return true;
};
this.open=function(){
  this.isLoaded=false;
  this.toListening();
  document.body.appendChild(this.loader.main);
  return true;
};
this.close=function(){
  let main=document.getElementById('eloader');
  if(main){main.remove();}
  this.loader.progress.style.removeProperty('width');
  this.noListening();
  this.noLoading();
  this.noLoaded();
  return true;
};
this.noLoaded=function(){
  if(this.loader.main.classList.contains('eloader-loaded')){
    this.loader.main.classList.remove('eloader-loaded');
  }
  if(this.loader.main.classList.contains('eloader-text-loaded')){
    this.loader.main.classList.remove('eloader-text-loaded');
  }
  this.loader.text.dataset.text=this.text;
  return true;
};
this.toLoaded=function(cb,rm){
  this.noLoading();
  this.noListening();
  this.loader.main.classList.add('eloader-loaded');
  this.loader.text.classList.add('eloader-text-loaded');
  this.loader.text.dataset.text=this.textLoaded;
  if(typeof cb==='function'){cb(this);}
  this.isLoaded=true;
  return rm===false?true:this.close();
};
this.noListening=function(){
  if(this.loader.main.classList.contains('eloader-listening')){
    this.loader.main.classList.remove('eloader-listening');
  }return true;
};
this.toListening=function(){
  this.noLoading();
  this.noLoaded();
  this.loader.main.classList.add('eloader-listening');
  return true;
};
this.noLoading=function(){
  if(this.loader.main.classList.contains('eloader-loading')){
    this.loader.main.classList.remove('eloader-loading');
  }return true;
};
this.toLoading=function(){
  this.noListening();
  this.noLoaded();
  this.loader.main.classList.add('eloader-loading');
  return true;
};
this.create=function(){
  let main=document.createElement('div'),
  loader=document.createElement('div'),
  progress=document.createElement('div'),
  text=document.createElement('div');
  main.appendChild(text);
  main.appendChild(loader);
  loader.appendChild(progress);
  main.classList.add('eloader');
  text.classList.add('eloader-text');
  loader.classList.add('eloader-loader');
  progress.classList.add('eloader-progress');
  text.dataset.text=this.text;
  main.id='eloader';
  return {
    main:main,
    loader:loader,
    progress:progress,
    text:text,
  };
};
return this.init();
};

exports.eloader=eloader;
