import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      <ExcelExportModal`;

const replace = `      {/* --- CUSTOM SUM MODAL --- */}
      {isSumModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-2xl">
            <h3 className="text-lg font-bold mb-1 text-purple-800">📊 Calculate Range Sum</h3>
            <p className="text-xs text-gray-500 mb-4">Select the start and end columns. The sum will appear next to Remaining Qty.</p>
            
            <div className="flex flex-col gap-3 mb-5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Start Column:</label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-purple-500"
                  value={sumStartCol}
                  onChange={(e) => setSumStartCol(e.target.value)}
                >
                  {activeConfig.columns.filter(c => c.type === 'sale_tracker').map(c => (
                    <option key={c.key} value={c.key}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">End Column:</label>
                <select 
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-purple-500"
                  value={sumEndCol}
                  onChange={(e) => setSumEndCol(e.target.value)}
                >
                  {activeConfig.columns.filter(c => c.type === 'sale_tracker').map(c => (
                    <option key={c.key} value={c.key}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsSumModalOpen(false)} className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-bold text-sm transition-colors">Cancel</button>
              <button onClick={() => {
                const saleCols = activeConfig.columns.filter(c => c.type === 'sale_tracker');
                const idx1 = saleCols.findIndex(c => c.key === sumStartCol);
                const idx2 = saleCols.findIndex(c => c.key === sumEndCol);
                
                if (idx1 === -1 || idx2 === -1) {
                  toast.error("Invalid columns selected");
                  return;
                }
                
                const startIdx = Math.min(idx1, idx2);
                const endIdx = Math.max(idx1, idx2);
                
                const keysToSum = saleCols.slice(startIdx, endIdx + 1).map(c => c.key);
                
                setActiveCustomSum({
                  startName: saleCols[startIdx].name,
                  endName: saleCols[endIdx].name,
                  keys: keysToSum
                });
                
                setIsSumModalOpen(false);
                toast.success(\`Calculated sum for \${keysToSum.length} columns.\`);
              }} className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold text-sm shadow-md transition-colors">Calculate Sum</button>
            </div>
          </div>
        </div>
      )}

      <ExcelExportModal`;

const newContent = content.replace(target, replace);
fs.writeFileSync('src/App.tsx', newContent);
console.log('Update successful');
