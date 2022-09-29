
export const shortenAddress = (address: string) => {
    return address.slice(0, 5) + "..." + address.slice(-4);
}

const relativeTimePeriods: [number, string][] = [
    [31536000, 'year'],
    [2419200, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second']
];

export const getRelativeTime = (date: Date) => {
    if (!(date instanceof Date)) date = new Date(date * 1000);
    const seconds = (new Date().getTime() - date.getTime()) / 1000;
    for (let [secondsPer, name] of relativeTimePeriods) {
        if (seconds >= secondsPer) {
            const amount = Math.floor(seconds / secondsPer);
            return `${amount} ${name}${amount > 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
}