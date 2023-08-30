import React from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';

const DayView = () => {

  const generateBlockSchedule = () => {
    const scheduleBlock = [
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1 PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
    ];

    const amBlock = scheduleBlock
      .filter((item) => item.split(' ')[1] === 'AM')
      .map((item) => item.split(' ')[0]);

    const pmBlock = scheduleBlock
      .filter((item) => item.split(' ')[1] === 'PM')
      .map((item) => item.split(' ')[0]);

    return {
      am: amBlock,
      pm: pmBlock,
    };
  };

  const blockSchedule = generateBlockSchedule();
  

  return (
    <main className={styles.dayViewContainer}>
      <div className={styles.AMDayScheduleContainer}>
        <p className={styles.AMDayScheduleHeaderText}>
          AM
        </p>
        <div className={styles.AMBlockContainer}>
          {blockSchedule.am.map((block) => {
            return <div className={styles.AMDayScheduleItem}>
            <p className={styles.AMDayScheduleText}>
              {block}
            </p>
            <div className={styles.AMDayScheduleBlock}>
              {/* Fill this with any data from API that fits the time slot */}
            </div>
          </div>
          })}
        </div>
      </div>
      <div className={styles.PMDayScheduleContainer}>
        <p className={styles.PMDayScheduleHeaderText}>
          PM
        </p>
        <div className={styles.PMBlockContainer}>
          {blockSchedule.pm.map((block) => {
            return <div className={styles.PMDayScheduleItem}>
            <p className={styles.PMDayScheduleText}>
              {block}
            </p>
            <div className={styles.PMDayScheduleBlock}>
              {/* Fill this with any data from API that fits the time slot */}
            </div>
          </div>
          })}
        </div>
      </div>
    </main>
  );
};

export default DayView;