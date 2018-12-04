function select(val) {
  return document.querySelector(val);
}

new Joystick({
  zone: select('#left')
})
.init()
.onStart = function(distance, angle) {
  // console.log('Left:无人机向 => ' + angle + '移动' + distance + '个单位');
  switch(angle) {
    case 'up':
     // Game.jump(distance);
      console.log("up"+distance);
      break;
    case 'right':
     // Game.forward(distance);
      console.log("right"+distance);
      break;
    case 'left':
     // Game.backward(distance);
      console.log("left"+distance);
  }
}

