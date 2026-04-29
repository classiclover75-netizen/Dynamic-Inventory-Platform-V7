import fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\/\/\s*@ts-ignore\s*<Draggable\s+key=\{row\.id\}/;
const replace = '{/* @ts-ignore */}\n                          <Draggable key={row.id}';

content = content.replace(regex, replace);
fs.writeFileSync(file, content, 'utf8');
