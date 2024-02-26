import React from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const ExportCSVButton = ({ data, filename }) => {
  const handleExport = () => {
    // Convert data to CSV format
    const csv = Papa.unparse(data, { header: true });

    // Create a Blob containing the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Trigger download using FileSaver.js
    saveAs(blob, filename || 'export.csv');
  };

  return (
    <button className='btn btn-light ms-5' onClick={handleExport}>Export</button>
  );
};

export default ExportCSVButton;
