import React, { useState, useEffect } from "react";

const COLORS = {
  gray: "text-[#A5A5A5]",
};

const RulesnRewards = ({ rulesNRewards, setRulesNRewards }) => {
  const [rewardType, setRewardType] = useState("");
  const [positionsCount, setPositionsCount] = useState(0);

  const handleRulesNRewards = (property, value) => {
    setRulesNRewards((prevRulesNRewards) => ({
      ...prevRulesNRewards,
      [property]: value,
    }));
  };

  const handleParticipationCriteria = (value) => {
    setRewardType(value);
    if (value === "Participant") {
      setRulesNRewards((prevRulesNRewards) => ({
        ...prevRulesNRewards,
        participationRewards: !prevRulesNRewards.participationRewards,
      }));
    } else if (value === "Winner") {
      setRulesNRewards((prevRulesNRewards) => ({
        ...prevRulesNRewards,
        winnerRewards: !prevRulesNRewards.winnerRewards,
      }));
    }
  };

  function getOrdinalSuffix(number) {
    const lastDigit = number % 10;
    const secondLastDigit = Math.floor((number % 100) / 10);
    if (secondLastDigit === 1) {
      return "th";
    }
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function getPositionName(index) {
    const name =
      index === 0
        ? "First"
        : index === 1
        ? "Second"
        : index === 2
        ? "Third"
        : index === 3
        ? "Fourth"
        : index === 5
        ? "Fifth"
        : `${index + 1}${getOrdinalSuffix(index + 1)} Position`;

    return name;
  }

  
  useEffect(() => {
    console.log(positionsCount);
  });

  return (
    <div>
      <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md">
        <div className="grid items-center gap-40 md:grid-cols-[1fr_2fr]">
          {/* col 1 */}
          <div>
            <p className="text-18px font-bold text-text-black">
              Select Points Criteria
            </p>
          </div>

          {/* col 2 */}
          <div className="flex gap-2">
            <button
              onClick={() => handleParticipationCriteria("Participant")}
              className={
                rulesNRewards.participationRewards
                  ? "rounded-md border border-[#5486E3] bg-[#5486E3] px-5 py-1 text-white"
                  : "rounded-md border border-[#5486E3] px-5 py-1 text-[#5486E3]"
              }
            >
              Particpation Points
            </button>
            <button
              onClick={() => handleParticipationCriteria("Winner")}
              className={
                rulesNRewards.winnerRewards
                  ? "rounded-md border border-[#5486E3] bg-[#5486E3] px-5 py-1 text-white"
                  : "rounded-md border border-[#5486E3] px-5 py-1 text-[#5486E3]"
              }
            >
              Winner Points
            </button>
          </div>
        </div>

        {rewardType != "" && <hr className="border-px my-6 border-400" />}

        {rulesNRewards.participationRewards && (
          <div className="grid items-center gap-40 md:grid-cols-[1fr_2fr] mt-10">
            {/* col 1 */}
            <div>
              <p className="text-18px font-bold text-text-black">
                Select Points Receivers
              </p>
            </div>

            {/* col 2 */}
            <div className="flex flex-col  gap-10">
              <div className="flex gap-8">
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={rulesNRewards.pointReceivers === "all"}
                    onChange={() => handleRulesNRewards("pointReceivers", ("all"))}
                    className="h-6 w-6"
                  />
                  All Participants
                </label>
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={rulesNRewards.pointReceivers === "few"}
                    onChange={() => handleRulesNRewards("pointReceivers", ("few"))}
                    className="h-6 w-6"
                  />
                  Few Participants
                </label>
              </div>
              {rulesNRewards.pointReceivers === "all" && (
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    className="w-20 rounded border-[1px] border-[#909090] p-1"
                    onChange={(event) =>
                      handleRulesNRewards(
                        "allParticipationPoints",
                        Number(event.target.value)
                      )
                    }
                    value={rulesNRewards.allParticipationPoints}
                  /> 
                  <span>Points to be given</span>
                </div>
              )}
              {rulesNRewards.pointReceivers === "few" && (
                <div className="flex items-center gap-2">
                  <span>First</span>
                  <input
                    type="number"
                    className="w-16 rounded border-[1px] border-[#909090] p-1"
                    onChange={(event) =>
                      handleRulesNRewards("units", event.target.value)
                    }
                    value={rulesNRewards.units} 
                  />
                  <span>Participants will get points</span>
                  <input
                    type="number"
                    className="w-16 rounded border-[1px] border-[#909090] p-1"
                    onChange={(event) =>
                      handleRulesNRewards("unitPoints", event.target.value)
                    }
                    value={rulesNRewards.unitPoints}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {rulesNRewards.winnerRewards && (
          <hr className="border-px my-6 border-400" />
        )}

        {rulesNRewards.winnerRewards && (
          <div className="grid items-center  gap-40 md:grid-cols-[1fr_2fr]">
            {/* col 1 */}
            <div>
              <p className="text-18px font-bold text-text-black">Assign Rule</p>
            </div>

            {/* col 2 */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-8">
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={rulesNRewards.assignRule === "now"}
                    onChange={() => handleRulesNRewards("assignRule", ("now"))}
                    className="h-6 w-6"
                  />
                  Now
                </label>
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={rulesNRewards.assignRule === "later"}
                    onChange={() => handleRulesNRewards("assignRule", ("later"))}
                    className="h-6 w-6"
                  />
                  Later
                </label>
              </div>
            </div>
          </div>
        )}

        {rulesNRewards.assignRule === "now" && rulesNRewards.winnerRewards && (
          <div className="mt-10 grid items-center gap-40 md:grid-cols-[1fr_2fr]">
            {/* col 1 */}
            <div>
              <p className="text-18px font-bold text-text-black">
                Assign Points
              </p>
            </div>

            {/* col 2 */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-8">
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={rulesNRewards.assignPoints === "equal"}
                    onChange={() => handleRulesNRewards("assignPoints", ("equal"))}
                    className="h-6 w-6"
                  />
                  Equal Points
                </label>
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={rulesNRewards.assignPoints === "positionBased"}
                    onChange={() => handleRulesNRewards("assignPoints", ("positionBased"))}
                    className="h-6 w-6"
                  />
                  Position Based
                </label>
              </div>
              {rulesNRewards.assignPoints === "equal" && (
                <div className="flex flex-col justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <span>How many winners?</span>
                    <input
                      type="number"
                      className="w-20 rounded border-[1px] border-[#909090] p-1"
                      onChange={(event) =>
                        handleRulesNRewards(
                          "numberOfWinners",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <span>Points to be given?</span>
                    <input
                      type="number"
                      className="w-20 rounded border-[1px] border-[#909090] p-1"
                      onChange={(event) =>
                        handleRulesNRewards(
                          "allWinnerPoints",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {rulesNRewards.assignPoints === "positionBased" && (
                <div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span>First</span>
                      <input
                        type="number"
                        max="10"
                        className="w-20 rounded border-[1px] border-[#909090] p-1"
                        onChange={(event) =>
                          setPositionsCount(event.target.value)
                        }
                      />
                      <span>Positions</span>
                    </div>
                    {positionsCount > 0 && (
                      <div className="flex flex-col gap-4">
                        {Array.from({ length: positionsCount }, (_, index) => {
                          const newWinnerPositions = [
                            ...rulesNRewards.winnerPositions,
                          ];

                          if (!newWinnerPositions[index]) {
                            newWinnerPositions[index] = {
                              position_name: getPositionName(index),
                              position: index + 1,
                              points: "",
                            };
                          }
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-4"
                            >
                              <span>
                                {index + 1}
                                {getOrdinalSuffix(index + 1)} Position
                              </span>
                              <input
                                type="number"
                                className="w-20 rounded border-[1px] border-[#909090] p-1"
                                value={newWinnerPositions[index].points}
                                onChange={(event) => {
                                  newWinnerPositions[index].position_name =
                                    getPositionName(index);
                                  newWinnerPositions[index].position =
                                    index + 1;
                                  newWinnerPositions[index].points = Number(
                                    event.target.value
                                  );
                                  setRulesNRewards((prev) => ({
                                    ...prev,
                                    winnerPositions: newWinnerPositions,
                                  }));
                                }}
                              />
                              <span>Points</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RulesnRewards;
