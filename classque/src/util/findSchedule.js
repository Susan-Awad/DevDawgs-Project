export const bestSchedule = (item) => {
    const start = new Date(item.start);
    const days = item.duration * 7;

    // Sorts items based on point priority
    item.tasks.sort((a,b) => Number(b.points) - Number(a.points));
    
    // Determines how many days between start and end dtates, placing
    // it within the item
    let tasksWithDates = item.tasks.map(task => {
        const startDate = start.getDate()
        const endDate = Number(task.dueDate.toString().substring(8,10));
        const endMonth = Number(task.dueDate.toString().substring(6,7));
        const startMonth = start.getMonth() + 1

        let daysTillDue = 0

        // Accounts for tasks in different months
        if (startMonth == endMonth) {
            daysTillDue = (endDate - startDate)
        } else {
            const daysInMonth = new Date(start.getFullYear(), startMonth, 0).getDate()
            console.log(daysInMonth)
            daysTillDue = (daysInMonth - startDate) + endDate

        }
        return {
            ...task,
            date: daysTillDue,
            inTimeSlot: false
        };
    })

    // Job scheduling algorithm that determines optimal date to complete
    // Create an array of arrays to have multiple tasks due on a single day
    const timeSlot = Array.from({length: days}, () => []);
    for (let i = 0; i < tasksWithDates.length; i++) {
        let start = tasksWithDates[i].date;
        for (let j = start; j >= 0; j--) {
            if (j >= 0 && j < timeSlot.length && timeSlot[j].length === 0) {
                timeSlot[j].push(tasksWithDates[i]);
                tasksWithDates[i].date = j
                tasksWithDates[i].inTimeSlot = true
                break;
            }
        }
    }

    // If item is still not in the array due to lack of space, place it in
    // the date its due
    for (let i = 0; i < tasksWithDates.length; i++) {
        if (!tasksWithDates[i].inTimeSlot) {
            const index = tasksWithDates[i].date
            if (index >= 0) {
                timeSlot[index].push(tasksWithDates[i]);
            }
        }
    }
    
    // Returns array
    return timeSlot
}