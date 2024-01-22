import axios from 'axios';
import { API_BASE_URL } from '@env';

export const updateUserName = async (authtoken, _id, role, name) => {
  return await axios.put(
    `${API_BASE_URL}/update-user-name`,
    { _id, role, name },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const awardXP = async (authtoken, _id, role, xp) => {
  return await axios.put(
    `${API_BASE_URL}/award-xp`,
    { _id, role, xp },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const badgeUnlocked = async (authtoken, _id, role, badge) => {
  return await axios.put(
    `${API_BASE_URL}/badge-unlocked`,
    { _id, role, badge },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const promoteUser = async (authtoken, _id, role, rank) => {
  return await axios.put(
    `${API_BASE_URL}/promote-user`,
    { _id, role, rank },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateTextSpeed = async (authtoken, _id, role, textSpeed) => {
  return await axios.put(
    `${API_BASE_URL}/update-text-speed`,
    { _id, role, textSpeed },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateViewedRovers = async (
  authtoken,
  _id,
  role,
  rover,
  camera,
  dateType
) => {
  return await axios.put(
    `${API_BASE_URL}/update-viewed-rovers`,
    { _id, role, rover, camera, dateType },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const checkTriviaAchievements = async (
  authtoken,
  _id,
  role,
  score,
  level,
  questionsAmount
) => {
  return await axios.put(
    `${API_BASE_URL}/check-trivia-achievements`,
    { _id, role, score, level, questionsAmount },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchThisUser = async (authtoken, role, userId) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-this-user`,
    { role, userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const followMember = async (authtoken, _id, role, userId) => {
  return await axios.put(
    `${API_BASE_URL}/follow-member`,
    { _id, role, userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const unfollowMember = async (authtoken, _id, role, userId) => {
  return await axios.put(
    `${API_BASE_URL}/unfollow-member`,
    { _id, role, userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getAllies = async (authtoken, userId, role) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-allies`,
    { userId, role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getExplorers = async (authtoken, role, userId) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-explorers`,
    { role, userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateProfileWithImage = async (
  authtoken,
  _id,
  role,
  name,
  bio,
  profileImage
) => {
  return await axios.put(
    `${API_BASE_URL}/update-profile-with-image`,
    { _id, role, name, bio, profileImage },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateProfile = async (authtoken, _id, role, name, bio) => {
  return await axios.put(
    `${API_BASE_URL}/update-profile`,
    { _id, role, name, bio },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchUsersAchievements = async (authtoken, _id, role) => {
  return await axios.post(
    `${API_BASE_URL}/users-achievements`,
    { _id, role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const blockMember = async (authtoken, _id, role, userId) => {
  return await axios.put(
    `${API_BASE_URL}/block-user`,
    { _id, role, userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const incrementNotifsCount = async (
  authtoken,
  _id,
  role,
  userId,
  message
) => {
  return await axios.put(
    `${API_BASE_URL}/increment-new-notifications-count`,
    { _id, role, userId, message },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const resetNotifsCount = async (authtoken, _id, role) => {
  return await axios.put(
    `${API_BASE_URL}/reset-new-notifications-count`,
    { _id, role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchUsersSignals = async (authtoken, _id, role) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-user-notifications`,
    { _id, role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const catchScore = async (authtoken, _id, role, score) => {
  return await axios.put(
    `${API_BASE_URL}/catch-score`,
    { _id, role, score },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const awardAchievement = async (authtoken, _id, role, achievement) => {
  return await axios.put(
    `${API_BASE_URL}/award-achievement`,
    { _id, role, achievement },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updatePlanetsViewed = async (authtoken, _id, role, name) => {
  return await axios.put(
    `${API_BASE_URL}/update-planets-viewed`,
    { _id, role, name },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateNumOfApods = async (authtoken, _id, role) => {
  return await axios.put(
    `${API_BASE_URL}/update-apods`,
    { _id, role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateNumOfAsteroids = async (authtoken, _id, role) => {
  return await axios.put(
    `${API_BASE_URL}/update-asteroids`,
    { _id, role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateNumOfFacts = async (authtoken, _id, role) => {
  return await axios.put(
    `${API_BASE_URL}/update-facts`,
    { _id, role },
    {
      headers: {
        authtoken,
      },
    }
  );
};
