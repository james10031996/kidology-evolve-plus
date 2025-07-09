

export const patterns = [
    {
        sequence: ['🟦', '🟨', '🟦', '🟨', '🟦'],
        options: ['🟨', '🟦', '🟪', '🟩'],
        correct: '🟨',
        type: 'Color Pattern',
        hint: 'What comes next in this color pattern?'
    },
    {
        sequence: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'],
        options: ['⭐⭐⭐⭐⭐', '⭐⭐', '⭐', '⭐⭐⭐'],
        correct: '⭐⭐⭐⭐⭐',
        type: 'Number Pattern',
        hint: 'How many stars come next?'
    },
    {
        sequence: ['🔺', '🔴', '🔺', '🔴', '🔺'],
        options: ['🔴', '🔺', '🟢', '🟨'],
        correct: '🔴',
        type: 'Shape Pattern',
        hint: 'Which shape continues the pattern?'
    },
    {
        sequence: ['🌟', '🌟🌟', '🌟', '🌟🌟', '🌟'],
        options: ['🌟🌟', '🌟', '🌟🌟🌟', '⭐'],
        correct: '🌟🌟',
        type: 'Repeating Pattern',
        hint: 'What comes next in this repeating pattern?'
    },
    {
        sequence: ['🎈', '🎈🎈', '🎈🎈🎈', '🎈🎈🎈🎈'],
        options: ['🎈🎈🎈🎈🎈', '🎈', '🎈🎈', '🎭'],
        correct: '🎈🎈🎈🎈🎈',
        type: 'Growing Pattern',
        hint: 'How many balloons come next?'
    },
    {
        sequence: ['🍎', '🍌', '🍎', '🍌', '🍎'],
        options: ['🍌', '🍎', '🍇', '🍓'],
        correct: '🍌',
        type: 'Fruit Pattern',
        hint: 'Which fruit comes next in this repeating pattern?'
    },
    {
        sequence: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'],
        options: ['⭐⭐⭐⭐⭐', '⭐', '⭐⭐⭐', '🌟'],
        correct: '⭐⭐⭐⭐⭐',
        type: 'Number Growing Pattern',
        hint: 'How many stars come next?'
    },
    {
        sequence: ['🔴', '🔵', '🟢', '🔴', '🔵'],
        options: ['🟢', '🔴', '🟡', '🟣'],
        correct: '🟢',
        type: 'Color Rotation',
        hint: 'Which color continues the rotation?'
    },
    {
        sequence: ['🐶', '🐱', '🐶', '🐱', '🐶'],
        options: ['🐱', '🐶', '🐰', '🦊'],
        correct: '🐱',
        type: 'Animal Pattern',
        hint: 'Which animal comes next in this pattern?'
    },
    {
        sequence: ['🎵', '🎶', '🎵', '🎶', '🎵'],
        options: ['🎶', '🎵', '🎷', '🎸'],
        correct: '🎶',
        type: 'Music Pattern',
        hint: 'What musical note comes next?'
    },
    {
        sequence: ['🚗', '🚕', '🚙', '🚗', '🚕'],
        options: ['🚙', '🚗', '🚛', '🚌'],
        correct: '🚙',
        type: 'Vehicle Rotation',
        hint: 'Which vehicle continues the sequence?'
    },
    {
        sequence: ['🌞', '🌛', '🌞', '🌛', '🌞'],
        options: ['🌛', '🌞', '⭐', '🌙'],
        correct: '🌛',
        type: 'Day-Night Pattern',
        hint: 'What comes next in this day-night cycle?'
    },
    {
        sequence: ['🟥', '🟧', '🟨', '🟩', '🟦'],
        options: ['🟪', '🟫', '⬛', '🟪'],
        correct: '🟪',
        type: 'Color Gradient',
        hint: 'Which color follows this gradient?'
    },
    {
        sequence: ['🎂', '🎁', '🎈', '🎉', '🎂'],
        options: ['🎁', '🎈', '🎉', '🎂'],
        correct: '🎁',
        type: 'Party Items Pattern',
        hint: 'Which party item comes next?'
    },
    {
        sequence: ['🔺', '🔺🔺', '🔺🔺🔺', '🔺🔺🔺🔺'],
        options: ['🔺🔺🔺🔺🔺', '🔺', '🔺🔺', '🟥'],
        correct: '🔺🔺🔺🔺🔺',
        type: 'Shape Growing Pattern',
        hint: 'How many triangles come next?'
    },
    {
        sequence: ['⚽', '🏀', '⚾', '🏈', '⚽'],
        options: ['🏀', '🏉', '🎾', '🏀'],
        correct: '🏀',
        type: 'Sports Ball Pattern',
        hint: 'Which ball comes next in this sequence?'
    },
    {
        sequence: ['🍎', '🍌', '🍎', '🍌', '🍎'],
        options: ['🍌', '🍎', '🍇', '🍓'],
        correct: '🍌',
        type: 'Fruit Pattern',
        hint: 'Which fruit comes next in this repeating pattern?'
    },
    {
        sequence: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'],
        options: ['⭐⭐⭐⭐⭐', '⭐', '⭐⭐⭐', '🌟'],
        correct: '⭐⭐⭐⭐⭐',
        type: 'Number Growing Pattern',
        hint: 'How many stars come next?'
    },
    {
        sequence: ['☀️', '🌧️', '☀️', '🌧️', '☀️'],
        options: ['🌧️', '☀️', '❄️', '🌈'],
        correct: '🌧️',
        type: 'Weather Pattern',
        hint: 'What’s next in the weather cycle?'
    },
    {
        sequence: ['🦁', '🐯', '🦁', '🐯', '🦁'],
        options: ['🐯', '🦁', '🐻', '🐺'],
        correct: '🐯',
        type: 'Animal Pattern',
        hint: 'Which animal comes next in this jungle pattern?'
    },
    {
        sequence: ['🍂', '❄️', '🌸', '☀️', '🍂'],
        options: ['❄️', '☀️', '🌸', '🍁'],
        correct: '❄️',
        type: 'Season Pattern',
        hint: 'What season follows this cycle?'
    },
    {
        sequence: ['🔴', '🔵', '🟢', '🔴', '🔵'],
        options: ['🟢', '🔴', '🟣', '🟡'],
        correct: '🟢',
        type: 'Color Rotation',
        hint: 'Which color comes next?'
    },
    {
        sequence: ['🎵', '🎶', '🎵', '🎶', '🎵'],
        options: ['🎶', '🎵', '🎷', '🎸'],
        correct: '🎶',
        type: 'Music Pattern',
        hint: 'What musical note comes next?'
    },
    {
        sequence: ['🚗', '🚕', '🚙', '🚗', '🚕'],
        options: ['🚙', '🚗', '🚌', '🚓'],
        correct: '🚙',
        type: 'Vehicle Rotation',
        hint: 'Which vehicle comes next?'
    },
    {
        sequence: ['🍫', '🍭', '🍫', '🍭', '🍫'],
        options: ['🍭', '🍫', '🍬', '🍪'],
        correct: '🍭',
        type: 'Sweet Treats',
        hint: 'Which treat completes this pattern?'
    },
    {
        sequence: ['🎈', '🎈🎈', '🎈🎈🎈', '🎈🎈🎈🎈'],
        options: ['🎈🎈🎈🎈🎈', '🎈', '🎈🎈', '🎭'],
        correct: '🎈🎈🎈🎈🎈',
        type: 'Growing Pattern',
        hint: 'How many balloons come next?'
    },
    {
        sequence: ['🌞', '🌛', '🌞', '🌛', '🌞'],
        options: ['🌛', '🌞', '⭐', '🌙'],
        correct: '🌛',
        type: 'Day-Night Pattern',
        hint: 'What comes next in this day-night cycle?'
    },
    {
        sequence: ['⚽', '🏀', '⚾', '🏈', '⚽'],
        options: ['🏀', '🎾', '🏉', '🏀'],
        correct: '🏀',
        type: 'Sports Ball Pattern',
        hint: 'Which ball comes next?'
    },
    // ... add 15+ more to reach 30+

];