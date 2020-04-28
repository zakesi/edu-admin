const PREFIX = "https://neon.jiker.vip";
// const PREFIX = "http://127.0.0.1:7001";

export default {
  qiniuToken: `${PREFIX}/api/qiniu/token`,
  course: `${PREFIX}/api/course`,
  chapter: `${PREFIX}/api/chapter`,
  section: `${PREFIX}/api/section`,
  courseItem: id => `${PREFIX}/api/course/${id}`,
  chapterItem: id => `${PREFIX}/api/chapter/${id}`,
  sectionItem: id => `${PREFIX}/api/section/${id}`,
  chapterSort: `${PREFIX}/api/chapter/sort`,
  sectionSort: `${PREFIX}/api/section/sort`,

  zhiye: `${PREFIX}/api/zhiye`,
  zhiyeItem: id => `${PREFIX}/api/zhiye/${id}`,
  zhiyePath: `${PREFIX}/api/zhiye/path`,
  zhiyePathItem: id => `${PREFIX}/api/zhiye/path/${id}`,
  zhiyePathSort: `${PREFIX}/api/zhiye/path/sort`,
  zhiyeCourse: `${PREFIX}/api/zhiye/course`,
  zhiyeCourseItem: id => `${PREFIX}/api/zhiye/course/${id}`,
  zhiyeCourseSort: `${PREFIX}/api/zhiye/course/sort`
};
