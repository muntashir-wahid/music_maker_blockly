/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
(function () {
  let currentButton;

  function handlePlay(event) {
    loadWorkspace(event.target);
    let code = Blockly.JavaScript.workspaceToCode(
      Blockly.common.getMainWorkspace()
    );
    code += "MusicMaker.play();";

    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  function save(button) {
    button.blocklySave = Blockly.serialization.workspaces.save(
      Blockly.common.getMainWorkspace()
    );
  }

  function handleSave() {
    document.body.setAttribute("mode", "edit");
    save(currentButton);
  }

  function enableEditMode() {
    document.body.setAttribute("mode", "edit");
    document.querySelectorAll(".button").forEach((btn) => {
      btn.removeEventListener("click", handlePlay);
      btn.addEventListener("click", enableBlocklyMode);
    });
  }

  function enableMakerMode() {
    document.body.setAttribute("mode", "maker");
    document.querySelectorAll(".button").forEach((btn) => {
      btn.addEventListener("click", handlePlay);
      btn.removeEventListener("click", enableBlocklyMode);
    });
  }

  function loadWorkspace(button) {
    const workspace = Blockly.common.getMainWorkspace();
    if (button.blocklySave) {
      Blockly.serialization.workspaces.load(button.blocklySave, workspace);
    }
  }

  function enableBlocklyMode(e) {
    document.body.setAttribute("mode", "blockly");
    currentButton = e.target;
    loadWorkspace(currentButton);
  }

  document.querySelector("#edit").addEventListener("click", enableEditMode);
  document.querySelector("#done").addEventListener("click", enableMakerMode);
  document.querySelector("#save").addEventListener("click", handleSave);

  enableMakerMode();

  const toolbox = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Loop",
        colour: 240,
        contents: [
          {
            kind: "block",
            type: "controls_repeat_ext",
            inputs: {
              TIMES: {
                shadow: {
                  type: "math_number",
                  fields: {
                    NUM: 5,
                  },
                },
              },
            },
          },
        ],
        inputs: {
          TIMES: {
            shadow: {
              type: "math_number",
              fields: {
                NUM: 5,
              },
            },
          },
        },
      },
      {
        kind: "category",
        name: "Conditional",
        colour: 60,
        contents: [
          {
            kind: "block",
            type: "controls_if",
          },
        ],
      },
      {
        kind: "category",
        name: "Compare",
        colour: 280,
        contents: [
          {
            kind: "block",
            type: "logic_compare",
          },
          {
            kind: "block",
            type: "logic_operation",
          },
        ],
      },
      {
        kind: "category",
        name: "Operators",
        colour: 120,
        contents: [
          {
            kind: "block",
            type: "math_arithmetic",
          },
        ],
      },
      {
        kind: "category",
        name: "Variables",
        colour: 160,
        contents: [
          {
            kind: "block",
            type: "math_number",
          },

          {
            kind: "block",
            type: "logic_boolean",
          },
        ],
      },
      {
        kind: "category",
        name: "Play music",
        colour: 360,
        contents: [
          {
            kind: "block",
            type: "play_sound",
          },
        ],
      },
    ],
  };

  Blockly.inject("blocklyDiv", {
    toolbox: toolbox,
    scrollbars: false,
  });
})();
