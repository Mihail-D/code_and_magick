'use strict';

(function () {
  var openSetupMenuButton = document.querySelector('.setup-open');
  var closeSetupMenuButton = document.querySelector('.setup-close');
  var discloseSetup = document.querySelector('.setup');
  var discloseSetupSimilar = document.querySelector('.setup-similar');
  var userNameField = document.querySelector('.setup-user-name');
  var formMain = document.querySelector('.setup');

  var setupWindowCoords = {
    x: formMain.style.left,
    y: formMain.style.top,
  };

  var menuToggleView = function () {
    formMain.style.top = setupWindowCoords.y;
    formMain.style.left = setupWindowCoords.x;
    discloseSetup.classList.toggle('hidden');
    discloseSetupSimilar.classList.toggle('hidden');
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 && userNameField !== document.activeElement) {
      formMain.style.top = setupWindowCoords.y;
      formMain.style.left = setupWindowCoords.x;
      discloseSetup.classList.add('hidden');
      discloseSetupSimilar.classList.add('hidden');
    }
  });

  openSetupMenuButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      menuToggleView();
    }
  });

  openSetupMenuButton.addEventListener('click', function () {
    menuToggleView();
  });

  closeSetupMenuButton.addEventListener('click', function () {
    menuToggleView();
  });

  var dialogHandler = formMain.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      formMain.style.top = formMain.offsetTop - shift.y + 'px';
      formMain.style.left = formMain.offsetLeft - shift.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
