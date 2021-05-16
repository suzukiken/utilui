import React from 'react';
import { graphqlOperation, API } from 'aws-amplify';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { listCrossStackReferences } from './graphql/queries';
import { DataGrid } from '@material-ui/data-grid';

function Dg() {
  const [exportList, setExportList] = useState([]);
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Exported Parameter Name', width: 300 },
    { field: 'stack', headerName: 'CloudFormation Stack Name', width: 200 },
    { field: 'value', headerName: 'Exported Value', width: 200 },
    { field: 'imports', headerName: 'Import Stacks' },
  ]
  
  async function doListCrossStackReferences() {
    try {
      const response = await API.graphql(graphqlOperation(listCrossStackReferences));
      console.log(response)
      const exli = []
      for (let i=0; i<response.data.listCrossStackReferences.length; ++i) {
        const item = response.data.listCrossStackReferences[i]
        item.id = i + 1
        exli.push(item)
      }
      setExportList(exli)
    } catch (err) { console.log('error doListCrossStackReferences') }
  }

  return (
    <React.Fragment>
      <Button
        variant="contained" color="primary"
        onClick={() => doListCrossStackReferences()}
        >Get Strings
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={exportList} columns={columns} pageSize={20} />
      </div>
    </React.Fragment>  
  )
}

export default Dg

