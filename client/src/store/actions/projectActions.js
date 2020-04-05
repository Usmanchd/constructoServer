import { v4 as uuidv4 } from 'uuid';

export const createProject = (_newProject, { Name, ID }) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  const firestore = getFirestore();
  let newProject = {
    ..._newProject,
    ID: uuidv4(),
    createdAt: Date.now(),
    deletedAt: null,
    updatedAt: Date.now(),
    active: true,

    tags: null,
    taskCategories: null,
    diaryCategories: null,
    spaceLimit: null,
    spaceUsed: null,
    userLimit: null,
    userUsed: null,
    attendanceKy: null,
    backupPeriod: null,
    subscriptionPlan: null,
    subscriptionPlanValidUntil: null,
    legacy: null,
    legacyId: null,
    legacyContent: null,
    definedRoles: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deleted: false,
      roleName: 'ORDINARY',
      projectRule: 'READ',
      rolesRule: 'READ',
      diaryRule: 'WRITE',
      documentationRule: 'WRITE',
      versionsRule: 'WRITE',
      signingRule: 'WRITE',
      admin: false,
      superAdmin: false,
    },
    roles: [
      {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        deleted: false,
        roleName: 'PROJECT CREATOR',
        projectRule: 'WRITE',
        rolesRule: 'WRITE',
        diaryRule: 'WRITE',
        documentationRule: 'WRITE',
        versionsRule: 'WRITE',
        signingRule: 'WRITE',
        admin: true,
        superAdmin: false,
        userName: Name,
        userID: ID,
      },
    ],
  };
  await firestore.collection('projects').add(newProject);

  await firestore
    .collection('users')
    .where('ID', '==', newProject.userID)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const user = doc.data();
        let p = user.projects;
        p.push(newProject.ID);

        firestore.collection('users').doc(doc.id).update({ projects: p });
      });
    });
  dispatch(getAllProjects(newProject.userID));
};

export const getAllProjects = (ID) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  const firestore = getFirestore();
  let projects = [];
  let project = {};
  firestore
    .collection('users')
    .where('ID', '==', ID)
    .get()
    .then((_user) => {
      const user = _user.docs.map((doc) => doc.data());
      firestore
        .collection('projects')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let temp = doc.data();
            console.log(temp);
            let _project = user[0].projects.filter(
              (project) => project === temp.ID
            );

            if (_project.length !== 0) {
              projects.push(temp);
              if (user[0].project === _project[0]) project = temp;
            }
          });

          dispatch({ type: 'PROJECTS', payload: { projects, project } });
        });
    });
};

export const getThisProject = (ID) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  const firestore = getFirestore();
  firestore
    .collection('projects')
    .where('ID', '==', ID)
    .get()
    .then((_project) => {
      const project = _project.docs.map((doc) => doc.data());
      let viewUser = [];
      firestore
        .collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let temp = doc.data();
            let newUser = project[0].users.filter((_user) => _user === temp.ID);
            if (newUser.length !== 0) viewUser = [...viewUser, { ...temp }];
          });

          dispatch({
            type: 'GET_THIS_PROJECT',
            payload: { project: { ...project[0] }, viewUser: viewUser },
          });
        });
    });
};

export const updateProject = (_updateProject) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  const firestore = getFirestore();
  firestore
    .collection('projects')
    .where('ID', '==', _updateProject.ID)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        firestore.collection('projects').doc(doc.id).update(_updateProject);
      });
      dispatch(getThisProject(_updateProject.ID));
    });
};

export const deleteProject = (ID) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  const firestore = getFirestore();
  firestore
    .collection('projects')
    .where('ID', '==', ID)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        doc.ref
          .delete()
          .then(() => dispatch({ type: 'DELETE_PROJECT', payload: ID }))
      )
    );
};

export const setCurrentProject = (ID, projectID) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  console.log(ID, projectID);
  const firestore = getFirestore();
  firestore
    .collection('users')
    .where('ID', '==', ID)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        firestore
          .collection('users')
          .doc(doc.id)
          .update({ project: projectID });
      });
      dispatch(getAllProjects(ID));
    });
};

export const handleAddUser = (userEmail, projectID) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  console.log(userEmail, projectID);
  const firestore = getFirestore();
  firestore
    .collection('users')
    .where('email', '==', userEmail)
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.docs.length === 0) {
        firestore
          .collection('projects')
          .where('ID', '==', projectID)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
              let temp = doc.data();
              let index = temp.pendingRegistrations.filter(
                (email) => email === userEmail
              );
              console.log(index);
              if (index.length > 0) return;
              else {
                temp.pendingRegistrations.push(userEmail);
                firestore
                  .collection('projects')
                  .doc(doc.id)
                  .update({ pendingRegistrations: temp.pendingRegistrations });
              }
            });

            dispatch(getThisProject(projectID));
          });
      } else {
        let user;
        querySnapshot.forEach(function (doc) {
          user = doc.data();
        });

        console.log(user, 'user ID to be added to project.users');
        firestore
          .collection('projects')
          .where('ID', '==', projectID)
          .get()
          .then((querySnapshot) => {
            let temp;
            querySnapshot.forEach(function (doc) {
              temp = doc.data();
              console.log(temp, 'project in which user ID to be added');
              temp.users.push(user.ID);
              firestore
                .collection('projects')
                .doc(doc.id)
                .update({ users: temp.users });
            });

            firestore
              .collection('users')
              .where('ID', '==', user.ID)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                  let _temp = doc.data();
                  console.log(_temp);
                  _temp.projects.push(temp.ID);
                  firestore
                    .collection('users')
                    .doc(doc.id)
                    .update({ projects: _temp.projects });
                });

                dispatch(getThisProject(projectID));
              });
            // dispatch(getThisProject(projectID));
          });
      }
    });
};
