export interface SiteConfig {
  name: string;
  tagline: string;
  about: string;
  email: string;
  interests: Interest[];
  books: Book[];
  currently: Currently;
}

export interface Interest {
  name: string;
  icon: string;
  page: string;
  description: string;
}

export interface Book {
  title: string;
  author: string;
  cover?: string;
  review?: string;
}

export interface Currently {
  reading: string;
  readingCover?: string;
  listening: string;
  learning: string;
  workingOn: string;
}

export const siteConfig: SiteConfig = {
  name: "Latte",
  tagline: "泪流满面算不算是一种生理盐水湿敷全脸",
  about: "狮子座 / ENTP / 兴趣广泛<br/>三分钟热度，但足够热",
  email: "xqy07207903@163.com",
  interests: [
    { name: "摄影", icon: "camera", page: "/interests/photography", description: "用镜头捕捉生活中转瞬即逝的光影" },
    { name: "书籍", icon: "book", page: "/interests/books", description: "在文字里遇见另一个世界" },
    { name: "三分钟热度", icon: "sparkle", page: "/interests/hobbies", description: "那些短暂但认真热爱过的事物" },
    { name: "登山", icon: "mountain", page: "/interests/hiking", description: "山在那里，路在脚下" },
  ],
  books: [
    { title: "《我与地坛》", author: "史铁生", cover: "/latte-site/images/me-and-the-earth-altar.svg", review: "死是一个必然会降临的节日。所以，你不必着急。" },
    { title: "《面纱》", author: "毛姆", cover: "/latte-site/images/the-painted-veil.svg", review: "大多数情况下大家都成不了凯蒂，只能成为包法利夫人。" },
    { title: "《罪与罚》", author: "陀思妥耶夫斯基", cover: "/latte-site/images/crime-and-punishment.svg", review: "读的时候感觉自己跟主角一样都得了热症" },
  ],
  currently: {
    reading: "《罪与罚》陀思妥耶夫斯基",
    listening: "丁世光《神探》",
    learning: "吉他弹唱《坏女孩》",
    workingOn: "Codex到底有多好玩",
    readingCover: "/latte-site/images/crime-and-punishment.svg",
  },
};

export interface HobbyItem {
  name: string;
  description?: string;
}

export const hobbies: HobbyItem[] = [
  { name: "手冲咖啡", description: "水温92，粉水比1:15，闷蒸30秒" },
  { name: "钩织", description: "钩了一个又拆，拆了又钩" },
  { name: "吉他", description: "还在和弦转换的泥沼里挣扎" },
  { name: "烹饪", description: "能做的菜不超过十道，但每一道都认真做过" },
  { name: "动漫", description: "追更是一种习惯" },
  { name: "徒步", description: "用脚步丈量熟悉的城市" },
  { name: "攀岩", description: "想学，还没开始" },
];

export interface ClimbedMountain {
  name: string;
  date: string;
  note: string;
}

export interface WantToClimb {
  name: string;
  reason: string;
}

export const climbedMountains: ClimbedMountain[] = [
  { name: "会龙山", date: "2003-08", note: "如果你不知道这是什么山，那就对了，这是我家的山。" },
  { name: "武功山", date: "2026-05", note: "一直不停地走，以为看了高山草甸到了金顶就能将情绪掩埋。" },
];

export const wantToClimbMountains: WantToClimb[] = [
  { name: "萨武神山", reason: "想站在雪山上" },
  { name: "九华山", reason: "礼佛圣地" },
  { name: "天柱山", reason: "8月底之前能爬上吗" },
  { name: "稻城亚丁", reason: "" },
];

export const hikingJournal = `
  <p>登山对我来说，从来不只是运动。</p>
  <p>每一次上山，都是一次和自己的身体对话。累到极限的时候，反而能想清楚很多事情。山顶的风总是很大，但那一瞬间的辽阔——群山在你脚下，云在你腰间——所有烦恼都变得很小很小。</p>
  <p>有人说登山是征服。我总觉得，是山允许你站在它肩上，看一会儿远方。</p>
`;
