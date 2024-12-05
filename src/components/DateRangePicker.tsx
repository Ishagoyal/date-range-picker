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
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
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
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
        setEndDate(startDate);
      } else {
        setEndDate(date);
      }
    }
  };

  const renderMonthAndYear = (currentMonth: Date, isStartCalender: boolean) => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button className="p-1 hover:bg-gray-100 rounded">
          {" "}
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          <select>
            {monthNames.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
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
              startDate && endDate && date >= startDate && date <= endDate;
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
    </div>
  );
};

export default DateRangePicker;
