import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      <ExcelExportModal
        isOpen={modals.excelExport}
        onClose={closeAllModals}
        onBack={() => {
          closeAllModals();
          toggleModal('activePageSettings', true);
        }}
        pageName={state.activePage}
        columns={activeConfig.columns}
        rows={activeRows}`;
const replace = `      <ExcelExportModal
        isOpen={modals.excelExport}
        onClose={closeAllModals}
        onBack={() => {
          closeAllModals();
          toggleModal('activePageSettings', true);
        }}
        pageName={state.activePage}
        columns={activeCustomSum ? activeColumnsWithSum : activeConfig.columns}
        rows={activeCustomSum ? activeRowsWithSum : activeRows}`;

const newContent = content.replace(target, replace);
fs.writeFileSync('src/App.tsx', newContent);
console.log('Update successful');
