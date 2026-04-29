import fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const target1 = `<select
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-purple-500 bg-white"
                  value={sumStartCol}
                  onChange={(e) => setSumStartCol(e.target.value)}
                >
                  {activeConfig.columns
                    .filter(
                      (c) =>
                        c.type === "sale_tracker" &&
                        (c.name
                          .toLowerCase()
                          .includes(sumStartSearchQuery.toLowerCase()) ||
                          c.key === sumStartCol),
                    )
                    .map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.name}
                      </option>
                    ))}
                </select>`;

const replace1 = `<div className="w-full border border-gray-300 rounded overflow-y-auto bg-white max-h-[130px] shadow-inner">
                  {activeConfig.columns
                    .filter(c => c.type === 'sale_tracker' && (c.name.toLowerCase().includes(sumStartSearchQuery.toLowerCase()) || c.key === sumStartCol))
                    .map(c => (
                      <div 
                        key={c.key} 
                        onClick={() => setSumStartCol(c.key)}
                        className={\`p-2 text-sm cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors flex items-center \${sumStartCol === c.key ? 'bg-purple-100 text-purple-900 font-bold border-l-4 border-purple-600' : 'hover:bg-purple-50 text-gray-700 border-l-4 border-transparent'}\`}
                      >
                        {renderHighlightedText(c.name, sumStartSearchQuery)}
                      </div>
                    ))}
                  {activeConfig.columns.filter(c => c.type === 'sale_tracker' && (c.name.toLowerCase().includes(sumStartSearchQuery.toLowerCase()) || c.key === sumStartCol)).length === 0 && (
                    <div className="p-3 text-sm text-gray-400 text-center italic font-semibold">No dates found</div>
                  )}
                </div>`;

const target2 = `<select
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-purple-500 bg-white"
                  value={sumEndCol}
                  onChange={(e) => setSumEndCol(e.target.value)}
                >
                  {activeConfig.columns
                    .filter(
                      (c) =>
                        c.type === "sale_tracker" &&
                        (c.name
                          .toLowerCase()
                          .includes(sumEndSearchQuery.toLowerCase()) ||
                          c.key === sumEndCol),
                    )
                    .map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.name}
                      </option>
                    ))}
                </select>`;

const replace2 = `<div className="w-full border border-gray-300 rounded overflow-y-auto bg-white max-h-[130px] shadow-inner">
                  {activeConfig.columns
                    .filter(c => c.type === 'sale_tracker' && (c.name.toLowerCase().includes(sumEndSearchQuery.toLowerCase()) || c.key === sumEndCol))
                    .map(c => (
                      <div 
                        key={c.key} 
                        onClick={() => setSumEndCol(c.key)}
                        className={\`p-2 text-sm cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors flex items-center \${sumEndCol === c.key ? 'bg-purple-100 text-purple-900 font-bold border-l-4 border-purple-600' : 'hover:bg-purple-50 text-gray-700 border-l-4 border-transparent'}\`}
                      >
                        {renderHighlightedText(c.name, sumEndSearchQuery)}
                      </div>
                    ))}
                  {activeConfig.columns.filter(c => c.type === 'sale_tracker' && (c.name.toLowerCase().includes(sumEndSearchQuery.toLowerCase()) || c.key === sumEndCol)).length === 0 && (
                    <div className="p-3 text-sm text-gray-400 text-center italic font-semibold">No dates found</div>
                  )}
                </div>`;

content = content.replace(target1, replace1);
content = content.replace(target2, replace2);
fs.writeFileSync(file, content, 'utf8');

console.log("Replaced elements");
