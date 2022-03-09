async function getDocBySlug(slug) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(docsDirectory, `${realSlug}.md`);
    const fileContents = await fsp.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { slug: realSlug, meta: data, content };
}

function getFrontMatterAsJson(obj) {
    const margieJson = JSON.stringify(obj.data);
    debugAdd('margieJson', margieJson);
    return margieJson;
} 

exports.getFrontMatterAsJson = getFrontMatterAsJson;
exports.getDocBySlug = getDocBySlug;