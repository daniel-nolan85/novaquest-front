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
    'fhaz',
    'rhaz',
    'mast',
    'chemcam',
    'mahli',
    'mardi',
    'navcam',
    'pancam',
    'minites',
    'edl_rucam',
    'edl_rdcam',
    'edl_ddcam',
    'edl_pucam1',
    'edl_pucam2',
    'navcam_left',
    'navcam_right',
    'mcz_left',
    'mcz_right',
    'front_hazcam_left_a',
    'front_hazcam_right_a',
    'rear_hazcam_left',
    'rear_hazcam_right',
    'skycam',
    'sherloc_watson',
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
