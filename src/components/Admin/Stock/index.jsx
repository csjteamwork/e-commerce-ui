import React, { Component, Fragment } from 'react';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';

import Layout from '../layout';
import Button from './Button';
import ModalForm from './modalForm';
import { columns } from './data';

import { getProducts, createProduct } from '../../../apis';

class StockPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        columns,
        rows: []
      },
      modalFormData: {},
      modalAction: '',
      modal: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modifyRowObject = this.modifyRowObject.bind(this);
  }

  componentDidMount() {
    getProducts().then(d => {
      const modRows = d.data.map(this.modifyRowObject);
      this.setState(prevState => ({ ...prevState, data: { ...prevState.data, rows: modRows } }));
    });
  }

  modifyRowObject(row) {
    return {
      ...row,
      create_date: moment(row.create_date).format('DD/MM/YYYY HH:mm:ss'),
      actions: (
        <Fragment>
          <Button onClick={this.handleBtnClick} rowData={row} icon="edit-2" action="Edit" />
          <Button onClick={() => null} rowData={row} icon="trash-2" action="Delete" />
        </Fragment>
      )
    };
  }

  handleBtnClick(rowData, action) {
    this.setState(prevState => ({
      ...prevState,
      modal: !this.state.modal,
      modalAction: action,
      modalFormData: rowData
    }));
  }

  handleToggle() {
    this.setState(prevState => ({ ...prevState, modal: !this.state.modal }));
  }

  handleSubmit(values, { setSubmitting }) {
    const { modalAction } = this.state;

    if (modalAction === 'Add') {
      createProduct(values).then(d => {
        const newRow = this.modifyRowObject(d.data);

        this.setState(prevState => ({
          ...prevState,
          data: { ...prevState.data, rows: [newRow, ...prevState.data.rows] }
        }));
        this.handleToggle();
      });
    }
    setSubmitting(false);
  }

  render() {
    const { history } = this.props;
    const { data, modal, modalAction, modalFormData } = this.state;

    return (
      <Fragment>
        <Layout history={history} pageTitle="Stock">
          <div className="card mb-4">
            <div className="card-header">
              Add New Item
              <Button onClick={this.handleBtnClick} rowData={{}} icon="plus" action="Add" />
            </div>
            <div className="card-body">
              <div className="datatable table-responsive">
                {data.rows.length > 0 && (
                  <MDBDataTable
                    bordered
                    hover
                    noBottomColumns
                    responsive
                    btn
                    data={data}
                    order={['create_date', 'desc']}
                  />
                )}
              </div>
            </div>
          </div>
        </Layout>
        {modal && (
          <ModalForm
            open={modal}
            toggle={this.handleToggle}
            onSubmit={this.handleSubmit}
            action={modalAction}
            data={modalFormData}
          />
        )}
      </Fragment>
    );
  }
}

export default StockPage;
