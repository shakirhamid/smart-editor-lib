import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: string;
}

const sampleEvents: CalendarEvent[] = [
  { id: "1", title: "Team standup", date: new Date(2025, 11, 23), color: "bg-blue-500" },
  { id: "2", title: "Project review", date: new Date(2025, 11, 24), color: "bg-green-500" },
  { id: "3", title: "Design sync", date: new Date(2025, 11, 21), color: "bg-purple-500" },
  { id: "4", title: "Launch day", date: new Date(2025, 11, 25), color: "bg-orange-500" },
  { id: "5", title: "Sprint planning", date: new Date(2025, 11, 26), color: "bg-pink-500" },
];

export const NotionCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events] = useState<CalendarEvent[]>(sampleEvents);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex-1 h-screen overflow-hidden bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">📅</span>
            <h1 className="text-2xl font-semibold text-foreground">Calendar</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              New event
            </button>
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium text-foreground">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Today
            </button>
            <button
              onClick={prevMonth}
              className="p-1.5 hover:bg-accent rounded-md transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 hover:bg-accent rounded-md transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto p-6">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((weekDay) => (
            <div
              key={weekDay}
              className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider py-2"
            >
              {weekDay}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 border-l border-t border-border">
          {days.map((dayDate, index) => {
            const dayEvents = getEventsForDay(dayDate);
            const isCurrentMonth = isSameMonth(dayDate, currentMonth);
            const isSelected = selectedDate && isSameDay(dayDate, selectedDate);
            const isTodayDate = isToday(dayDate);

            return (
              <div
                key={index}
                onClick={() => setSelectedDate(dayDate)}
                className={`min-h-[100px] p-2 border-r border-b border-border cursor-pointer transition-colors ${
                  isSelected ? "bg-accent" : "hover:bg-accent/50"
                } ${!isCurrentMonth ? "bg-muted/30" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                      isTodayDate
                        ? "bg-primary text-primary-foreground"
                        : isCurrentMonth
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {format(dayDate, "d")}
                  </span>
                  {dayEvents.length > 0 && (
                    <button className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-background rounded">
                      <Plus className="h-3 w-3 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs px-1.5 py-0.5 rounded text-white truncate ${event.color}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground px-1.5">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
