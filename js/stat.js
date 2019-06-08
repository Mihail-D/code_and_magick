'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_SIZE = 16;
var TEXT_BEGIN = 45;
var BAR_WIDTH = 40;
var HISTOGRAM_HEIGHT = 150;
var HISTOGRAM_GAP = 50;

function createRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function createText(ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function findMax(array) {
  var len = array.length;
  var max = array[0];
  var maxValue = 0;
  for (var i = 1; i < len; i++) {
    if (array[i] > max) {
      max = array[i];
      maxValue = i;
    }
  }

  return maxValue;
}

function myOwnColor(ctx, name) {
  if (name === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }

  return 'hsl(240,' + Math.floor(100 * Math.random()) + '%,50%)';
}

window.renderStatistics = function (ctx, names, times) {
  var maxTimeValue = findMax(times);
  var histogramIndent = (CLOUD_WIDTH - names.length * BAR_WIDTH - (names.length - 1) * HISTOGRAM_GAP) / 2;
  var barHeight;
  var barX = CLOUD_X + histogramIndent;
  var barBottom = CLOUD_HEIGHT + CLOUD_Y - GAP - FONT_SIZE;

  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.textBaseLine = 'hanging';
  createRect(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  createRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');
  createText(ctx, 'Ура вы победили!', CLOUD_X + GAP, TEXT_BEGIN, '#000');
  createText(ctx, 'Список результатов:', CLOUD_X + GAP, TEXT_BEGIN + FONT_SIZE + GAP, '#000');

  for (var i = 0; i < times.length; i++) {
    barHeight = Math.floor((times[i] * HISTOGRAM_HEIGHT) / times[maxTimeValue]);
    createRect(ctx, barX, barBottom - barHeight, BAR_WIDTH, barHeight, myOwnColor(ctx, names[i]));
    createText(ctx, names[i], barX, barBottom + FONT_SIZE, '#000');
    createText(ctx, Math.floor(times[i]), barX, barBottom - barHeight - GAP, '#000');
    barX += BAR_WIDTH + HISTOGRAM_GAP;
  }
};
