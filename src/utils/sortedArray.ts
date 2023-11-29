export function sortedArray(num : number[]){
  num.sort(function(a, b){
    return a - b
  });
}