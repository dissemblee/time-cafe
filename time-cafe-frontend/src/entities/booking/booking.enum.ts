export enum BookingStatus {
  Active = "active",
  Cancelled = "cancelled",
  Completed = "completed",
}

export const statusMap: Record<BookingStatus, { label: string; style: React.CSSProperties }> = {
  [BookingStatus.Active]: { label: "Активно", style: { backgroundColor: "#d0ebff", color: "#1c7ed6" } },
  [BookingStatus.Cancelled]: { label: "Отменено", style: { backgroundColor: "#ffe3e3", color: "#c92a2a" } },
  [BookingStatus.Completed]: { label: "Завершено", style: { backgroundColor: "#d3f9d8", color: "#2f9e44" } },
};

export const getStatusLabel = (status: BookingStatus) => statusMap[status]?.label || "Не указан";
export const getStatusStyle = (status: BookingStatus) => statusMap[status]?.style || {};
