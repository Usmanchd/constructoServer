import axios from 'axios';

const HandleSubmit = (
  state,
  match,
  createProject,
  updateProject,
  history,
  profile
) => {
  if (
    state.name === '' ||
    state.city === '' ||
    state.street === '' ||
    state.zip === '' ||
    state.state === '' ||
    state.location === '' ||
    state.projectDescription === '' ||
    state.createdby === ''
  ) {
    alert('Please Fill in All Details');

    return;
  }

  if (match.params.id === 'create-project') {
    let newstate = {
      ...state,
      users: [profile.ID],
      userID: profile.ID,
    };
    if (state.lat || state.lng) {
      if (state.createdby === undefined) newstate.createdby = profile.Name;

      delete newstate.flag;
      createProject(newstate);
      history.push('/list');
    } else {
      axios
        .get(
          `https://open.mapquestapi.com/geocoding/v1/address?key=8BMAbnYiw1lNi8wGGywrZzYwkoT3SrwT&location=${state.location}`
        )
        .then((res) => {
          if (res.data.results === undefined) return;

          const { lat, lng } = res.data.results[0].locations[0].latLng;

          delete newstate.flag;
          if (state.lat === '' || state.lng === '') {
            newstate.lat = lat;
            newstate.lng = lng;
          }
          if (state.createdby === undefined) newstate.createdby = profile.Name;

          createProject(newstate);
          history.push('/list');
        });
    }
  } else {
    if (state.lat || state.lng) {
      let newstate = { ...state, lastupdate: Date.now() };
      delete newstate.flag;
      updateProject(newstate);
    } else {
      axios
        .get(
          `https://open.mapquestapi.com/geocoding/v1/address?key=8BMAbnYiw1lNi8wGGywrZzYwkoT3SrwT&location=${state.location}`
        )
        .then((res) => {
          if (res.data === undefined) return;

          const { lat, lng } = res.data.results[0].locations[0].latLng;
          let newstate = { ...state };
          delete newstate.flag;
          if (state.lat === '' || state.lng === '') {
            newstate.lat = lat;
            newstate.lng = lng;
          }
          updateProject(newstate);
        });
    }
  }
};

export default HandleSubmit;
