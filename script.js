var ghost = document.getElementById('ghost');
var ghostX = 0;
var ghostY = 0;

const handleMouseMove = event => {
  ghost.classList.add('active');

  var eventDoc, doc, body;

  event = event || window.event;
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX =
      event.clientX +
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
    event.pageY =
      event.clientY +
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0);
  }

  followCursor(event.pageX, event.pageY);
};

const followCursor = (pageX, pageY) => {
  const diffX = pageX - ghostX;
  const diffY = pageY - ghostY;
  const skewX = diffX / 16;
  const scale = diffY / 16;

  ghostX += diffX / 8;
  ghostY += diffY / 8;

  const skewDegrees = countShift(skewX, 0, 50, 0, -25);
  const scaleYValue = countShift(scale, 0, 50, 1, 2.0);

  ghost.style.transform = `translate(${ghostX}px, ${ghostY}px) skew(${skewDegrees}deg) rotate(${-skewDegrees}deg) scaleY(${scaleYValue})`;
};

const countShift = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

document.addEventListener('mousemove', event => handleMouseMove(event));

document.addEventListener('mouseleave', event => {
  ghost.classList.remove('active');
  ghost.style.animation = 'none';
});
