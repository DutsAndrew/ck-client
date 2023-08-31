import React from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';

const DayView = () => {

  const getTodaysDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    console.log(formattedDate);
    return formattedDate;
  }

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

  const todaysDate = getTodaysDate();
  console.log(todaysDate)
  const blockSchedule = generateBlockSchedule();

  return (
    <main className={styles.dayViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{todaysDate}</strong>
      </p>
      <h2 className={styles.dayViewHeaderText}>
        Day View
      </h2>
      <div className={styles.dayViewItemsContainer}>
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
                This is some boiler text to test this thing.
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
                This is some boiler text to test this thing.
              </div>
            </div>
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DayView;