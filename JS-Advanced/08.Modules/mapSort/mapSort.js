function mapSort(map, sortFn){
	if(sortFn === undefined){
		sortFn = (a, b) => a[0].toString().localeCompare(b[0].toString())
	}
	let sortedMap = new Map()
	console.log(	[...map.entries()]);
	[...map.entries()].sort(sortFn).forEach(e => sortedMap.set(e[0], e[1]))
	return sortedMap
}
module.exports = mapSort
