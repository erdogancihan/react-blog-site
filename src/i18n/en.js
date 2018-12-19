export default {
  common: {
    delete: "Delete",
    send: "Send",
    edit: "Edit",
    save: "Save"
  },
  auth: {
    signupToOurBlog: "SIGNUP TO OUR BLOG",
    loginToOurblog: "LOGIN TO OUR BLOG",
    changePassword: "CHANGE PASSWORD",
    emailAddress: "Email Adress",
    password: "Password",
    passwordRe: "Retype Password",
    oldPassword: "Old Password",
    newpassword: "New Password",
    newpasswordRe: "Retype New Password",
    nameAndLastName: "Name and Lastname",
    signup: "SignUp",
    change: "Change",
    passwordChanged: "Your password has changed successfully.",
    passwordChangeError:
      "There is an error. Your password hasn't been changed.",
    allreadyMember: "Are you allready a member?",
    notMember: "Haven't signed up yet?",
    login: "Login",
    placeHolders: {
      enterEmail: "Enter Your Email Address",
      enterPassword: "Enter Your Password",
      nameAndLastName: "Name and Lastname",
      password: "Password",
      passwordRe: "Retype Password"
    },
    signUpSuccess:
      "You have successfully signed up. Please check your mailbox and confirm your email adress to login.",
    signUpError: "There is an error. Please try again later.",
    resetPasswordForm: "RESET YOUR PASSWORD",
    resetPasswordText: "Reset your password.",
    resetPassword: "Reset",
    resetPasswordDescription:
      "A link will be sent to your email address to reset your password.",
    resetPasswordSuccess:
      "An email has been sent to reset your password. Please check your mailbox.",
    resetSuccessMessage:
      "Your password has changed successfully. Please login.",
    passwordsNotMatch:
      "Passwords you entered do not match. Please type your password again",
    userAgreement:
      "By clicking Signup, you agree to Terms and Conditions.",
    
  },
  navbar: {
    about: "About",
    terms: "Terms",
    login: "Login",
    categories: "Categories",
    logout: "Logout",
    addArticle: "Add Article"
  },
  articles: {
    readMore: "Read More",
    writtenby: "written by"
  },
  addArticle: {
    addOrEditArticle: "ADD / EDIT ARTICLE",
    title: "Title",
    description:
      "Description (In order to make your article visible in Google you should write a description. Description must include the article title and must not exceed 150 chars.)",
    category: "Category",
    keyWords: "Keywords",
    language: "Language",
    select: "select"
  },
  messages: {
    messages: "MESSAGES",
    writeMessage: "Write a Message"
  },
  sidebar: {
    lastArticles: "Last Articles",
    archive: "Archieve",
    categories: "Categories"
  },
  errorMessage:{
    defaultMessage:"There is an error",
    invalidEmail:"Provided email address is not valid.",
    invalidPassword:"Provided password is invalid. It must be at least six characters.",
    maximumUserCountExceeded:"The maximum allowed number of users to import is exceeded.",
    emailAlreadyExists:"The provided email is already in use by an existing user. Each user must have a unique email.",
    userNotFound:"There is no existing user record corresponding to the provided identifier.",
    internalError:"The Authentication server encountered an unexpected error",
    authNetworkRequestFailed:"A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
    wrongPassword:"The password is invalid or the user does not have a password.",
    emailAlreadyInUse:"The email address is already in use by another account.",
    weakPassword:"Password should be at least 6 characters",
    emailNotVerified:"Your Email Address is not verified. Please check your mailbox and verify your email address." 
  }
};
