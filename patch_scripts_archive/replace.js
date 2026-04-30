const fs = require('fs');

const original = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = '{/* --- ARCHIVE COLUMNS MODAL --- */}';
const targetStart = original.indexOf(startMarker);

const endSearchStr = '      )}\n    </div>\n  );\n}';
const targetEnd = original.indexOf(endSearchStr, targetStart);

if (targetStart === -1 || targetEnd === -1) {
  console.log('Could not find string boundaries!');
  process.exit(1);
}

const replacement = fs.readFileSync('modal_replacement.txt', 'utf8');
const newContent = original.substring(0, targetStart) + replacement + original.substring(targetEnd);

fs.writeFileSync('src/App.tsx', newContent);
console.log('Replacement successful.');
