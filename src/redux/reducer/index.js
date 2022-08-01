const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER":
      localStorage.setItem("auth", JSON.stringify(payload));
      return {
        ...state,
        auth: payload,
      };
    case "SET_AUTH":
      return {
        ...state,
        auth: payload,
      };
    case "LOGOUT_USER":
      localStorage.removeItem("auth");
      return {
        ...state,
        auth: {
          token: null,
          user: null,
        },
      };
    default:
      return state;
  }
};

export default reducer;
