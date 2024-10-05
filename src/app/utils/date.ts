export function daysLeft(targetDate: Date) {
  // Get the current date and time
  const currentDate = new Date();

  // Convert the target date to a Date object
  const targetDateObj = new Date(targetDate);

  // Calculate the difference in milliseconds
  const millisecondsDifference =
    targetDateObj.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const daysDifference = millisecondsDifference / (1000 * 60 * 60 * 24);

  // Round down to the nearest whole number of days
  const daysLeft = Math.floor(daysDifference);

  return daysLeft;
}
