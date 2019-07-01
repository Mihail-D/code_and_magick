'use strict';

var discloseSetup = document.querySelector('.setup');
discloseSetup.classList.toggle('hidden');

var discloseSetupSimilar = document.querySelector('.setup-similar');
discloseSetupSimilar.classList.toggle('hidden');

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


