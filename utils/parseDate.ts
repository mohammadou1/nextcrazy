/* --------------- To fix date invalid format issue on Safari --------------- */

export default function parseDate(date: string) {
   return date.replace(' ', 'T');
}
