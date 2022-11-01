export function firstA(english) {
  const characters = [...english];
  characters[1] = characters[1].toUpperCase();
  return characters.join("");
}

export function getWenhaoA(str){
  let p = str.split('?')[0]
  return p
}