import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import UploadIcon from 'material-ui/lib/svg-icons/file/file-upload';
import { SelectField, MenuItem } from 'material-ui/lib';
import { CommunicationCall } from 'material-ui/lib/svg-icons';
import { reduxForm } from 'redux-form';
import { push as pushHistory } from 'react-router-redux';

import { createStop } from '../../redux/actions/stopsActions.js';
import { IconDropdown } from '../../components/components';

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
        bodyStyle={{overflow: 'auto'}}
        >
        <div style={{display: 'flex'}}>
          <IconDropdown selected='phone' iconMap={{'phone': CommunicationCall}} />
          <div>on thing</div>
          <div>two thing</div>
        </div>
        <div className={styles.form}>
          <div className={styles.formSection}>
            <TextField
              hintText='A title for this location'
              floatingLabelText='Title'
              {...title}
            />
            <TextField
              hintText='A description of this location'
              floatingLabelText='Description'
              multiLine={true}
              rows={4}
              {...description}
            />
            <TextField
              hintText='Street address for this location'
              floatingLabelText='Address'
              {...address}
            />
          </div>
          <div className={styles.formSection}>
            <h2>Other Details</h2>
            <h3>Add freeform data such as contact info or associated costs</h3>
            <div className={styles.freeformContainer}>
              <SelectField value={<UploadIcon/>}>
                <MenuItem value={1} leftIcon={<UploadIcon/>} primaryText='Upload'/>
                <MenuItem value={2}/>
              </SelectField>
              <TextField
                hintText='Label (e.g. Phone, Email, Price etc.)'
                floatingLabelText='Label'

              />
              <TextField
                hintText='Value that matches your label'
                floatingLabelText='Value'

              />
            </div>
          </div>
        </div>
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
  },
  form: {
    // display: 'flex',
  },
  formSection: {
    // flexGrow: 1,
  },
  freeformContainer: {
    display: 'flex',
  }
});
