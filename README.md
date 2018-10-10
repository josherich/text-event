
# Text2Event

## How to use

### Setup

Install it:

```bash
npm install --save text2event
```

### Run

```javascript

const Text2Event = require('text2event');

const text2event = new Text2Event();

text2event.events(content); // default: parse English text
text2event.events(content, 'zh'); // parse Chinese text
```

### Use with wikipedia


```javascript
const Text2Event = require('text2event');
const text2event = new Text2Event();
const keyword = "Brett_Kavanaugh";
text2event.wiki(keyword, 'en').then((list) => {
  console.log(list)
})
```

### Deploy on AWS Lambda

An AWS Lambda version of this script can be found in `lib/lambda.js`

### result format
```javascript
[
  {
    "raw_dates": [ // string
      "on December 7, 1941"
    ],
    "dates": [ // Date
      "1941-12-07T05:00:00.000Z"
    ],
    "text": "The attacks killed about 500 more people than the attack on Pearl Harbor on December 7, 1941, and are the deadliest terrorist attacks in world history" // string
  },
  ...
]
```