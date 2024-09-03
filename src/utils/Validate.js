export const checkValidData = (email, password) => {
  const Email = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const Password =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  // const Name = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

  // if (!Name) {
  //   return "Please Enter Valid Name";
  // }
  if (!Email) {
    return "Email is not valid";
  }
  if (!Password) {
    return "Password is not valid";
  }
  return null;
};
