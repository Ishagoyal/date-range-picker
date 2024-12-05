import "./App.css";
import DateRangePicker from "./components/DateRangePicker";

function App() {
  const handleRangeChange = (range: [string, string], weekends: string[]) => {};
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
  return (
    <div className="p-8 grid gap-4 justify-center">
      <div className="text-center">Date Range Picker</div>
      <DateRangePicker
        onChange={handleRangeChange}
        predefinedRanges={predefinedRanges}
      />
    </div>
  );
}

export default App;
