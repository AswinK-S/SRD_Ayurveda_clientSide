import  { useState } from 'react';

const DocAddSlot = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const createSlot = () => {
    // Implement your logic for creating a slot here
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
  };

  return (
    <div className="w-full md:w-1/2  lg:w-1/3 mx-auto  ">
      <div className="mb-4">
        <label htmlFor="startDate" className="block font-medium mb-2">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block font-medium mb-2">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startTime" className="block font-medium mb-2">
          Start Time:
        </label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={handleStartTimeChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endTime" className="block font-medium mb-2">
          End Time:
        </label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={handleEndTimeChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        onClick={createSlot}
        className="bg-[#d3dd64] px-4 py-2 rounded-lg shadow-md shadow-gray-700 hover:bg-[#dee870] "
      >
        Create Slot
      </button>
    </div>
  );
};

export default DocAddSlot;