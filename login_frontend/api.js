import apiUrl from './config.js';

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/users/register`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        password,
      },
    });
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data || err.message };
  }
};

export const signin = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/users/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data || err.message };
  }
};