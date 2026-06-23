export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome",
    title: "欢迎来到我的网站",
    date: "2026-06-19",
    excerpt: "早在前几年我就有搭建个人网站的想法，完全是心血来潮，但是由于门槛高限制多最后不了了之了。",
    content: `
      <p>早在前几年我就有搭建个人网站的念头，完全是心血来潮，但是由于门槛高限制多最后不了了之。</p>
      <p>昨天，我又心血来潮想试试 Codex，于是学习了一下下载和接入 Deepseek-V4，弄好后却不知道该拿 Codex 来干什么，突然这个几年前的想法就在我脑中闪过了。</p>
      <p>于是，就有了你现在看到的。</p>
    `,
  },
  {
    slug: "taishan-night",
    title: "第一次夜爬泰山",
    date: "2025-05-20",
    excerpt: "凌晨两点出发，头灯的光只够照亮脚下三米。",
    content: `
      <p>凌晨两点出发，头灯的光只够照亮脚下三米。</p>
      <p>十八盘比想象中更漫长。走过一半的时候小腿开始发抖，同行的朋友把热水递过来——那种在黑暗中和朋友互相打气的感觉，比山顶的日出还要温暖。</p>
      <p>六点二十分，天边开始泛白。然后是一线金色，然后是整片天空被点燃。站在山顶上，说不清是因为累还是因为美，眼眶有点发热。</p>
      <p>下次还要来。冬天来。</p>
    `,
  },
];
