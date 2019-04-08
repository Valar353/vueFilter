let parent = document.getElementsByClassName('container')[0];
let child = document.getElementsByTagName('input')[0];
child.onblur = function() {
  parent.style.border = '1px solid #CCCCCC';
  parent.style.padding = '7px';
};
child.onfocus = function() {
  parent.style.border = '2px solid #60BFC3';
  parent.style.padding = '6px';
};
