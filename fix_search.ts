import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /c\.name\.toLowerCase\(\)\.includes\(val\.toLowerCase\(\)\)/g,
  "val.toLowerCase().split(' ').filter(Boolean).every(term => c.name.toLowerCase().includes(term))"
);

content = content.replace(
  /c\.name\s*\.toLowerCase\(\)\s*\.includes\((sumStartSearchQuery|sumEndSearchQuery)\.toLowerCase\(\)\)/g,
  "$1.toLowerCase().split(' ').filter(Boolean).every(term => c.name.toLowerCase().includes(term))"
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
