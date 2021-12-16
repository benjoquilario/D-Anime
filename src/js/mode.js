export const themeMode = function () {
   document.querySelector('#toggle').addEventListener('click', function () {
      document.querySelector('body').classList.toggle('lightmode');
   });
};
