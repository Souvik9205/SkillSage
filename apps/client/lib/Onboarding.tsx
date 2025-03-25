"use client";
import { getUserAction, onboardUserAction } from "@/_actions/userActions";
import React, { useEffect, useState } from "react";

const Onboarding = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(true);
  const [ageGroup, setAgeGroup] = useState("");
  const [experience, setExperience] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserAction();
      console.log("user", user);
      console.log(
        "user.data.onboardingResponses",
        user.data.onboardingResponses
      );
      if (user.status === 200 && user.data.user.onboardingResponses === null) {
        setIsOnboardingComplete(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log({ ageGroup, experience, purpose });
    const response = await onboardUserAction(ageGroup, experience, purpose);
    if (response.status === 200) {
      setIsOnboardingComplete(true);
    }
  };

  if (isOnboardingComplete) return null;

  return (
    <div className="onboarding-container">
      <h2>Welcome to Onboarding</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Age Group</legend>
          {Object.entries(AgeGroup).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                name="ageGroup"
                value={value}
                checked={ageGroup === value}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
              {key.replace(/_/g, " ")}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Experience</legend>
          {Object.entries(Experience).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                name="experience"
                value={value}
                checked={experience === value}
                onChange={(e) => setExperience(e.target.value)}
              />
              {key.replace(/_/g, " ")}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Purpose</legend>
          {Object.entries(Purpose).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                name="purpose"
                value={value}
                checked={purpose === value}
                onChange={(e) => setPurpose(e.target.value)}
              />
              {key.replace(/_/g, " ")}
            </label>
          ))}
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const AgeGroup = {
  UNDER_18: "UNDER_18",
  AGE_18_TO_25: "AGE_18_TO_25",
  AGE_25_TO_30: "AGE_25_TO_30",
  OVER_30: "OVER_30",
};

const Experience = {
  UNDER_1YR: "UNDER_1YR",
  BETWEEN_1_TO_2YR: "BETWEEN_1_TO_2YR",
  BETWEEN_3_TO_5YR: "BETWEEN_3_TO_5YR",
  OVER_5YR: "OVER_5YR",
};

const Purpose = {
  LEARNING: "LEARNING",
  NETWORKING: "NETWORKING",
  INTERVIEW: "INTERVIEW",
};

export default Onboarding;
