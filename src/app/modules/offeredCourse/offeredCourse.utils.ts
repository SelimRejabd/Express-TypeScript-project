import { TSchedule } from "./offeredCourse.interface";

export const hasTimeConflict = (
  asssignedSchedules: TSchedule[],
  newSchedule: TSchedule
) => {
  for (const schedule of asssignedSchedules) {
    const existingStartTime = new Date(`2000-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`2000-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`2000-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`2000-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
