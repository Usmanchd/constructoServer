import axios from 'axios'

const HandleSubmit = async (state, match, createProject, updateProject, history, profile) => {
  //delete unused keys
  delete state.flag
  delete state.viewUser
  delete state.isOpen

  //location uri
  const URI = `https://open.mapquestapi.com/geocoding/v1/address?key=8BMAbnYiw1lNi8wGGywrZzYwkoT3SrwT&location=${state.location}`

  //check lat lng
  if (!state.lat || !state.lng) {
    const res = await axios.get(URI)

    const { lat, lng } = res.data.results[0].locations[0].latLng
    state.lat = lat
    state.lng = lng
  }

  //check createdby
  if (state.createdby === undefined) state.createdby = profile.Name

  //check project is new else update
  if (match.params.id === 'create-project') {
    const project = {
      ...state,
      users: [profile.ID],
      userID: profile.ID,
    }

    createProject(project, profile)
    history.push('/dashboard/list')
  } else {
    const project = { ...state, lastupdate: Date.now() }

    updateProject(project)
  }
}

export default HandleSubmit
