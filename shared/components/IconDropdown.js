import React, { Component } from 'react';
import { RaisedButton, Popover, SelectField, Menu, MenuItem } from 'material-ui/lib';
import { CommunicationCall } from 'material-ui/lib/svg-icons';

export default (props) => {
  const { iconMap, selected } = props;
  const items = Object.entries(iconMap).map((key, icon) => {
    <MenuItem value={key} primaryText={<icon/>} style={{width: 'auto', display: 'flex', justifyContent: 'center'}} />
  })
  console.log(items)
  return (
    <SelectField value={selected} autoWidth={false} style={{width: 'auto'}}>
      {items}
    </SelectField>
  );
};
