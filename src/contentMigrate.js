const migrate = (mdblocks) => {
    for (const block of mdblocks) {
        if (block.type === "paragraph" && block.parent.trim() === "!more") {
            block.parent = "<!-- more -->";
        }
    }
    return mdblocks;
}

module.exports = migrate;
