import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `  const filteredRows = useMemo(() => {
    let rows = activeRows;
    const activeQueries = [...primarySearchTags, currentSearch.trim()].filter(Boolean);
    if (activeQueries.length > 0) {
      rows = rows.filter(row => {
        const colData = activeConfig.columns.map(col => {`;
const replace1 = `  const activeColumnsWithSum = useMemo(() => {
    let cols = [...activeConfig.columns];
    if (activeCustomSum) {
      const remIdx = cols.findIndex(c => c.key === 'remaining_qty');
      if (remIdx !== -1) {
        cols.splice(remIdx + 1, 0, {
          key: 'custom_temp_sum',
          name: \`Sum (\${activeCustomSum.startName} to \${activeCustomSum.endName})\`,
          type: 'number',
          locked: true,
          sortEnabled: true,
          archived: false
        } as any);
      }
    }
    return cols;
  }, [activeConfig.columns, activeCustomSum]);

  const activeRowsWithSum = useMemo(() => {
    if (!activeCustomSum || !activeConfig.isTrackerPage) return activeRows;
    return activeRows.map(r => {
      const sum = activeCustomSum.keys.reduce((acc, k) => acc + (parseFloat(String(r[k] || 0)) || 0), 0);
      return { ...r, custom_temp_sum: String(sum) };
    });
  }, [activeRows, activeCustomSum, activeConfig.isTrackerPage]);

  const filteredRows = useMemo(() => {
    let rows = activeRowsWithSum;
    const activeQueries = [...primarySearchTags, currentSearch.trim()].filter(Boolean);
    if (activeQueries.length > 0) {
      rows = rows.filter(row => {
        const colData = activeColumnsWithSum.map(col => {`;

let newContent = content.replace(target1, replace1);

const target2 = `  }, [activeRows, currentSearch, primarySearchTags, activeConfig.columns, activeConfig.isTrackerPage, activeConfig.minStockAlert, trackerFilter, trackerSort]);`;
const replace2 = `  }, [activeRowsWithSum, currentSearch, primarySearchTags, activeColumnsWithSum, activeConfig.isTrackerPage, activeConfig.minStockAlert, trackerFilter, trackerSort]);`;

newContent = newContent.replace(target2, replace2);

const target3 = `  const displayConfig = isSecondaryActive ? state.pageConfigs[activeConfig.secondarySearchPage!] : activeConfig;`;
const replace3 = `  const displayConfig = isSecondaryActive ? state.pageConfigs[activeConfig.secondarySearchPage!] : { ...activeConfig, columns: activeColumnsWithSum };`;

newContent = newContent.replace(target3, replace3);

fs.writeFileSync('src/App.tsx', newContent);
console.log('Update successful');
