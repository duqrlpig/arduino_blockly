'use strict';

goog.require('Blockly.Blocks');



Blockly.Blocks.dht11_temperature = {
  helpUrl: "http://www.seeedstudio.com/wiki/Grove_-_PIR_Motion_Sensor",
  init: function() {
    this.setColour(190);
    this.appendDummyInput().appendField("DHT11 온도값 확인").appendField(new Blockly.FieldImage("https://images-na.ssl-images-amazon.com/images/I/61UUX6TA57L._SX425_.jpg", 64, 64)).appendField("PIN#").appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
    this.setOutput(!0, "Number");
    this.setTooltip("When anyone moves in it's detecting range, the sensor outputs HIGH.")
  }
};

Blockly.Blocks.dht11_humidity = {
  helpUrl: "http://www.seeedstudio.com/wiki/Grove_-_PIR_Motion_Sensor",
  init: function() {
    this.setColour(190);
    this.appendDummyInput().appendField("DHT11 습도값 확인").appendField(new Blockly.FieldImage("https://images-na.ssl-images-amazon.com/images/I/61UUX6TA57L._SX425_.jpg", 64, 64)).appendField("PIN#").appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
    this.setOutput(!0, "Number");
    this.setTooltip("When anyone moves in it's detecting range, the sensor outputs HIGH.")
  }
};
