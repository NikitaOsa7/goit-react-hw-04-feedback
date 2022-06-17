import { useState } from 'react';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions'
import Statistics from './components/Statistics/Statistics'
import Notification from './components/Notifications/Notifications'
import Section from './components/Section/Section'

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const buttons = ['good', 'neutral', 'bad'];
  const total = good + neutral + bad;

  const countPositivePercentage = () => {
    return Math.round((good / (good + neutral + bad)) * 100)
  };

  const onFeedbackLeave = evt => {
    evt.preventDefault();
    const element = evt.target.innerText.toLowerCase();
    switch (element) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      
      default:
        return;
    }
  };

  return (
    <Section title="Please leave feedback">
      <FeedbackOptions options={buttons} onFeedbackLeave={onFeedbackLeave} />
      <h2>Statistics</h2>
      {total ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={countPositivePercentage()}
        />
      ) : (
        <Notification
          message="There is no feedback yet..."
          text={'There is no feedback yet...'}
        />
      )}
    </Section>
  );
}
