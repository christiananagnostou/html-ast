// While preparing for your first round interview with Asana, you start exploring Luna, Asana's in-house framework for automating Web application creation. For practice - and fun! - you decide to implement a simple HTML-to-Luna converter.

// To keep things straightforward, you will only consider 4 HTML tags: div, p, b, img. Here's how valid HTML is constructed:

// an empty string is valid HTML;
// <img /> is valid HTML (note the whitespace character between img and /);
// if HTML is valid HTML, then <div>HTML</div>, <p>HTML</p> and
// <b>HTML</b> are all valid.
// if HTML1 and HTML2 are both valid HTML, then HTML1HTML2 is valid HTML.
// For example, <div><p><img /></p><b></b></div> is valid HTML, but <div><p></div> is invalid.

// The conversion of each tag from HTML to Luna format is performed as follows:

// <div><arg1><arg2>...</div> → DIV([arg1, arg2, arg3, ... ]);
// <p><arg1><arg2>...</p> → P([arg1, arg2, arg3, ... ]);
// <b><arg1><arg2>...</b> → B([arg1, arg2, arg3, ... ]);
// <img /> → IMG({})
// Example

// For html = "<div><img /></div>", the output should be htmlToLuna(html) = "DIV([IMG({})])";
// For html = "<div><p><img /></p><b></b></div>", the output should be htmlToLuna(html) = "DIV([P([IMG({})]), B([])])";
// For html = "<div><p></p><p></p><p></p></div>", the output should be htmlToLuna(html) = "DIV([P([]), P([]), P([])])";
// For html = "<div><img /><b></b><img /></div>", the output should be htmlToLuna(html) = "DIV([IMG({}), B([]), IMG({})])".
// Input/Output
// [execution time limit] 5 seconds (ts)

// [input] string html: Valid HTML, containing only these 4 tags: div, p, b, img.

// Guaranteed constraints: 0 ≤ html.length ≤ 6 · 104.

// [output] string: The given HTML converted into the Luna format.
type TagNames = "div" | "/div" | "p" | "/p" | "b" | "/b" | "img /";

class TagNode {
  name: string;
  children: TagNode[];

  constructor(name: TagNames, children: TagNode[]) {
    this.name = name;
    this.children = children;
  }

  addChild(child: TagNode) {
    this.children = this.children ? [...this.children, child] : [child];
  }
}

class Converter {
  head = [];

  hash = {
    "<div>": "DIV([",
    "<p>": "P([",
    "<b>": "B([",
    "<img />": "IMG({})",
  };

  closingTags = {
    div: "/div",
    p: "/p",
    b: "/b",
  };

  parse(html: string) {
    const Q = [];
    const closingTagQ = [];

    while (html) {
      const [tag, newHtml] = this.getNextTag(html);
      html = newHtml;

      const node = this.createNode(tag);

      if (node.name === closingTagQ[0]) {
        this.head.push(Q.shift());
        closingTagQ.shift();
        continue;
      } else if (this.closingTags[node.name]) {
        closingTagQ.push(this.closingTags[node.name]);
      }

      if (node.children !== null) {
        Q.push(node);
      } else {
        Q[0].addChild(node);
      }
    }
  }

  stringify() {
    let res = "";

    for (let tag of this.head) {
      res += `<${tag.name}>`;
      for (let child of tag.children) {
        res += `<${child.name}>`;
      }
      res += `</${tag.name}>`;
    }

    console.log(res);
  }

  createNode(tag: string) {
    const tagName = tag.replace(/[\<\>']+/g, "").trim() as TagNames;
    const isVoidElement = tagName.indexOf("/") > -1;

    return new TagNode(tagName, isVoidElement ? null : []);
  }

  getNextTag(html: string) {
    const nextEndTag = html.indexOf(">");

    return [html.substring(0, nextEndTag + 1), html.substring(nextEndTag + 1)];
  }
}

const c = new Converter();

c.parse("<div><img /><img /></div><div><p></p><img /></div>");
console.log(c.head);
c.stringify();
