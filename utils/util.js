

const CATEGORYS = [{
    icon: "/images/category/waitao.png",
    title: "衣物包箱",
  },
  {
    icon: "/images/category/zhinengshebei.png",
    title: "数码电子",
  },
  {
    icon: "/images/category/tushu.png",
    title: "旧书音像",
  },
  {
    icon: "/images/category/xifahufa.png",
    title: "化妆日用",
  },
  {
    icon: "/images/category/jiaju.png",
    title: "宿舍用品",
  },
  {
    icon: "/images/category/weishengyongpin.png",
    title: "杂七杂八",
  },
]

const GRIDS = [{
    name: "个人信息",
    gotoUrl: "baseInfo/baseInfo",
    imgSrc: "/images/grid/food-cookie.png",
  },
  {
    name: "我的收藏",
    gotoUrl: "collection/collection",
    imgSrc: "/images/grid/food-doughnut.png",
  },
  {
    name: "我的发布",
    gotoUrl: "myRelease/myRelease",
    imgSrc: "/images/grid/food-macaron.png",
  },
  {
    name: "常见问题",
    gotoUrl: "question/question",
    imgSrc: "/images/grid/food-strawberry.png",
  },
  {
    name: "意见反馈",
    gotoUrl: "feedback/feedback",
    imgSrc: "/images/grid/food-cake.png",
  },
  {
    name: "公益回收",
    gotoUrl: "recovery/recovery",
    imgSrc: "/images/grid/food-popcorn.png",
  },

]



module.exports = {
  CATEGORYS: CATEGORYS,
  GRIDS: GRIDS,
}