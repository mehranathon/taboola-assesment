## Technical Assessment: Taboola
This assessment requested a script to be executable in console that provides the following: (1) an algorithm to count the top 25 most common words on a [webpage](https://en.wikipedia.org/wiki/Programming_language) sorted by descending number of occurrences, and (2) a globally scoped function (replaceCommonText) that accepts a string and returns it with the 25 most common words replaced with their number of occurrences.

The assessment included the following specifications:
- A word may not include HTML tags, JavaScript code, numbers, spaces, punctuation, or any single characters.
    - **NOTE**: "punctuation" was interpreted to include apostrophes. This script currently treats (e.g.) *its* and *it's* as the same word. To differentiate contractions vs. possesives, there would need to be an additional regex step to remove single quotes *only* at the beginning or end of words.
- The [top 1000 most common words](https://gist.githubusercontent.com/Thessiah/fb969b429b4d6173916628c7d92bf6e4/raw/fb30bf33cbade43fd667c45437d4937b53ce868a/top1k.json) in the English language should be excluded from the output.
- The JSON file linked above must be fetched--not harcoded.
- The script may not include third party libraries or frameworks.
- The script will be deployed by pasting it into the console and then calling the second function.
