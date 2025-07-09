
interface ExpressionResult {
  expression: string;
  value: number;
}

export const generateExpression = (target: number, shouldBeCorrect: boolean, level: number): ExpressionResult => {
  const operations = ['+', '-', '×', '÷'];
  let expression = '';
  let value = 0;

  // Determine complexity based on level
  const maxOperands = Math.min(2 + Math.floor(level / 3), 5); // Up to 5 operands
  const numOperands = Math.max(2, Math.floor(Math.random() * (maxOperands - 1)) + 2);
  const useNegatives = level > 3;
  const complexOps = level > 2;

  if (shouldBeCorrect) {
    // Generate correct expressions with increasing complexity
    if (numOperands === 2) {
      // Simple two-operand expressions
      const op = operations[Math.floor(Math.random() * (complexOps ? 4 : 2))];
      
      switch (op) {
        case '+':
          const add1 = Math.floor(Math.random() * target) + 1;
          const add2 = target - add1;
          expression = `${useNegatives && Math.random() > 0.7 ? '-' : ''}${add1} + ${add2}`;
          value = (useNegatives && expression.startsWith('-') ? -add1 : add1) + add2;
          break;
        case '-':
          const sub1 = target + Math.floor(Math.random() * 10) + 1;
          const sub2 = sub1 - target;
          expression = `${sub1} - ${sub2}`;
          value = sub1 - sub2;
          break;
        case '×':
          const factors = [];
          for (let i = 1; i <= Math.abs(target); i++) {
            if (target % i === 0) factors.push(i);
          }
          if (factors.length > 1) {
            const factor = factors[Math.floor(Math.random() * factors.length)];
            const multiplier = target / factor;
            expression = `${useNegatives && Math.random() > 0.8 ? '-' : ''}${factor} × ${multiplier}`;
            value = (useNegatives && expression.startsWith('-') ? -factor : factor) * multiplier;
          } else {
            expression = `${target} × 1`;
            value = target;
          }
          break;
        case '÷':
          const mult = Math.floor(Math.random() * 5) + 2;
          const dividend = target * mult;
          expression = `${dividend} ÷ ${mult}`;
          value = dividend / mult;
          break;
      }
    } else {
      // Complex multi-operand expressions: e.g., "-3 × 4 + 5 ÷ 2"
      const operands = [];
      const operators = [];
      
      // Generate operands and operators
      for (let i = 0; i < numOperands; i++) {
        let operand = Math.floor(Math.random() * 10) + 1;
        if (useNegatives && i === 0 && Math.random() > 0.6) {
          operand = -operand;
        }
        operands.push(operand);
        
        if (i < numOperands - 1) {
          operators.push(operations[Math.floor(Math.random() * operations.length)]);
        }
      }
      
      // Build expression string
      expression = operands[0].toString();
      for (let i = 0; i < operators.length; i++) {
        expression += ` ${operators[i]} ${operands[i + 1]}`;
      }
      
      // Calculate value (simplified - follows left to right for demo)
      value = operands[0];
      for (let i = 0; i < operators.length; i++) {
        switch (operators[i]) {
          case '+':
            value += operands[i + 1];
            break;
          case '-':
            value -= operands[i + 1];
            break;
          case '×':
            value *= operands[i + 1];
            break;
          case '÷':
            value = Math.round(value / operands[i + 1]);
            break;
        }
      }
      
      // Adjust to match target if needed
      if (value !== target) {
        const adjustment = target - value;
        expression += ` + ${adjustment}`;
        value = target;
      }
    }
  } else {
    // Generate incorrect expressions
    let result = target;
    while (result === target || result < -50 || result > 100) {
      if (numOperands === 2) {
        const op = operations[Math.floor(Math.random() * (complexOps ? 4 : 2))];
        
        switch (op) {
          case '+':
            const a1 = Math.floor(Math.random() * 15) + 1;
            const a2 = Math.floor(Math.random() * 15) + 1;
            expression = `${useNegatives && Math.random() > 0.8 ? '-' : ''}${a1} + ${a2}`;
            result = (useNegatives && expression.startsWith('-') ? -a1 : a1) + a2;
            break;
          case '-':
            const s1 = Math.floor(Math.random() * 20) + target;
            const s2 = Math.floor(Math.random() * 15) + 1;
            expression = `${s1} - ${s2}`;
            result = s1 - s2;
            break;
          case '×':
            const m1 = Math.floor(Math.random() * 8) + 1;
            const m2 = Math.floor(Math.random() * 8) + 1;
            expression = `${useNegatives && Math.random() > 0.8 ? '-' : ''}${m1} × ${m2}`;
            result = (useNegatives && expression.startsWith('-') ? -m1 : m1) * m2;
            break;
          case '÷':
            const d1 = Math.floor(Math.random() * 40) + 10;
            const d2 = Math.floor(Math.random() * 5) + 2;
            expression = `${d1} ÷ ${d2}`;
            result = Math.round(d1 / d2);
            break;
        }
      } else {
        // Generate wrong complex expression
        const wrongTarget = target + (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1);
        const generated = generateExpression(wrongTarget, true, level);
        expression = generated.expression;
        result = generated.value;
      }
    }
    value = result;
  }

  return { expression, value };
};

export const generateBubbles = (targetNumber: number, level: number) => {
  const bubbleCount = Math.min(8 + Math.floor(level / 2), 16); // More bubbles as level increases
  const correctCount = Math.max(2, Math.floor(bubbleCount / 4)); // More correct answers needed

  const bubbleColors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600'
  ];

  const expressions = [];

  // Generate correct expressions
  for (let i = 0; i < correctCount; i++) {
    const { expression, value } = generateExpression(targetNumber, true, level);
    expressions.push({
      id: i,
      expression,
      value,
      isCorrect: true,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      clicked: false,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
    });
  }

  // Generate incorrect expressions (distractors)
  for (let i = correctCount; i < bubbleCount; i++) {
    const { expression, value } = generateExpression(targetNumber, false, level);
    expressions.push({
      id: i,
      expression,
      value,
      isCorrect: false,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      clicked: false,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
    });
  }

  return expressions;
};
