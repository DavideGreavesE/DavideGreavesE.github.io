$(document).keypress(function(e){
  var key = e.which;
  if (key == 46) {
  
      $('#menu').fadeToggle();
      
  }
});




const $elem = document.querySelector('#menu');
const mutable = function (e) {
  
  const h = this.offsetHeight;
  const w = this.offsetWidth;
  
  const t = this.offsetTop;
  const l = this.offsetLeft;

  const y = t + h - e.pageY;
  const x = l + w - e.pageX;

  const hasMoved = () =>
  !(t === this.offsetTop && l === this.offsetLeft);

  const hasResized = () =>
  !(w === this.offsetWidth && h === this.offsetHeight);

  const follow = e => {
    
    this.style.top = `${e.pageY + y - h}px`;
    this.style.left = `${e.pageX + x - w}px`;
  };

  const resize = e => {
    
    this.style.width = `${e.pageX - l + x}px`;
    this.style.height = `${e.pageY - t + y}px`;
  };


  const unresize = e => {
  
    document.removeEventListener('mousemove', resize);
    document.removeEventListener("mouseup", unresize);
    // Emit events according to interaction
    if (hasResized(e)) this.dispatchEvent(new Event(''));
    e.preventDefault();
  };

  const unfollow = e => {
  
    document.removeEventListener('mousemove', follow);
    document.removeEventListener("mouseup", unfollow);
    // Emit events according to interaction
    if (hasMoved(e)) this.dispatchEvent(new Event(''));
    e.preventDefault();
  };


  if (x > 12 && y > 12) {
    document.addEventListener("mousemove", follow);
    document.addEventListener("mouseup", unfollow);
    e.preventDefault();
  } else {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", unresize);
    e.preventDefault();
  }

};


$elem.addEventListener("mousedown", mutable);

$elem.addEventListener('clicked');
$elem.addEventListener('moved');
$elem.addEventListener('resized');