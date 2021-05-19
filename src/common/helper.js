const Helper = {
    convert12HourMode(arg) {
        const firstHour = arg.split(":00")[0]
        const isPM = firstHour > 12;
        let result;
        if (firstHour === 12) {
            result = `12:00 PM`;
        }
        else if (isPM) {
            result = `0${firstHour.split(":00")[0] - 12}:00 PM`;
        } else {
            result = `${firstHour.split(":00")[0]}:00 AM`;
        };
        return result;
    },
    upperCase(arg) {
        return arg ? arg[0].toUpperCase() + arg.slice(1) : "";
    },
    converterDate(arg) {
        if (!arg) return null;
        return new Date(arg).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
};

export default Helper;