import axios from "axios";

const apiURL = process.env.REACT_APP_BASE_URL
// .trim();
export const login = async (
  email,
  password,
  setUser,
  setLoading,
  setIsAuthenticated,
  setError
) => {
  try {
    console.log(apiURL);
    setLoading(true);
    setIsAuthenticated(false);
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${apiURL}/api/v1/login`,
      { email, password },
      config
    );
    console.log(data);
    setLoading(false);
    setIsAuthenticated(true);
    setUser(data.user);
    //   dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    setLoading(false);
    setIsAuthenticated(false);
    setUser({ name: "", email: "", password: "" });
    setError(error?.response?.data?.message);
    //   dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Load User
export const loadUser = async (
  setLoading,
  setIsAuthenticated,
  setUser,
  setError
) => {
  try {
    //   dispatch({ type: LOAD_USER_REQUEST });
    setLoading(true);
    setIsAuthenticated(false);

    const { data } = await axios.get(`${apiURL}/api/v1/me`);

    //   dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    setLoading(false);
    setIsAuthenticated(true);
    setUser(data.user);
  } catch (error) {
    setLoading(false);
    setIsAuthenticated(false);
    setUser({ name: "", email: "", password: "" });
    setError(error?.response?.data?.message);
    //   dispatch({ type: LOAD_USER_FAIL, payload: error?.response?.data?.message });
  }
};

// Register
export const register = async (
  userData,
  setLoading,
  setIsAuthenticated,
  setUser,
  setError
) => {
  try {
    // dispatch({ type: REGISTER_USER_REQUEST });
    setLoading(true);
    setIsAuthenticated(false);
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${apiURL}/api/v1/register`,
      userData,
      config
    );
    setLoading(false);
    setUser(data.user)
    setIsAuthenticated(true);
    //   dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    //   dispatch({
    //     type: REGISTER_USER_FAIL,
    //     payload: error.response.data.message,
    //   });
    setLoading(false);
    setIsAuthenticated(false);
    setUser({ name: "", email: "", password: "" });
    setError(error?.response?.data?.message);
  }
};

// Logout User
export const logout = async (
  setLoading,
  setIsAuthenticated,
  setUser,
  setError
) => {
  try {
    await axios.get(`${apiURL}/api/v1/logout`);

    //   dispatch({ type: LOGOUT_SUCCESS });
    setLoading(false);
    setIsAuthenticated(false);
    setUser({ name: "", email: "", password: "" });
  } catch (error) {
    setError(error?.response?.data?.message);
  }
};
