import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `<button onClick={() => setIsSalePromptOpen(true)} className="bg-[#217346] text-white px-3 py-1.5 rounded text-xs font-bold shadow hover:bg-[#1e6b41]">➕ Add Sale Column</button>`;
const replace = `<button onClick={() => setIsSalePromptOpen(true)} className="bg-[#217346] text-white px-3 py-1.5 rounded text-xs font-bold shadow hover:bg-[#1e6b41]">➕ Add Sale Column</button>
          {activeCustomSum ? (
            <button onClick={() => setActiveCustomSum(null)} className="bg-purple-600 text-white px-3 py-1.5 rounded text-xs font-bold shadow hover:bg-purple-700 flex items-center gap-1">❌ Clear Sum</button>
          ) : (
            <button onClick={() => {
              const saleCols = activeConfig.columns.filter(c => c.type === 'sale_tracker');
              if (saleCols.length > 0) {
                 setSumStartCol(saleCols[0].key);
                 setSumEndCol(saleCols[saleCols.length - 1].key);
              }
              setIsSumModalOpen(true);
            }} className="bg-purple-100 text-purple-800 border border-purple-300 px-3 py-1.5 rounded text-xs font-bold shadow-sm hover:bg-purple-200 flex items-center gap-1">📊 Range Sum</button>
          )}`;

const newContent = content.replace(target, replace);
fs.writeFileSync('src/App.tsx', newContent);
console.log('Update successful');
