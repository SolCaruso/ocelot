// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: false }
  },
  computedFields: {
    slugBase: {
      type: "string",
      resolve: (post) => new Date(post.date).toLocaleDateString("en-CA").replace(/-/g, ".")
      // YYYY.MM.DD
    },
    url: {
      type: "string",
      resolve: (post) => `/updates/${new Date(post.date).toLocaleDateString("en-CA")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-SAY3W6SE.mjs.map
