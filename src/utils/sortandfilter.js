export const AscendingSort = (array, sortFactor)=>{
    array.sort(function(a,b){
        let key = sortFactor
        if(a[key] < b[key]){
            return -1
        }
        if(b[key] < a[key]){
            return 1
        }
        return 0
    });
    return array
}

export const DescendingSort = (array, sortFactor)=>{
    array.sort(function(a,b){
        let key = sortFactor
        if(a[key] > b[key]){
            return -1
        }
        if(b[key] > a[key]){
            return 1
        }
        return 0
    });
    return array
}

export const FilterHandler = (array, filterFactor)=>{
    let filteredArray = [];
    for(let i =0 ; i < array.length ; i++){
        array[i]?.gender === filterFactor && filteredArray.push(array[i])
    }
    return filteredArray
}

export const filterHandler2 = (array, key, filterFactor)=>{
    return array.filter((el) => el[key] === filterFactor);
}

