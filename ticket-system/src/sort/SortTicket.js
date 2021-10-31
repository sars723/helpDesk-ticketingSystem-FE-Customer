export const sortTickets = (tickets, field, sortAsc) => {
  const sortedTickets = sortAsc
    ? [].concat(tickets).sort((a, b) => (a[field] > b[field] ? 1 : -1))
    : [].concat(tickets).sort((a, b) => (a[field] > b[field] ? -1 : 1));
  return sortedTickets;
};
