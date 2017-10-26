import * as React from 'react';
import { User } from '../../models';
// import FlexView from 'react-flexview';

import './guest.css';

interface GuestProps {
  guest: User;
}
const Guest = (props: GuestProps) => {
  const { guest } = props;
  return (
    <div className='guest'>
      <img className='image is-32x32' src={guest.avatarUrl} alt={guest.name} />
     </div>
  );
};

export default Guest;
