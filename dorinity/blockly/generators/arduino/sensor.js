/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for procedure (function) blocks.
 *
 * TODO: For now all variables will stay at "int". Once type is implemented
 *       it needs to be captured on the functions with return.
 */
'use strict';

goog.provide('Blockly.Arduino.blocks.sensor');

goog.require('Blockly.Arduino');


/**
 * Code generator to create a function with a return value (X).
 * Arduino code: void functionname { return X }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {null} There is no code added to loop.
 */
Blockly.Arduino.dht11_humidity = function(a) {
  var a = this.getFieldValue("PIN");
  Blockly.Arduino.definitions_.define_softwareserial = "#include <DHT.h>\n";
  Blockly.Arduino.definitions_["var_dht_" + a] = "DHT dht_"+a+"(" + a + ", DHT11);\n";
  return ["dht_"+a+".readHumidity()", Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino.dht11_temperature = function(a) {
  var a = this.getFieldValue("PIN");
  Blockly.Arduino.definitions_.define_softwareserial = "#include <DHT.h>\n";
  Blockly.Arduino.definitions_["var_dht_" + a] = "DHT dht_"+a+"(" + a + ", DHT11);\n";
  return ["dht_"+a+".readTemperature()", Blockly.Arduino.ORDER_ATOMIC]
};
