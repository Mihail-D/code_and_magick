'use strict';

var openSetupMenuButton = document.querySelector('.setup-open');
var closeSetupMenuButton = document.querySelector('.setup-close');
var discloseSetup = document.querySelector('.setup');
var discloseSetupSimilar = document.querySelector('.setup-similar');
var submitButton = document.querySelector('.setup-submit');
var userNameField = document.querySelector('.setup-user-name');
var menuToggleView = function () {
  discloseSetup.classList.toggle('hidden');
  discloseSetupSimilar.classList.toggle('hidden');
};

// userNameField.addEventListener('focus', function () {

// });

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (userNameField.hasFocus()) {
      return;
    } else {
      discloseSetup.classList.add('hidden');
      discloseSetupSimilar.classList.add('hidden');
    }
  }
});

var form = document.querySelector('.setup-wizard-form');
submitButton.addEventListener('click', function () {
  form.submit();
});

userNameField.addEventListener('invalid', function () {
  if (userNameField.validity.tooShort) {
    userNameField.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameField.validity.tooLong) {
    userNameField.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameField.validity.valueMissing) {
    userNameField.setCustomValidity('Обязательное поле');
  } else {
    userNameField.setCustomValidity('');
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
var fireballOfCharacter = document.querySelector('input[name="fireball-color"]'); // .setup-fireball-wrap

coatOfCharacter.addEventListener('click', function () {
  coatOfCharacter.style.fill = COATS_COLOR[getRandomNumber(0, COATS_COLOR.length - 1)];
  setupMainCharacter.appendChild(coatOfCharacter);
});

eyesOfCharacter.addEventListener('click', function () {
  eyesOfCharacter.style.fill = EYES_COLOR[getRandomNumber(0, EYES_COLOR.length - 1)];
  setupMainCharacter.appendChild(eyesOfCharacter);
});

fireballOfCharacter.addEventListener('click', function () {
  fireballOfCharacter.value = FIREBALLS_COLOR[getRandomNumber(0, FIREBALLS_COLOR.length - 1)];
  // setupMainCharacter.appendChild(fireballOfCharacter);
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
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var wizardFragment = document.createDocumentFragment();

for (var j = 0; j < 4; j++) {
  wizardFragment.appendChild(createWizard(similarCharacters[j]));
}

similarListElement.appendChild(wizardFragment);
