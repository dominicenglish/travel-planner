import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import UploadIcon from 'material-ui/lib/svg-icons/file/file-upload';
import { reduxForm } from 'redux-form';
import { push as pushHistory } from 'react-router-redux';

import { createStop } from '../../redux/actions/stopsActions.js';

class AddStops extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  handleClose = () => {
    const { params: {tripId} } = this.props;
    this.props.pushHistory(`/trips/${tripId}`);
  };

  handleSubmit = (data) => {
    const { params: {tripId} } = this.props;
    data.tripId = tripId;
    this.props.createStop(data);
    this.handleClose();
  };

  handleChange = (field, e) => {
    const newState = {};
    newState[field] = e.target.value;
    this.setState(newState);
  };

  handleFileInput = (e) => {
    e.preventDefault();
    const { fields } = this.props;
    const files = [...e.target.files];
    console.log('fields', fields);
    fields.images.handleChange(files);

  };

  render() {
    const {
      fields: {title, description, address, images},
      handleSubmit} = this.props;
    const actions = [
      <FlatButton label="Cancel" secondary={true} onTouchTap={this.handleClose} />,
      <FlatButton label="Add Stop" primary={true} onTouchTap={handleSubmit(this.handleSubmit)} />,
    ];
    return (
      <Dialog
        title='Add new Stop'
        open={true}
        onRequestClose={this.handleClose}
        modal={false}
        actions={actions}
        >
        <TextField
          hintText='A title for this location'
          floatingLabelText='Title'
          {...title}
        />
        <br />
        <TextField
          hintText='A description of this location'
          floatingLabelText='Description'
          multiLine={true}
          rows={4}
          {...description}
        />
        <br />
        <TextField
          hintText='Street address for this location'
          floatingLabelText='Address'
          {...address}
        />
        <br />

        <FlatButton label="Upload Images" labelPosition="before" icon={<UploadIcon />}>
          <input className={styles.uploadField} type="file" multiple {...images} value={null}/>
        </FlatButton>

      </Dialog>
    );
  }
}

const mapDispatchToProps = {pushHistory, createStop};
export default reduxForm({
  form: 'addStops',
  fields: ['title', 'description', 'address', 'images'],
}, undefined, mapDispatchToProps)(AddStops);

const styles = cssInJS({
  uploadButton: {
    display: 'flex',
  },
  uploadField: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  }
});
