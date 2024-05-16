import { formatDistanceToNow, parseISO } from "date-fns";

const formatDate = (createdAt: string): string => {
  const date = parseISO(createdAt);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });

  return formattedDate;
};

export default formatDate;
