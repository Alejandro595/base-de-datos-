document.getElementById('fileInput').addEventListener('change', handleFile, false);

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

    renderTable(jsonData);
  };

  reader.readAsArrayBuffer(file);
}

function renderTable(data) {
  const container = document.getElementById('tableContainer');
  container.innerHTML = ''; // Limpia placeholder

  if (data.length === 0) {
    container.innerHTML = '<p>No se encontraron datos en la hoja.</p>';
    return;
  }

  const table = document.createElement('table');

  data.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const cellElement = rowIndex === 0 ? document.createElement('th') : document.createElement('td');
      cellElement.textContent = cell;
      tr.appendChild(cellElement);
    });
    table.appendChild(tr);
  });

  container.appendChild(table);
}
