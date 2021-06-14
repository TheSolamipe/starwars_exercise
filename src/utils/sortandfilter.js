// export const AscendingSort = (array, sortFactor)=>{
//     array.sort(a,b,sortFactor)
//     return array
// }

export const DescendingSort = (array, sortFactor)=>{
    array.sort(function(a,b){
        if(a.sortFactor > b.sortFactor){
            return -1
        }
        if(b.sortFactor > a.sortFactor){
            return 1
        }
        return 0
    });
    return array
}

export const filter = (array, filterFactor)=>{
    let filteredArray = [];
    for(let i =0 ; i < array.length ; i++){
        array[i]?.gender === filterFactor && filteredArray.push(array[i])
    }
    return filteredArray
}