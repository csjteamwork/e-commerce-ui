import React, { Component, Fragment } from 'react';
import { MDBDataTable } from 'mdbreact';

import Layout from '../layout';
import Button from './Button';
import ModalForm from './modalForm';
import { columns, rows } from './data';

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
  }

  componentDidMount() {
    const modRows = rows.map(row => ({
      ...row,
      actions: (
        <Fragment>
          <Button onClick={this.handleBtnClick} rowData={row} icon="edit-2" action="Edit" />
          <Button onClick={() => null} rowData={row} icon="trash-2" action="Delete" />
        </Fragment>
      )
    }));

    this.setState(prevState => ({ ...prevState, data: { ...prevState.data, rows: modRows } }));
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
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
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
                <MDBDataTable bordered hover noBottomColumns responsive btn data={data} />
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
