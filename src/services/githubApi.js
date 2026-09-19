const BASE_URL = 'https://api.github.com/users';

export const fetchUserData = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/${username}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      } else if (response.status === 403) {
        throw new Error('API Rate Limit Exceeded');
      }
      throw new Error('An error occurred while fetching user data');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchUserRepos = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/${username}/repos?sort=updated&per_page=6`);
    if (!response.ok) {
      throw new Error('Could not fetch repositories');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
