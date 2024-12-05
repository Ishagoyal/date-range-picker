export interface DateRangePickerProps {
  onChange: (range: [string, string], weekends: string[]) => void;
  predefinedRanges: { label: string; startDate: Date; endDate: Date }[];
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  predefinedRanges,
}) => {
  return <div></div>;
};

export default DateRangePicker;
