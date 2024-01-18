import axios from 'axios';
import { API_BASE_URL } from '@env';

export const updateUserName = async (authtoken, _id, name) => {
  return await axios.put(
    `${API_BASE_URL}/update-user-name`,
    { _id, name },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const awardXP = async (authtoken, _id, xp) => {
  return await axios.put(
    `${API_BASE_URL}/award-xp`,
    { _id, xp },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const badgeUnlocked = async (authtoken, _id, badge) => {
  return await axios.put(
    `${API_BASE_URL}/badge-unlocked`,
    { _id, badge },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const promoteUser = async (authtoken, _id, rank) => {
  return await axios.put(
    `${API_BASE_URL}/promote-user`,
    { _id, rank },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateTextSpeed = async (authtoken, _id, textSpeed) => {
  return await axios.put(
    `${API_BASE_URL}/update-text-speed`,
    { _id, textSpeed },
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
  rover,
  camera,
  dateType
) => {
  return await axios.put(
    `${API_BASE_URL}/update-viewed-rovers`,
    { _id, rover, camera, dateType },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateGuestViewedRovers = async (user) => {
  const allRovers = ['curiosity', 'opportunity', 'perseverance', 'spirit'];
  const allCameras = [
    'FHAZ',
    'RHAZ',
    'MAST',
    'CHEMCAM',
    'MAHLI',
    'MARDI',
    'NAVCAM',
    'PANCAM',
    'MINITES',
    'EDL_RUCAM',
    'EDL_RDCAM',
    'EDL_DDCAM',
    'EDL_PUCAM1',
    'EDL_PUCAM2',
    'NAVCAM_LEFT',
    'NAVCAM_RIGHT',
    'MCZ_RIGHT',
    'MCZ_LEFT',
    'FRONT_HAZCAM_LEFT_A',
    'FRONT_HAZCAM_RIGHT_A',
    'REAR_HAZCAM_LEFT',
    'REAR_HAZCAM_RIGHT',
    'SKYCAM',
    'SHERLOC_WATSON',
  ];
  const allDateTypes = ['sol', 'earth_date'];

  const isFirstRover = !user || !user.viewedRovers || !user.viewedRovers.length;
  const hasViewedAllRovers =
    user &&
    user.viewedRovers &&
    allRovers.every((rover) => user.viewedRovers.includes(rover));
  const hasViewedAllCameras =
    user &&
    user.viewedRoverCameras &&
    allCameras.every((camera) => user.viewedRoverCameras.includes(camera));
  const hasViewedAllDateTypes =
    user &&
    user.viewedRoverDateTypes &&
    allDateTypes.every((dateType) =>
      user.viewedRoverDateTypes.includes(dateType)
    );

  let achievements = [];

  if (isFirstRover && user.achievedRedPlanetVoyager !== true) {
    achievements.push('MarsRoverOneComplete');
  }
  if (hasViewedAllRovers && user.achievedMarsRoverMaestro !== true) {
    achievements.push('MarsRoverAllComplete');
  }
  if (hasViewedAllCameras && user.achievedMartianLensMaster !== true) {
    achievements.push('MarsRoverAllCamerasComplete');
  }
  if (hasViewedAllDateTypes && user.achievedCosmicChronologist !== true) {
    achievements.push('MarsRoverAllDateTypesComplete');
  }

  return achievements;
};

export const checkTriviaAchievements = async (
  authtoken,
  _id,
  score,
  level,
  questionsAmount
) => {
  return await axios.put(
    `${API_BASE_URL}/check-trivia-achievements`,
    { _id, score, level, questionsAmount },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const checkGuestTriviaAchievements = async (
  user,
  score,
  level,
  questionsAmount
) => {
  const maxPossibleScore = questionsAmount * 10;
  const scorePercentage = (score / maxPossibleScore) * 100;

  const achievements = [];

  if (scorePercentage > 50) {
    if (level === 'easy' && !user.achievedCosmicCadet) {
      achievements.push('TriviaEasyScoreOver50');
    } else if (level === 'medium' && !user.achievedStarNavigator) {
      achievements.push('TriviaMediumScoreOver50');
    } else if (level === 'hard' && !user.achievedGalacticSage) {
      achievements.push('TriviaHardScoreOver50');
    }
  }

  if (score === maxPossibleScore) {
    if (level === 'easy' && !user.achievedNovaScholar) {
      achievements.push('TriviaPerfectEasy');
    } else if (level === 'medium' && !user.achievedQuasarVirtuoso) {
      achievements.push('TriviaPerfectMedium');
    } else if (level === 'hard' && !user.achievedSupernovaSavant) {
      achievements.push('TriviaPerfectHard');
    }
  }

  if (questionsAmount === 10 && !user.achievedLightSpeedExplorer) {
    achievements.push('TriviaComplete10Question');
  } else if (questionsAmount === 20 && !user.achievedOdysseyTrailblazer) {
    achievements.push('TriviaComplete20Question');
  } else if (questionsAmount === 30 && !user.achievedInfinityVoyager) {
    achievements.push('TriviaComplete30Question');
  }

  return achievements;
};

export const fetchThisUser = async (authtoken, userId) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-this-user`,
    { userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const followMember = async (authtoken, _id, userId) => {
  return await axios.put(
    `${API_BASE_URL}/follow-member`,
    { _id, userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const unfollowMember = async (authtoken, _id, userId) => {
  return await axios.put(
    `${API_BASE_URL}/unfollow-member`,
    { _id, userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getAllies = async (authtoken, userId) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-allies`,
    { userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getExplorers = async (authtoken, userId) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-explorers`,
    { userId },
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
  name,
  bio,
  profileImage
) => {
  return await axios.put(
    `${API_BASE_URL}/update-profile-with-image`,
    { _id, name, bio, profileImage },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateProfile = async (authtoken, _id, name, bio) => {
  return await axios.put(
    `${API_BASE_URL}/update-profile`,
    { _id, name, bio },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchUsersAchievements = async (authtoken, _id) => {
  return await axios.post(
    `${API_BASE_URL}/users-achievements`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const blockMember = async (authtoken, _id, userId) => {
  return await axios.put(
    `${API_BASE_URL}/block-user`,
    { _id, userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const incrementNotifsCount = async (authtoken, _id, userId, message) => {
  return await axios.put(
    `${API_BASE_URL}/increment-new-notifications-count`,
    { _id, userId, message },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const resetNotifsCount = async (authtoken, _id) => {
  return await axios.put(
    `${API_BASE_URL}/reset-new-notifications-count`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchUsersSignals = async (authtoken, _id) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-user-notifications`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const catchScore = async (authtoken, _id, score) => {
  return await axios.put(
    `${API_BASE_URL}/catch-score`,
    { _id, score },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const awardAchievement = async (authtoken, _id, achievement) => {
  return await axios.put(
    `${API_BASE_URL}/award-achievement`,
    { _id, achievement },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updatePlanetsViewed = async (authtoken, _id, name) => {
  return await axios.put(
    `${API_BASE_URL}/update-planets-viewed`,
    { _id, name },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateNumOfApods = async (authtoken, _id) => {
  return await axios.put(
    `${API_BASE_URL}/update-apods`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateNumOfAsteroids = async (authtoken, _id) => {
  return await axios.put(
    `${API_BASE_URL}/update-asteroids`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateNumOfFacts = async (authtoken, _id) => {
  return await axios.put(
    `${API_BASE_URL}/update-facts`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};
