(function (selector) {
  function getChildren(doc, node, showAnonymousContent = true) {
    const { classes: Cc, interfaces: Ci } = Components;

    let walker = Cc["@mozilla.org/inspector/deep-tree-walker;1"].createInstance(Ci.inIDeepTreeWalker);
    walker.showAnonymousContent = showAnonymousContent;
    walker.showSubDocuments = true;
    walker.showDocumentsAsNodes = true;
    // SHOW_ALL: 0xFFFFFFFF
    walker.init(doc, 0xFFFFFFFF);
    walker.currentNode = node

    walker.firstChild();

    let children = []
    do {
      // Skip text nodes
      if (walker.currentNode.nodeType != Ci.nsIDOMNode.TEXT_NODE) {
        children.push(walker.currentNode);
      }
      walker.nextSibling();
    } while(walker.currentNode.nextSibling);

    return children;
  }

  let doc = tabs[0].content.document;
  let testComponent = doc.querySelector(selector);

  return {
    shadowTree: getChildren(doc, testComponent, true),
    lightTree: getChildren(doc, testComponent, false),
  }
})("test-component");
