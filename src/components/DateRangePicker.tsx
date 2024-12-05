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

  const renderMonthAndYear = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button>
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
        <button>
          {" "}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };
  const renderCalender = () => {
    return <div>{renderMonthAndYear()}</div>;
  };

  return <div>{renderCalender()}</div>;
};

export default DateRangePicker;
