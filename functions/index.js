const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  //check if request made by an admin
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other admins." };
  }
  //get user and add custom claim(admin).
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
        powerUser: false
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin`
      };
    })
    .catch(err => {
      return err;
    });
});

exports.addPowerUserRole = functions.https.onCall((data, context) => {
  //check if request made by an admin
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other admins." };
  }
  //get user and add custom claim(poweruser).
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: false,
        powerUser: true
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made a powerUser`
      };
    })
    .catch(err => {
      return err;
    });
});

exports.addUserRole = functions.https.onCall((data, context) => {
  //check if request made by an admin
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other admins." };
  }
  //get user and add custom claim(user).
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: false,
        powerUser: false
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an User`
      };
    })
    .catch(err => {
      return err;
    });
});
