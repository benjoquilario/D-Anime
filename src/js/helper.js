import { async } from 'regenerator-runtime';
import { TIME_OUT } from './config.js';

const timeOUt = function (time) {
   return new Promise((_, reject) => {
      setTimeout(() => {
         reject(new Error('We could not find any anime for your query'));
      }, time * 1000);
   });
};

export const getJSON = async function (url) {
   try {
      const res = await Promise.race([fetch(url), timeOUt(10)]);
      const data = await res.json();
      if (!res.ok) throw new Error(`${data.message} ${res.status}`);

      return data;
   } catch (err) {
      throw err;
   }
};
