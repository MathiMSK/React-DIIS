import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import React from 'react'

 const DTable=({columns,data,ref})=> {
  const [pending, setPending] = React.useState(true);
	const [rows, setRows] = React.useState([]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

  return (
    <DataTable
      columns={columns}
      data={data} 
      ref={ref}
      progressPending={pending}
      pagination
    />
  );
};

export default DTable;