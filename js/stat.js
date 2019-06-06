"use strict";

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 20;
var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.3)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");

  var maxTime = getMaxElement(times);
  ctx.font = "16px PT Mono";

  for (var i = 0; i < players.length; i++) {
    players[i] === "Вы" ? (ctx.fillStyle = "rgba(255, 0, 0, 1)") : (ctx.fillStyle = "rgba(83, 51, 237, 1)");

    ctx.fillText(players[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);

    ctx.fillRect(
      CLOUD_X + GAP + TEXT_WIDTH,
      CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i,
      (barWidth * times[i]) / maxTime,
      BAR_HEIGHT
    );
  }
};
