import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/lib/lists';
import {
  CommunicationCall,
  CommunicationEmail,
  MapsPlace,
  EditorAttachMoney
} from 'material-ui/lib/svg-icons';

const icons = {
  'phone': <CommunicationCall/>,
  'email': <CommunicationEmail/>,
  'price': <EditorAttachMoney/>,
};

const StopInfo = (props) => {
  const { address='', details=[] } = props;
  console.log(props);
  const detailList = details.map(item => {
    const icon = icons[item.icon] || <div />;
    return <ListItem leftIcon={icon} primaryText={item.value} secondaryText={item.label} />;
  });
  console.log(detailList);
  return (
  <List>
    <ListItem leftIcon={<MapsPlace/>} primaryText={address} secondaryText="Address"/>
    {detailList}
  </List>
  );
};

export default StopInfo;
