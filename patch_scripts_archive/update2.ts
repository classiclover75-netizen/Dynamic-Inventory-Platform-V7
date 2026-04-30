import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                            if (config.isTrackerPage) {
                              if (col.key === 'remaining_qty') {`;
const replace = `                            if (config.isTrackerPage) {
                              if (col.key === 'custom_temp_sum') {
                                return (
                                  <td key={col.key} {...commonProps} className={\`p-1.5 border-r-[length:medium] border-b-[length:medium] border-[#e0e0e0] overflow-hidden whitespace-pre-wrap bg-purple-50 text-purple-900 font-bold text-center\`}>
                                    {rawVal}
                                  </td>
                                );
                              }

                              if (col.key === 'remaining_qty') {`;

const newContent = content.replace(target, replace);
fs.writeFileSync('src/App.tsx', newContent);
console.log('Update successful');
