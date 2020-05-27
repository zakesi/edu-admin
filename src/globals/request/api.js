const PREFIX_API = "https://neon.jiker.vip/api";
// const PREFIX_API = "http://127.0.0.1:7001/api";
const PREFIX_API_ADMIN = PREFIX_API + "/admin";
export default {
  smsSend: `${PREFIX_API_ADMIN}/sms/send`,
  smsLogin: `${PREFIX_API_ADMIN}/sms/login`,
  authPermissions: `${PREFIX_API_ADMIN}/auth/permissions`,
  qiniuToken: `${PREFIX_API}/qiniu/token`,
  course: `${PREFIX_API_ADMIN}/course`,
  chapter: `${PREFIX_API_ADMIN}/chapter`,
  section: `${PREFIX_API_ADMIN}/section`,
  courseItem: id => `${PREFIX_API_ADMIN}/course/${id}`,
  chapterItem: id => `${PREFIX_API_ADMIN}/chapter/${id}`,
  sectionItem: id => `${PREFIX_API_ADMIN}/section/${id}`,
  chapterSort: `${PREFIX_API_ADMIN}/chapter/sort`,
  sectionSort: `${PREFIX_API_ADMIN}/section/sort`,
  zhiye: `${PREFIX_API_ADMIN}/zhiye`,
  zhiyeItem: id => `${PREFIX_API_ADMIN}/zhiye/${id}`,
  zhiyePath: `${PREFIX_API_ADMIN}/zhiye/path`,
  zhiyePathItem: id => `${PREFIX_API_ADMIN}/zhiye/path/${id}`,
  zhiyePathSort: `${PREFIX_API_ADMIN}/zhiye/path/sort`,
  zhiyeCourse: `${PREFIX_API_ADMIN}/zhiye/course`,
  zhiyeCourseItem: id => `${PREFIX_API_ADMIN}/zhiye/course/${id}`,
  zhiyeCourseSort: `${PREFIX_API_ADMIN}/zhiye/course/sort`,
  company: `${PREFIX_API_ADMIN}/company`,
  companyItem: id => `${PREFIX_API_ADMIN}/company/${id}`,
  project: `${PREFIX_API_ADMIN}/project`,
  projectItem: id => `${PREFIX_API_ADMIN}/project/${id}`,
  projectVersion: `${PREFIX_API_ADMIN}/version`,
  projectVersionItem: id => `${PREFIX_API_ADMIN}/version/${id}`,
  projectStory: `${PREFIX_API_ADMIN}/story`,
  projectStoryItem: id => `${PREFIX_API_ADMIN}/story/${id}`,
  projectTask: `${PREFIX_API_ADMIN}/task`,
  projectTaskItem: id => `${PREFIX_API_ADMIN}/task/${id}`,
  projectVersionSort: `${PREFIX_API_ADMIN}/project/version/sort`,
  projectStorySort: `${PREFIX_API_ADMIN}/project/story/sort`,
  projectTaskSort: `${PREFIX_API_ADMIN}/project/task/sort`,
  stack: `${PREFIX_API_ADMIN}/stack`,
  stackItem: id => `${PREFIX_API_ADMIN}/stack/${id}`,
  skillQuestion: `${PREFIX_API_ADMIN}/skill/question`,
  skillQuestionItem: id => `${PREFIX_API_ADMIN}/skill/question/${id}`,
  manager: `${PREFIX_API_ADMIN}/manager`,
  managerItem: id => `${PREFIX_API_ADMIN}/manager/${id}`,
  permission: `${PREFIX_API_ADMIN}/permission`,
  role: `${PREFIX_API_ADMIN}/role`,
  roleItem: id => `${PREFIX_API_ADMIN}/role/${id}`,
  advertise: `${PREFIX_API_ADMIN}/advertise`,
  advertiseItem: id => `${PREFIX_API_ADMIN}/advertise/${id}`,
  material: `${PREFIX_API_ADMIN}/material`,
  materialItem: id => `${PREFIX_API_ADMIN}/material/${id}`,
  advertiseMaterial: `${PREFIX_API_ADMIN}/advertise/material`,
  advertiseMaterialItem: id => `${PREFIX_API_ADMIN}/advertise/material/${id}`,
  advertiseMaterialSort: `${PREFIX_API_ADMIN}/advertise/material/sort`
};
