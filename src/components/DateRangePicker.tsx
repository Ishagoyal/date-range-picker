import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DateRangePickerProps {
  onChange: (range: [string, string], weekends: string[]) => void;
  predefinedRanges: { label: string; startDate: Date; endDate: Date }[];
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  predefinedRanges,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startMonth, setStartMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [endMonth, setEndMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 21 }, (_, i) => {
    const currentYear = new Date().getFullYear();
    return currentYear - 10 + i;
  });

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const days: Date[] = [];
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  const handleDateClick = (date: Date) => {
    if (isWeekend(date)) return;

    if (!startDate || (startDate && endDate)) {
      // If no startDate is set or both dates are selected, reset with the new startDate
      setStartDate(date);
      setEndDate(null);
    } else {
      // When selecting the endDate
      if (date < startDate) {
        // If the selected date is before startDate, swap the dates
        setStartDate(date);
        setEndDate(startDate);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleMonthChange = (calendar: "start" | "end", month: number) => {
    const setMonth = calendar === "start" ? setStartMonth : setEndMonth;
    const currentMonth = calendar === "start" ? startMonth : endMonth;
    setMonth(new Date(currentMonth.getFullYear(), month, 1));
  };

  const handleYearChange = (calendar: "start" | "end", year: number) => {
    const setMonth = calendar === "start" ? setStartMonth : setEndMonth;
    const currentMonth = calendar === "start" ? startMonth : endMonth;
    setMonth(new Date(year, currentMonth.getMonth(), 1));
  };

  const handleRangeSelect = (range: {
    label: string;
    startDate: Date;
    endDate: Date;
  }) => {
    if (range.startDate && range.endDate) {
      // Update both start and end month views to match the selected range
      setStartMonth(
        new Date(range.startDate.getFullYear(), range.startDate.getMonth(), 1)
      );
      setEndMonth(
        new Date(range.endDate.getFullYear(), range.endDate.getMonth(), 1)
      );

      // Update the selected dates
      setStartDate(range.startDate);
      setEndDate(range.endDate);
    }
  };

  const renderMonthAndYear = (currentMonth: Date, isStartCalendar: boolean) => {
    const calendar = isStartCalendar ? "start" : "end";
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() =>
            handleMonthChange(calendar, currentMonth.getMonth() - 1)
          }
        >
          {" "}
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          <select
            value={currentMonth.getMonth()}
            onChange={(e) =>
              handleMonthChange(calendar, parseInt(e.target.value))
            }
            className="px-2 py-1 border rounded text-sm"
          >
            {monthNames.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={currentMonth.getFullYear()}
            onChange={(e) =>
              handleYearChange(calendar, parseInt(e.target.value))
            }
            className="px-2 py-1 border rounded text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() =>
            handleMonthChange(calendar, currentMonth.getMonth() + 1)
          }
        >
          {" "}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const renderCalendar = (currentMonth: Date, isStartCalendar: boolean) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = getDaysInMonth(year, month);
    const firstDay = days[0].getDay();
    const blanks = Array(firstDay).fill(null);
    const allDays = [...blanks, ...days];
    return (
      <div className="flex flex-col">
        {renderMonthAndYear(currentMonth, isStartCalendar)}
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600 p-2"
            >
              {day}
            </div>
          ))}

          {allDays.map((date, index) => {
            if (!date) {
              return <div key={`blank-${index}`} className="p-2" />;
            }

            const isSelected =
              startDate &&
              ((endDate && date >= startDate && date <= endDate) || // Range is selected
                (!endDate && date.toDateString() === startDate.toDateString())); // Only startDate is selected
            const isWeekendDate = isWeekend(date);

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                disabled={isWeekendDate}
                className={`
                  p-2 rounded text-sm
                  ${
                    isWeekendDate
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-blue-50"
                  }
                  ${
                    isSelected && !isWeekendDate ? "bg-blue-500 text-white" : ""
                  }
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex gap-8 mb-4">
        {renderCalendar(startMonth, true)}
        {renderCalendar(endMonth, false)}
      </div>
      {predefinedRanges.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex gap-2 flex-wrap">
            {predefinedRanges.map((range, index) => (
              <button
                key={index}
                onClick={() => handleRangeSelect(range)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
