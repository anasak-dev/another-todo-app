/**
 *  Generate a random string (id in this case)
 * @see https: //dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13#comment-1ol48
 
 */
export const uniquieId = () => {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );
};
