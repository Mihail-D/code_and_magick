'use strict';

var openSetupMenuButton = document.querySelector('.setup-open');
var closeSetupMenuButton = document.querySelector('.setup-close');
var discloseSetup = document.querySelector('.setup');
var discloseSetupSimilar = document.querySelector('.setup-similar');
var userNameField = document.querySelector('.setup-user-name');
var formMain = document.querySelector('.setup');

var similarCharacters = [];
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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

// генератор случайного числа
var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// конструктор полного имени
var getFullNameConstructor = function () {
  return (
    WIZARD_NAMES[getRandomNumber(0, WIZARD_NAMES.length - 1)] +
    ' ' +
    WIZARD_SURNAMES[getRandomNumber(0, WIZARD_SURNAMES.length - 1)]
  );
};

// конструктор объекта + добавление четырех объектов в массив
for (var i = 4; i > 0; i--) {
  var characterObject = {};
  characterObject.name = getFullNameConstructor();
  characterObject.coatColor = COATS_COLOR[getRandomNumber(0, COATS_COLOR.length - 1)];
  characterObject.eyeColor = EYES_COLOR[getRandomNumber(0, EYES_COLOR.length - 1)];
  similarCharacters.push(characterObject);
}

// Конструктор цветов гавгероя
var setupMainCharacter = document.querySelector('.setup-wizard');
var coatOfCharacter = document.querySelector('.wizard-coat');
var eyesOfCharacter = document.querySelector('.wizard-eyes');
var fireballInput = document.querySelector('input[name="fireball-color"]');
var fireballWrapper = document.querySelector('.setup-fireball-wrap');

coatOfCharacter.addEventListener('click', function () {
  coatOfCharacter.style.fill = COATS_COLOR[getRandomNumber(0, COATS_COLOR.length - 1)];
  setupMainCharacter.appendChild(coatOfCharacter);
});

eyesOfCharacter.addEventListener('click', function () {
  eyesOfCharacter.style.fill = EYES_COLOR[getRandomNumber(0, EYES_COLOR.length - 1)];
  setupMainCharacter.appendChild(eyesOfCharacter);
});

fireballWrapper.addEventListener('click', function () {
  var fireballColor = FIREBALLS_COLOR[getRandomNumber(0, FIREBALLS_COLOR.length - 1)];
  fireballInput.value = fireballColor;
  fireballWrapper.style.backgroundColor = fireballColor;
  // setupMainCharacter.appendChild(fireballInput);
});

// заполняем шаблон
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  return wizardElement;
};

var wizardFragment = document.createDocumentFragment();

for (var j = 0; j < 4; j++) {
  wizardFragment.appendChild(createWizard(similarCharacters[j]));
}

similarListElement.appendChild(wizardFragment);

// реализация drag'n'drop

(function () {
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
