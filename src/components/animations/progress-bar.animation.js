import { useState, useEffect } from 'react';
import ProgressBar from 'react-native-progress/Bar';

export const AnimatedProgressBar = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [progressActive, setProgressActive] = useState(false);

  useEffect(() => {
    let progressInterval;

    if (isLoading) {
      setProgressActive(true);
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 0.01;
          return newProgress >= 0.9 ? 0.9 : newProgress;
        });
      }, 100);
    } else {
      clearInterval(progressInterval);
      setProgress(1);

      setTimeout(() => {
        setProgressActive(false);
        setProgress(0);
      }, 1000);
    }

    return () => clearInterval(progressInterval);
  }, [isLoading]);

  return (
    <>
      {progressActive && (
        <ProgressBar
          progress={progress}
          width={null}
          color={'#009999'}
          style={{ marginBottom: 10 }}
        />
      )}
    </>
  );
};
