import React from 'react';
import { MDBDataTable } from 'mdbreact';
import FeatherIcon from 'feather-icons-react';

import Layout from '../layout';
import { columns, rows } from './data';

columns.push({
  label: 'Actions',
  field: 'actions',
  sort: 'asc',
  width: 100
});

const btn = () => {
  return (
    <button className="btn btn-datatable btn-icon btn-transparent-dark">
      <FeatherIcon icon="edit-2" />
    </button>
  );
};

const modRows = rows.map(row => ({
  ...row,
  actions: btn()
}));

const StockPage = ({ history }) => {
  const data = {
    columns,
    rows: modRows
  };

  return (
    <Layout history={history} pageTitle="Stock">
      <div className="card mb-4">
        <div className="card-header">Title goes here</div>
        <div className="card-body">
          <div className="datatable table-responsive">
            <MDBDataTable bordered hover noBottomColumns responsive btn data={data} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StockPage;
