import React from 'react';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import '../../App.css';

export default function Profile(props) {
  return (
    <div>
      <ProfileForm {...props} />
    </div>
  );
}
