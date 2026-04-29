import fs from 'fs';

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `<h3 className="text-lg font-bold mb-1 text-purple-800">
              📊 Calculate Range Sum
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Select the start and end columns. The sum will appear next to
              Remaining Qty.
            </p>

            <input
              type="text"
              autoFocus
              placeholder="🔍 Search columns..."
              className="w-full border-2 border-purple-100 p-2 rounded-md outline-none focus:border-purple-500 text-sm font-semibold transition-colors mb-4"
              value={sumSearchQuery}
              onChange={(e) => setSumSearchQuery(e.target.value)}
            />

            <div className="flex flex-col gap-3 mb-5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Start Column:
                </label>
                <select
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-purple-500"
                  value={sumStartCol}
                  onChange={(e) => setSumStartCol(e.target.value)}
                >
                  {activeConfig.columns
                    .filter(
                      (c) =>
                        c.type === "sale_tracker" &&
                        (c.name
                          .toLowerCase()
                          .includes(sumSearchQuery.toLowerCase()) ||
                          c.key === sumStartCol ||
                          c.key === sumEndCol)
                    )
                    .map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  End Column:
                </label>
                <select
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-purple-500"
                  value={sumEndCol}
                  onChange={(e) => setSumEndCol(e.target.value)}
                >
                  {activeConfig.columns
                    .filter(
                      (c) =>
                        c.type === "sale_tracker" &&
                        (c.name
                          .toLowerCase()
                          .includes(sumSearchQuery.toLowerCase()) ||
                          c.key === sumStartCol ||
                          c.key === sumEndCol)
                    )
                    .map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>`;

const replacement = `<h3 className="text-lg font-bold mb-1 text-purple-800">📊 Calculate Range Sum</h3>
            <p className="text-xs text-gray-500 mb-5">Search and select the range. The total will appear next to Remaining Qty.</p>
            
            <div className="flex flex-col gap-6 mb-6">
              {/* Start Column Group */}
              <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                <label className="text-xs font-bold text-purple-700 block mb-2 uppercase tracking-wider">Step 1: Start Column</label>
                <input 
                  type="text"
                  placeholder="🔍 Search start date..."
                  className="w-full border border-gray-300 p-2 rounded text-sm mb-2 outline-none focus:border-purple-500 bg-white"
                  value={sumStartSearchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSumStartSearchQuery(val);
                    if (val.trim() !== "") {
                      const matched = activeConfig.columns.find(c => c.type === 'sale_tracker' && c.name.toLowerCase().includes(val.toLowerCase()));
                      if (matched) setSumStartCol(matched.key);
                    }
                  }}
                />
                <select 
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-purple-500 bg-white"
                  value={sumStartCol}
                  onChange={(e) => setSumStartCol(e.target.value)}
                >
                  {activeConfig.columns
                    .filter(c => c.type === 'sale_tracker' && (c.name.toLowerCase().includes(sumStartSearchQuery.toLowerCase()) || c.key === sumStartCol))
                    .map(c => (
                      <option key={c.key} value={c.key}>{c.name}</option>
                    ))}
                </select>
              </div>

              {/* End Column Group */}
              <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                <label className="text-xs font-bold text-purple-700 block mb-2 uppercase tracking-wider">Step 2: End Column</label>
                <input 
                  type="text"
                  placeholder="🔍 Search end date..."
                  className="w-full border border-gray-300 p-2 rounded text-sm mb-2 outline-none focus:border-purple-500 bg-white"
                  value={sumEndSearchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSumEndSearchQuery(val);
                    if (val.trim() !== "") {
                      const matched = [...activeConfig.columns].reverse().find(c => c.type === 'sale_tracker' && c.name.toLowerCase().includes(val.toLowerCase()));
                      if (matched) setSumEndCol(matched.key);
                    }
                  }}
                />
                <select 
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-purple-500 bg-white"
                  value={sumEndCol}
                  onChange={(e) => setSumEndCol(e.target.value)}
                >
                  {activeConfig.columns
                    .filter(c => c.type === 'sale_tracker' && (c.name.toLowerCase().includes(sumEndSearchQuery.toLowerCase()) || c.key === sumEndCol))
                    .map(c => (
                      <option key={c.key} value={c.key}>{c.name}</option>
                    ))}
                </select>
              </div>
            </div>`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content, 'utf8');

console.log("Success!");
