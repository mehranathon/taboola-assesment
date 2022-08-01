const str=document.body.innerText
const url='https://gist.githubusercontent.com/Thessiah/fb969b429b4d6173916628c7d92bf6e4/raw/fb30bf33cbade43fd667c45437d4937b53ce868a/top1k.json'
const exclude=[]



function findCommonText(str, n, exclude){
    /** 
     * This algorithm is written to first clean the string of non-alphanumeric characters (e.g. punctuation, escape characters, mathematical symbols)
     * without concatenating neighboring words. The string is then split into an array of words excluding any which still contain characters not in the
     * English language e.g. numbers, “@,” or words from other languages. See readme for note regarding contractions.
     */
    let cleanStr=str.replace(/([\b\f\n\r\t\v])/gm," ").toLowerCase()                //remove escape characters e.g. line breaks
    cleanStr=cleanStr.replace(/[:;!?,’\']/g, "")                                    //remove punctuation that should only appear at end of words and apostrophes/single quotes
    cleanStr=cleanStr.replace(/[-()/[\[\]=><"^+*.\u2013\u2014]+/g, " ")             //remove characters which may appear between words without spaces, includes "."
    const uniques=
        cleanStr
        .split(' ')
        .filter((word,index,array)=>
            !/[^a-z]/gi.test(word)                                                  //exclude any word containing characters aside from English (specced) letters
            && word.length>1                                                        //exclude empties generated from regex/split() and single-letter words
            && index==array.indexOf(word)                                           //include only unique words
            && !exclude.includes(word)                                              //exclude most common words fetched above
        ) 

    const nMostCommonWords=                                                            
        uniques
        .map(word=>[word,cleanStr.match(new RegExp(`\\b${word}\\b`,'g')).length])
        .sort((a,b)=>b[1]-a[1])
        .slice(0,n+1)
    return nMostCommonWords                                                         //returns a key value pair of n most common words: [word:string,count:integer]
}

function replaceCommonText(str){
    const commonText=findCommonText(str,25,exclude)
    let replaced=str
    commonText.forEach(word=>{
        const regex=new RegExp(`\\b${word[0]}\\b`,'gi')
        const wordCount=word[1]
        replaced=replaced.replace(regex,wordCount)
    })
    return replaced                                                                 //will include line breaks, tabs, etc. to see correctly formatted, wrap in console.log()
}


fetch(url)
.then(response => response.text())
.then(data=>{
    exclude.push(...JSON.parse(data))
    console.log('Top 25 words:',findCommonText(str, 25, exclude))
})


/**
 *NOTE: The word "edit" appears as a hyperlink at the heading of each section; it is not in the body of the article. 
 *There is no spec for whether to include this kind of text outside of article body.
 */
