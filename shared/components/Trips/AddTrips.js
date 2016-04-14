import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import { reduxForm } from 'redux-form';

import { createTrip } from '../../redux/actions/tripsActions.js';

class AddTrips extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  handleClose = () => {
    this.context.router.push('/trips');
  };

  // Called by redux-form as its onSubmit function (passed to props.handleSubmit)
  handleSubmit = (data) => {
    const { createTrip } = this.props;
    createTrip(data.tripName);
    console.log('handling create trip', data, createTrip);
    this.handleClose();
  };

  render() {
    const {fields: {tripName}, handleSubmit, createTrip} = this.props;
    const actions = [
      <FlatButton label="Cancel" secondary={true} onTouchTap={this.handleClose} />,
      <FlatButton label="Add Trip" primary={true} onTouchTap={handleSubmit(this.handleSubmit)} />,
    ];
    console.log(this.props);
    return (
      <Dialog
        title='Add new Trip'
        open={true}
        onRequestClose={this.handleClose}
        modal={false}
        actions={actions}
        >
        <TextField floatingLabelText="Trip name" {...tripName} />
        <br />

      </Dialog>
    );
  }
}

const mapDispatchToProps = { createTrip };

export default reduxForm({
  form: 'addTrips',
  fields: ['tripName'],
}, undefined, mapDispatchToProps)(AddTrips);
