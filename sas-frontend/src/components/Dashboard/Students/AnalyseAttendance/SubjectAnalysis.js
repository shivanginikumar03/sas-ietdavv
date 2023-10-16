import React from 'react';
import PieGraph from './PieGraph';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

function SubjectAnalysis(props) {
  return (
    <div className="flex flex-col justify-center items-center sm:flex-row">
      <CalendarHeatmap
        startDate={new Date('2023-08-01')}
        endDate={new Date('2024-03-01')}
        showWeekdayLabels={true}
        values={props.data}
        showOutOfRangeDays={true}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-${value.status}`;
        }}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': value.date
              ? `${value.date.substr(0, 10)}: ${value.status}`
              : 'No Class',
          };
        }}
      />
      <ReactTooltip />
      <PieGraph percentage={props.percentage} />
    </div>
  );
}

export default SubjectAnalysis;
