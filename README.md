
# Text2Event

## How to use

### Setup

Install it:

```bash
npm install --save next react react-dom
```

### Run

```javascript

const Text2Event = require('text2event');

const text2event = new Text2Event();

text2event.events(content); // default: parse English text
text2event.events(content, 'zh'); // parse Chinese text
```

### Use with wiki
```javascript
const Text2Event = require('text2event');
const text2event = new Text2Event();
text2event.events(content, 'zh');

const wiki = require('wikijs').default;
const word = 'Holy_Roman_Empire';

wiki({ apiUrl: 'http://en.wikipedia.org/w/api.php' })
  .page(word)
  .then(page => page.content())
  .then((content) => {
      const event_list = text2event.events(content);
  })
```

### result format
```json
[
  {
    raw_dates: [ // string
      "on December 7, 1941"
    ],
    dates: [ // Date
      "1941-12-07T05:00:00.000Z"
    ],
    text: "The attacks killed about 500 more people than the attack on Pearl Harbor on December 7, 1941, and are the deadliest terrorist attacks in world history" // string
  },
  ...
]
```