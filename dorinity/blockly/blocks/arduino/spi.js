  /**
   * @license Licensed under the Apache License, Version 2.0 (the "License"):
   *          http://www.apache.org/licenses/LICENSE-2.0
   */

  /**
   * @fileoverview Blocks for Arduino SPI library.
   *     The Arduino SPI functions syntax can be found in:
   *     http://arduino.cc/en/Reference/SPI
   */
  'use strict';

  goog.provide('Blockly.Blocks.spi');

  goog.require('Blockly.Blocks');
  goog.require('Blockly.Types');


  /** Common HSV hue for all blocks in this category. */
  Blockly.Blocks.spi.HUE = 170;

  Blockly.Blocks['spi_setup'] = {
    /**
     * Block for the spi configuration. Info in the setHelpUrl link.
     * @this Blockly.Block
     */
    init: function() {
      this.setHelpUrl('http://arduino.cc/en/Reference/SPI');
      this.setColour(Blockly.Blocks.spi.HUE);
      this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_SETUP)
        .appendField(new Blockly.FieldDropdown(
          Blockly.Arduino.Boards.selected.spi), 'SPI_ID')
        .appendField(Blockly.Msg.ARD_SPI_SETUP_CONF);
      this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_SETUP_SHIFT)
        .appendField(
          new Blockly.FieldDropdown(
            [
              [Blockly.Msg.ARD_SPI_SETUP_MSBFIRST, 'MSBFIRST'],
              [Blockly.Msg.ARD_SPI_SETUP_LSBFIRST, 'LSBFIRST']
            ]),
          'SPI_SHIFT_ORDER');
      this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_SETUP_DIVIDE)
        .appendField(
          new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.spiClockDivide),
          'SPI_CLOCK_DIVIDE');
      this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_SETUP_MODE)
        .appendField(
          new Blockly.FieldDropdown(
            [
              [Blockly.Msg.ARD_SPI_SETUP_MODE0, 'SPI_MODE0'],
              [Blockly.Msg.ARD_SPI_SETUP_MODE1, 'SPI_MODE1'],
              [Blockly.Msg.ARD_SPI_SETUP_MODE2, 'SPI_MODE2'],
              [Blockly.Msg.ARD_SPI_SETUP_MODE3, 'SPI_MODE3']
            ]),
          'SPI_MODE');
      this.setTooltip(Blockly.Msg.ARD_SPI_SETUP_TIP);
    },
    /**
     * Returns the selected SPI instance.
     * @return {!string} SPI instance name.
     * @this Blockly.Block
     */
    getSpiSetupInstance: function() {
      return this.getFieldValue('SPI_ID');
    },
    /**
     * Updates the content of the the board SPI related fields.
     * @this Blockly.Block
     */
    updateFields: function() {
      Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPI_ID', 'spi');
      Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPI_CLOCK_DIVIDE', 'spiClockDivide');
    }
  };

  Blockly.Blocks['spi_transfer'] = {
    /**
     * Block for for the spi transfer. Info in the setHelpUrl link.
     * @this Blockly.Block
     */
    init: function() {
      // Drop down list to contain all digital pins plus an option for 'none'
      var slaveNone = [
        [Blockly.Msg.ARD_SPI_TRANS_NONE, 'none']
      ];
      var digitalPinsExtended = slaveNone.concat(
        Blockly.Arduino.Boards.selected.digitalPins);

      this.setHelpUrl('http://arduino.cc/en/Reference/SPITransfer');
      this.setColour(Blockly.Blocks.spi.HUE);
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
          Blockly.Arduino.Boards.selected.spi), 'SPI_ID');
      this.appendValueInput('SPI_DATA')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SPI_TRANS_VAL);
      this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_TRANS_SLAVE)
        .appendField(
          new Blockly.FieldDropdown(digitalPinsExtended), 'SPI_SS');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg.ARD_SPI_TRANS_TIP);
    },
    /**
     * Called whenever anything on the workspace changes.
     * It checks the instances of stepper_config and attaches a warning to this
     * block if not valid data is found.
     * @this Blockly.Block
     */
    onchange: function(event) {
      if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return; // Block deleted or irrelevant event
      }

      // Get the Serial instance from this block
      var thisInstanceName = this.getFieldValue('SPI_ID');

      // Iterate through top level blocks to find a setup instance for the SPI id
      var blocks = Blockly.mainWorkspace.getTopBlocks();
      var setupInstancePresent = false;
      for (var x = 0, length_ = blocks.length; x < length_; x++) {
        var func = blocks[x].getSpiSetupInstance;
        if (func) {
          var setupBlockInstanceName = func.call(blocks[x]);
          if (thisInstanceName == setupBlockInstanceName) {
            setupInstancePresent = true;
          }
        }
      }

      if (!setupInstancePresent) {
        this.setWarningText(
          Blockly.Msg.ARD_SPI_TRANS_WARN1.replace('%1', thisInstanceName),
          'spi_setup');
      } else {
        this.setWarningText(null, 'spi_setup');
      }
    },
    /**
     * Retrieves the type of the selected variable, Arduino code returns a byte,
     * for now set it to integer.
     * @return {!string} Blockly type.
     */
    getBlockType: function() {
      return Blockly.Types.NUMBER;
    },
    /**
     * Updates the content of the board SPI related fields.
     * @this Blockly.Block
     */
    updateFields: function() {
      // Special case, otherwise Blockly.Arduino.Boards.refreshBlockFieldDropdown
      var field = this.getField('SPI_SS');
      var fieldValue = field.getValue();
      var slaveNone = [
        [Blockly.Msg.ARD_SPI_TRANS_NONE, 'none']
      ];
      field.menuGenerator_ =
        slaveNone.concat(Blockly.Arduino.Boards.selected['digitalPins']);

      var currentValuePresent = false;
      for (var i = 0, length_ = field.menuGenerator_.length; i < length_; i++) {
        if (fieldValue == field.menuGenerator_[i][1]) {
          currentValuePresent = true;
        }
      }
      // If the old value is not present any more, add a warning to the block.
      if (!currentValuePresent) {
        this.setWarningText(
          Blockly.Msg.ARD_SPI_TRANS_WARN2.replace('%1', fieldValue), 'bPin');
      } else {
        this.setWarningText(null, 'bPin');
      }
    }
  };

  Blockly.Blocks['spi_transfer_return'] = {
    /**
     * Block for for the spi transfer with a return value.
     * @this Blockly.Block
     */
    init: function() {
      // Drop down list to contain all digital pins plus an option for 'none'
      var slaveNone = [
        [Blockly.Msg.ARD_SPI_TRANS_NONE, 'none']
      ];
      var digitalPinsExtended = slaveNone.concat(
        Blockly.Arduino.Boards.selected.digitalPins);

      this.setHelpUrl('http://arduino.cc/en/Reference/SPITransfer');
      this.setColour(Blockly.Blocks.spi.HUE);
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
          Blockly.Arduino.Boards.selected.spi), 'SPI_ID');
      this.appendValueInput('SPI_DATA')
        .appendField(Blockly.Msg.ARD_SPI_TRANS_VAL);
      this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SPI_TRANS_SLAVE)
        .appendField(
          new Blockly.FieldDropdown(digitalPinsExtended), 'SPI_SS');
      this.setInputsInline(true);
      this.setOutput(true);
      this.setTooltip(Blockly.Msg.ARD_SPI_TRANSRETURN_TIP);
    },
    /** Same as spi_transfer block */
    onchange: Blockly.Blocks['spi_transfer'].onchange,
    /** Same as spi_transfer block */
    getBlockType: Blockly.Blocks['spi_transfer'].getBlockType,
    /** Same as spi_transfer block */
    updateFields: Blockly.Blocks['spi_transfer'].updateFields
  };


  Blockly.Blocks.arduino_softserial = {};
  Blockly.Blocks.arduino_softserial.HUE = 180;

  Blockly.Blocks.soft_init = {
    init: function() {
      this.appendDummyInput().appendField("\ube14\ub8e8\ud22c\uc2a4").appendField(new Blockly.FieldLabel(Blockly.Msg.SSERIAL_DEFAULT_NAME), "SOFTSERIAL_NAME").appendField(new Blockly.FieldImage("../blockly/media/hc06.jpg", 50, 50));
      this.appendValueInput("PIN1").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.SSERIAL_RX);
      this.appendValueInput("PIN2").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.SSERIAL_TX);
      this.appendDummyInput().appendField(Blockly.Msg.SSERIAL_SPEED).appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.serialSpeed),
        "SPEED");
      this.setInputsInline(!1);
      this.setPreviousStatement(!0, null);
      this.setNextStatement(!0, null);
      this.setColour(Blockly.Blocks.arduino_softserial.HUE);
      this.setTooltip(" SoftwareSerial(rxPin, txPin) ");
      this.setHelpUrl("https://www.arduino.cc/en/Reference/SoftwareSerial'")
    }
  };
  Blockly.Blocks.soft_read = {
    init: function() {
      this.setColour(Blockly.Blocks.arduino_softserial.HUE);
      this.setHelpUrl("https://www.arduino.cc/en/Reference/SoftwareSerial");
      this.appendDummyInput().appendField(new Blockly.FieldLabel(Blockly.Msg.SSERIAL_DEFAULT_NAME), "SOFTSERIAL_NAME").appendField("\ube14\ub8e8\ud22c\uc2a4 \uc785\ub825\ub370\uc774\ud0c0 \uc77d\uae30");
      this.setInputsInline(!1);
      this.setOutput(!0, "String");
      this.setTooltip("")
    },
    onchange: function() {
      if (this.workspace) {
        var a = this.getFieldValue("SOFTSERIAL_NAME");

        Blockly.Instances.isInstancePresent(a, "SoftSerial", this) ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.COMPONENT_WARN.replace("%1", Blockly.Msg.SOFTSERIAL_COMPONENT).replace("%2", a))
      }
    }
  };

  Blockly.Blocks.soft_print = {
    init: function() {
      this.setHelpUrl("https://www.arduino.cc/en/Reference/SoftwareSerial");
      this.setColour(Blockly.Blocks.arduino_softserial.HUE);
      this.appendValueInput("CONTENT").appendField(new Blockly.FieldLabel(Blockly.Msg.SSERIAL_DEFAULT_NAME), "SOFTSERIAL_NAME").setCheck("String").appendField("\ube14\ub8e8\ud22c\uc2a4\ub85c \ubb38\uc790\uc5f4 \ucd9c\ub825");
      this.setInputsInline(!1);
      this.setPreviousStatement(!0, null);
      this.setNextStatement(!0, null);
      this.setTooltip("")
    },
    onchange: function() {
      if (this.workspace) {
        var a =
          this.getFieldValue("SOFTSERIAL_NAME");
        Blockly.Instances.isInstancePresent(a, "SoftSerial", this) ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.COMPONENT_WARN.replace("%1", Blockly.Msg.SOFTSERIAL_COMPONENT).replace("%2", a))
      }
    }
  };

  Blockly.Blocks.soft_write = {
    init: function() {
      this.setHelpUrl("https://www.arduino.cc/en/Reference/SoftwareSerial");
      this.setColour(Blockly.Blocks.arduino_softserial.HUE);
      this.appendValueInput("CONTENT").appendField(new Blockly.FieldLabel(Blockly.Msg.SSERIAL_DEFAULT_NAME), "SOFTSERIAL_NAME").setCheck("String").appendField("\ube14\ub8e8\ud22c\uc2a4\ub85c \ucd9c\ub825");
      this.setInputsInline(!1);
      this.setPreviousStatement(!0, null);
      this.setNextStatement(!0, null);
      this.setTooltip("")
    },
    onchange: function() {
      if (this.workspace) {
        var a =
          this.getFieldValue("SOFTSERIAL_NAME");
        Blockly.Instances.isInstancePresent(a, "SoftSerial", this) ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.COMPONENT_WARN.replace("%1", Blockly.Msg.SOFTSERIAL_COMPONENT).replace("%2", a))
      }
    }
  };

  Blockly.Blocks.soft_available = {
    init: function() {
      this.setHelpUrl("https://www.arduino.cc/en/Reference/SoftwareSerial");
      this.setColour(Blockly.Blocks.arduino_softserial.HUE);
      this.appendDummyInput("").appendField(new Blockly.FieldLabel(Blockly.Msg.SSERIAL_DEFAULT_NAME), "SOFTSERIAL_NAME").appendField("\ube14\ub8e8\ud22c\uc2a4 \ud65c\uc131\uc0c1\ud0dc");
      this.setInputsInline(!1);
      this.setOutput(!0, "Boolean");
      this.setTooltip("")
    },
    onchange: function() {
      if (this.workspace) {
        var a = this.getFieldValue("SOFTSERIAL_NAME");

        Blockly.Instances.isInstancePresent(a, "SoftSerial", this) ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.COMPONENT_WARN.replace("%1", Blockly.Msg.SOFTSERIAL_COMPONENT).replace("%2", a))
      }
    }
  };

  Blockly.Blocks.soft_flush = {
    init: function() {
      this.setColour(Blockly.Blocks.arduino_softserial.HUE);
      this.setHelpUrl("http://arduino.cc/en/Serial/Flush");
      this.appendDummyInput().appendField(new Blockly.FieldLabel(Blockly.Msg.SSERIAL_DEFAULT_NAME), "SOFTSERIAL_NAME").appendField("\ube44\uc6b0\uae30");
      this.setInputsInline(!1);
      this.setPreviousStatement(!0, null);
      this.setNextStatement(!0, null);
      this.setTooltip("Waits for the transmission of outgoing serial data to complete.")
    },
    onchange: function() {
      if (this.workspace) {
        var a =
          this.getFieldValue("SOFTSERIAL_NAME");
        Blockly.Instances.isInstancePresent(a, "SoftSerial", this) ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.COMPONENT_WARN.replace("%1", Blockly.Msg.SOFTSERIAL_COMPONENT).replace("%2", a))
      }
    }
  };
