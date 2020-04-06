import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    definedRoles: [
      {
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
      {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        deleted: false,
        roleName: 'ADMINISTRATOR',
        projectRule: 'WRITE',
        rolesRule: 'WRITE',
        diaryRule: 'WRITE',
        documentationRule: 'WRITE',
        versionsRule: 'WRITE',
        signingRule: 'WRITE',
        admin: true,
        superAdmin: false,
      },
    ],
    roles: [
      {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        deleted: false,
        roleName: 'ADMINISTRATOR',
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

              if (index.length > 0) {
                toast.error('Email already Exists in pending Registrations!');
                return;
              } else {
                temp.pendingRegistrations.push(userEmail);
                firestore
                  .collection('projects')
                  .doc(doc.id)
                  .update({ pendingRegistrations: temp.pendingRegistrations })
                  .then(() =>
                    toast.warning(
                      'User not Found Added to Pending Registrations !'
                    )
                  );
              }
            });

            dispatch(getThisProject(projectID));
          });
      } else {
        let user;
        querySnapshot.forEach(function (doc) {
          user = doc.data();
        });

        firestore
          .collection('projects')
          .where('ID', '==', projectID)
          .get()
          .then((querySnapshot) => {
            let temp;

            querySnapshot.forEach(function (doc) {
              temp = doc.data();

              let index = temp.users.filter((u) => u === user.ID);

              if (index.length > 0) {
                toast.error('User already Exists!', {
                  delay: 1500,
                });
                return;
              }

              temp.users.push(user.ID);

              temp.roles.push({
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
                admin: true,
                superAdmin: false,
                userName: user.Name,
                userID: user.ID,
              });

              firestore
                .collection('projects')
                .doc(doc.id)
                .update({ users: temp.users, roles: temp.roles });
            });

            firestore
              .collection('users')
              .where('ID', '==', user.ID)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                  let _temp = doc.data();
                  let index = _temp.projects.filter(
                    (project) => project === temp.ID
                  );
                  console.log(_temp);
                  console.log(index);
                  if (index.length > 0) return;
                  _temp.projects.push(temp.ID);

                  firestore
                    .collection('users')
                    .doc(doc.id)
                    .update({ projects: _temp.projects })
                    .then(() => toast.success('User Added !', { delay: 1000 }));
                });
                dispatch(getThisProject(projectID));
              });
            // dispatch(getThisProject(projectID));
          });
      }
    });
};

export const handleRole = (newRole, projectID) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  console.log(newRole, projectID);
  const firestore = getFirestore();

  firestore
    .collection('projects')
    .where('ID', '==', projectID)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let temp = doc.data();
        let index = temp.definedRoles.filter(
          (role) => role.roleName === newRole.roleName
        );
        if (index.length > 0) {
          toast.error('Role with this Name already exists!', { delay: 2000 });
          return;
        }
        temp.definedRoles.push(newRole);
        firestore
          .collection('projects')
          .doc(doc.id)
          .update({ definedRoles: temp.definedRoles })
          .then(() => toast.success('Role Created !', { delay: 2000 }));
      });

      dispatch(getThisProject(projectID));
    });
};

export const handleUpdateRole = (updatedRole, projectID) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  dispatch({ type: 'P_LOADING' });
  console.log(updatedRole, projectID, 'update action');
  const firestore = getFirestore();

  firestore
    .collection('projects')
    .where('ID', '==', projectID)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let temp = doc.data();
        let newroles = temp.roles.map((role) => {
          if (role.roleName === updatedRole.roleName) {
            return {
              ...role,
              ...updatedRole,
            };
          } else return role;
        });

        let newdefinedRoles = temp.definedRoles.map((role) => {
          if (role.roleName === updatedRole.roleName) {
            return {
              ...updatedRole,
            };
          } else return role;
        });

        firestore
          .collection('projects')
          .doc(doc.id)
          .update({ roles: newroles, definedRoles: newdefinedRoles })
          .then(() => toast.success('Role Updated !', { delay: 1000 }));
      });
      dispatch(getThisProject(projectID));
    });
};
