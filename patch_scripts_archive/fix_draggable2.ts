import fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /\{\/\* @ts-ignore \*\/\}\n                          <Draggable key=\{row\.id\}/,
  '// @ts-ignore\n                          <Draggable key={row.id}'
);
content = content.replace(
  /\{\/\* @ts-ignore \*\/\}\n\s*<Draggable key=\{row\.id\}/,
  '/* @ts-ignore */\n                          <Draggable key={row.id}'
);

fs.writeFileSync(file, content, 'utf8');
