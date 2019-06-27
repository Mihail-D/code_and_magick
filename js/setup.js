'use strict';

var discloseSetup = document.querySelector('.setup');
discloseSetup.classList.toggle('hidden');

var discloseSetupSimilar = document.querySelector('.setup-similar');
discloseSetupSimilar.classList.toggle('hidden');

var SIMILAR_CHARACTERS = [];
var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
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
  return NAMES[getRandomNumber(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomNumber(0, SURNAMES.length - 1)];
};

// конструктор объекта
var getNewObject = function () {
  var characterObject = {};
  characterObject.name = getFullNameConstructor();
  characterObject.coatColor = COATS_COLOR[getRandomNumber(0, COATS_COLOR.length - 1)];
  characterObject.eyeColor = EYES_COLOR[getRandomNumber(0, EYES_COLOR.length - 1)];
  return characterObject;
};

// добавление четырех объектов
for (var i = 4; i > 0; i--) {
  SIMILAR_CHARACTERS.push(getNewObject());
}

// заполняем шаблон
var characterTemplate = document.querySelector('#similar-wizard-characterTemplate');

for (var i = 0; i < SIMILAR_CHARACTERS.length; i++) {
  var wizard = SIMILAR_CHARACTERS[i];
  var clone = characterTemplate.content.cloneNode(true);

  var name = clone.querySelector('setup-similar-label');

  var coatColor = clone.querySelector('wizard-coat');

  

  characterTemplate.parentNode.appendChild(clone);
}
