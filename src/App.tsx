import "./App.css";
import DateRangePicker from "./components/DateRangePicker";

function App() {
  const predefinedRanges = [
    {
      label: "Last 7 days",
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date(),
    },
    {
      label: "Last 30 days",
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
    },
  ];

  const handleDateRangeChange = (dateRange: [Date, Date], weekends: Date[]) => {
    console.log("Selected range:", dateRange);
    console.log("Weekend dates in range:", weekends);
  };

  return (
    <div className="p-8 grid gap-4 justify-center">
      <div className="text-center">Date Range Picker</div>
      <DateRangePicker
        onChange={handleDateRangeChange}
        predefinedRanges={predefinedRanges}
      />
    </div>
  );
}

export default App;
