export function parseMessage(message: string, values: Record<string, string> = {}) {
   if (typeof message !== 'string') return message;
   const regex = /\{{(.*?)\}}/g;
   const matches = message.match(regex);

   matches?.forEach(key => {
      const strippedKey = key.replace(/(\{|\})/g, '').trim();
      const value = values[strippedKey];
      if (!value) console.warn(`${strippedKey} is not provided as a parameter`);
      else {
         message = message.replace(key, value);
      }
   });

   return message.replace(regex, '');
}
