import React, { FC } from "react";
import styles from '../../styles/components/Calendar/calendar.module.css';
import { dayViewProps } from "../../types/interfaces";

const DayView:FC<dayViewProps> = (props): JSX.Element => {

  const { currentDay } = props;

  const generateBlockSchedule = () => {
    const scheduleBlock = [
      "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
      "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM",
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
    <section className={styles.dayViewContainer}>
      <p className={styles.currentDateText}>
        <strong>{currentDay}</strong>
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
              return <div
                className={styles.AMDayScheduleItem}
                key={block}
              >
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
              return <div
                className={styles.PMDayScheduleItem}
                key={block}
              >
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
    </section>
  );
};

export default DayView;