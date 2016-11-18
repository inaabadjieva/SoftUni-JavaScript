function matchDates(text){
	let pattern =/\b([0-9]{1,2})-([A-Z][a-z]{2})-([0-9]{4})\b/g;
  	let dates = []
  	let match 
  	for (let sentence of text)
    	while (match = pattern.exec(sentence))
      		dates.push(`${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`);
  	console.log(dates.join("\n"));
}

matchDates(['I dont know what to test anymore so here are some random dates.',
'15-May-1996',
'21-June-1995',
'31-February-3000',
'woops that was invalid...',
'111-Nov-2332',
'01-January-0001',
'What the fuck',
'11-Sep-2001',
'One minute of silence!'])
