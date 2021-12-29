const _ = require("lodash");

const tag_cleaner = (tag, open_tag, close_tag) =>
  tag.replace(open_tag, "").replace(close_tag, "");

const tags = [
  {
    tag: /\{\{(.*?)\}\}/g,
    open_tag: /^\{\{/,
    close_tag: /\}\}$/,
    resolver: function (data) {
      return (tag) =>
        _.get(data, tag_cleaner(tag, this.open_tag, this.close_tag));
    },
  },
];

/**
 *
 * @param {String} text the string to be processed
 * @param {Object} source_data {} object that contains the source data
 * @returns {String} processed string
 */
const replace = (text, source_data = {}) => {
  let new_text = text + "";

  tags.forEach((ftag) => {
    new_text = new_text.replace(ftag.tag, ftag.resolver(source_data));
  });

  // find if there are '"' in the string
  if (new_text.indexOf('"') >= 0) {
    new_text = new_text.split('"').join('\\"');
  }

  return new_text;
};

module.exports = replace;
