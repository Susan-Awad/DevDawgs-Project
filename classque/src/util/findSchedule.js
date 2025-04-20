export const bestSchedule = (item) => {
    const start = new Date(item.start);
    const days = item.duration * 7;
    item.tasks.sort((a,b) => Number(b.points) - Number(a.points));
    
    let tasksWithDates = item.tasks.map(task => {
        const end = new Date(task.dueDate)
        console.log("end", end)
        const dates = (end.getDate() - start.getDate())
        console.log("dates:", dates)
        return {
            ...task,
            date: dates
        };
    })

    const timeSlot = new Array(days).fill(undefined);
    for (let i = 0; i < tasksWithDates.length; i++) {
        let start = tasksWithDates[i].date;
        for (let j = start; j >= 0; j--) {
            if (timeSlot[j] === undefined) {
                timeSlot[j] = tasksWithDates[i];
                tasksWithDates[i].date = j
                break;
            }
        }
    }

    console.log("tasks after", timeSlot)
    return timeSlot
}