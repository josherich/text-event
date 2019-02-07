class TextEvent {

  constructor() {
  
  }

  getDates(sentence) {
    const pattern = new RegExp(/((\b(on|in)\s?(?:\d{1,2})\s?(?:January|February|March|April|May|June|July|August|September|October|November|December)?\s\d{1,4})|(\b(on|in)\s(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s?\d{1,4})|(\b(on|in)\s\d{1,4}))/gi)
    return sentence.match(pattern)
  }

  getChineseDates(sentence) {
    const pattern = new RegExp(/\d{1,4}年(\d{1,2}月)?(\d{1,2}日)?/g)
    return sentence.match(pattern)
  }

  events(text, lang = 'en') {
    const delimiter = new RegExp(/\."|\?"|;|\.|\?|!/g)
    const delimiter_cn = new RegExp(/。|；|？|！|\?/g)
    const sentences = text.replace(/\n/g, '').split(lang === 'zh' ? delimiter_cn : delimiter)
    return sentences.map((sent) => {
      const dates = lang === 'zh' ? this.getChineseDates(sent) : this.getDates(sent)
      const strParser = lang === 'zh' ? (str) => str.split(/年|月|日/).join('.') : (str) => str.replace(/(on|in)\s?/gi, '')
      if (dates != null) {
        return {
          raw_dates: dates,
          dates: dates.map((str) => new Date(strParser(str))).sort(),
          text: sent.trim()
        }
      } else {
        return null
      }
    }).filter((event) => event ).sort((evt1, evt2) => {
      return evt1.dates[0] - evt2.dates[0]
    })
  }

  wiki(keyword="42_(number)", lang="en") {
    return wiki({ apiUrl: `http://${lang}.wikipedia.org/w/api.php` })
    .page(keyword)
    .then(page => page.content())
    .then((content) => {
        const event_list = events(content, lang).map((evt) => {
            evt.text = evt.text.replace(/==.+==|===.+===/g, '')
            evt.dates = evt.dates.filter((d) => {
              return d.toString() !== "Invalid Date"
            })
            return evt
        })
        return event_list
    })
  }
}

module.exports = TextEvent