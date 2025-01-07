/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const totalRatings = good + neutral + bad;
  const percentPositive = totalRatings ? (good / totalRatings) * 100 : 0;
  const averageRating = totalRatings ? (good - bad) / totalRatings : 0;

  if (totalRatings === 0) {
    return <p>No feedback given yet.</p>;
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total ratings" value={totalRatings} />
          <StatisticLine
            text="Average rating"
            value={averageRating.toFixed(2)}
          />
          <StatisticLine
            text="% positive ratings"
            value={percentPositive.toFixed(2) + "%"}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>

      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
