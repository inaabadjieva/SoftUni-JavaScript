function getModel() { 
  let model = {
    init: function(num1Sel, num2Sel, resultSel) {
      model.num1 = $(num1Sel);
      model.num2 = $(num2Sel);
      model.result = $(resultSel);
    },
    add: () => model.action((a, b) => a + b),
    subtract: () => model.action((a, b) => a - b),    
$(function() {
  let model = getModel();
  model.init('#num1', '#num2', '#result');
  $('#sumButton').click(model.add);
  $('#subtractButton').click(model.subtract);
});