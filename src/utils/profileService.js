const BASE_URL = '/api/profile/';

function update(creds) {
  return fetch(BASE_URL + ':id/profile', {
    method: 'PUT',
    headers: new Headers({ 'Content-type': 'Application/json' }),
    body: JSON.stringify(creds),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Could not update profile!');
    }
  });
}

export default {
  update,
};
