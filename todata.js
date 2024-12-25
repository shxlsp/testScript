var dataBase = {
  comment_article_cnt: 10, // 送出了xx个评论，对文章发表评论的数量，为 10 个
  get_integral_cnt: 50, // 得到xx积分鼓励，获得的积分数量，设定为 50 分
  create_articles_cnt: 5, // 创作了xx文章，自己创作的文章数量，假设为 5 篇
  get_view_cnt: 100, // 获得xx次浏览，创作文章获得的浏览次数，设定为 100 次
  get_like_cnt: 30, // 获得xx点赞，创作文章获得的点赞数量，假设为 30 个
  get_fans_num: 10, // xx粉丝，个人账号积累的粉丝数量，假设为 10 个
  top_view_articles: "职场经验分享", // 浏览量最高的文章是《》，示例文章名为“职场经验分享”
  // 采销工作台
  frist_use_date: "2020-06-01", // 首次使用工作台日期，格式为 yyyy-MM-dd，假设为 2020-06-01
  use_days: 1000, // 累计使用工作台天数，从首次使用到现在的天数，设定为 1000 天
  use_time: "11-20 22:30:00", // 最晚使用时间，格式为 yyyy-MM-dd HH:mm:ss，假设为 2024-11-20 22:30:00
  top_use_function: "文件搜索", // 最常用功能名称，假设是文件搜索功能使用最频繁
  top_use_cnt: 80, // 最常用功能使用次数，文件搜索功能累计使用 80 次
  nps_feedback_cnt: 3, // NPS反馈次数，进行净推荐值反馈的次数，设定为 3 次
  // 差旅
  cchr_cnt: 5, // 出差次数，因公出差的总次数，假设为 5 次
  cchr_days: 10, // 出差天数，累计出差的天数，设定为 10 天
  cchr_km_sum: 2000, // 累计出差公里数，出差行程的总公里数，假设为 2000 公里
  cchr_city_cnt: 3, // 出差城市数，出差去过的不同城市数量，设定为 3 个

  // 文化传承
  teach_cnt: 8, // 授课节数，为他人授课的总节数，假设为 8 节
  course_play_cnt: 200, // 累计课程播放量次数，所授课程被播放的总次数，设定为 200 次
  interview_num: 10, // 作为面试官参加面试数，担任面试官的场次，设定为 10 场
  interview_succeed_num: 6, // 作为面试官面试后成功入职的人数，面试成功入职的人数，假设为 6 人
  referrals_num: 3, // 内推人数，为公司推荐人才的人数，设定为 3 人
  referrals_succeed_num: 2, // 内推成功后拟录用人数，内推人员被拟录用的人数，假设为 2 人

  // 健身房&班车&食堂
  fitness_times: "30", // 健身次数，在公司健身设施或相关活动中的健身次数，假设为 30 次
  fitness_hours: 60, // 健身时长，累计健身的小时数，设定为 60 小时
  taxi_rides_cnt: "15", // 加班打车次数，加班后打车的次数，假设为 15 次
  taxi_rides_amt: 500, // 加班打车费用，加班打车累计花费的金额，设定为 500 元
  total_meal_cnt: "200", // 食堂用餐次数，在公司食堂吃饭的次数，假设为 200 次
  total_meal_amt: 3000, // 用餐总金额，食堂用餐累计花费的金额，设定为 3000 元
  top1_stall: "川菜档口", // 最爱档口，食堂中最喜欢的档口名称，假设为“川菜档口”

  // 京东商城
  shop_times: 10, // 购物次数，在公司内部商店或合作商家购物的次数，设定为 10 次
  total_shop_amt: 1000, // 购物消费总金额，购物累计花费的金额，设定为 1000 元
  welfare_coupons_num: 20, // 福利券张数，公司发放福利券的数量，假设为 20 张
  total_welfare_coupons_amt: 500, // 福利券总金额，福利券的面值总和，设定为 500 元

  // 价值观、一线支援
  yxzy_hours: 15, // 一线支援时长，到一线岗位支援的累计小时数，假设为 15 小时
  kftx_hours: 20, // 客服听线时长，参与客服接听热线的累计小时数，设定为 20 小时
  khbf_cnt: 12, // 客户拜访次数，外出拜访客户的次数，假设为 12 次
  whjzg_sum: 800, // 文化能量值总数，公司内部文化激励体系下的能量值，假设为 800 分
  badge_cnt: 6, // 徽章数，获得公司各类徽章的总数，设定为 6 个
  pinbo_cnt: 1, // 拼搏徽章数，代表拼搏精神获得的徽章数量，假设为 1 个
  ganen_cnt: 1, // 感恩徽章数，因感恩行为获得的徽章数量，假设为 1 个
  dandang_cnt: 1, // 担当徽章数，展现担当获得的徽章数量，假设为 1 个
  chuangxin_cnt: 1, // 创新徽章数，因创新成果获得的徽章数量，假设为 1 个
  chenxin_cnt: 1, // 诚信徽章数，秉持诚信获得的徽章数量，假设为 1 个
  kehuweixian_cnt: 1, // 客户为先徽章数，以客户为优先获得的徽章数量，假设为 1 个
  xiezuo_cnt: 1, // 协作徽章数，团队协作突出获得的徽章数量，假设为 1 个
  keai_cnt: 1, // 可爱徽章数，具有亲和力等可爱特质获得的徽章数量，假设为 1 个

  // 物流派件
  lanjian_sum: 100, // 累计揽件单量xxx单，物流岗位累计揽收包裹数量，假设为 100 单
  paisou_sum: 120, // 累计派送单量xxx单，物流岗位累计派送包裹数量，假设为 120 单

  handl_problem_cnt: 20, // 为京东客户闭环了XX个问题，处理京东客户问题并闭环解决的数量，假设为 20 个
  get_praise_cnt: 10, // 收获了XX个来自客户的表扬，获得客户表扬的数量，假设为 10 个
  staff_type_name: "百灵鸟", // 百灵鸟/啄木鸟/战狼，员工类型分类，这里假设为“百灵鸟”
  serve_customer_num: 80, // 共服务了xxx位客户，累计服务客户的数量，设定为 80 位
  get_cust_like_num: 15, // 得到xx客户的赞扬，获得客户赞扬的数量，假设为 15 个
  max_serve_date: "2024-09-20", // 服务时间最长日期，格式为 yyyy-MM-dd，假设为 2024-09-20
  max_serve_hours: 8, // 服务时间最长日期时长，当天服务的最长时长，假设为 8 小时
  solve_issue_cnt: 50, // 一年内解答用户问题数，近一年解答客户问题的数量，设定为 50 个
  user_like_cnt: 20, // 用户点赞数，客户对服务点赞的数量，假设为 20 个
  serve_hours_sum: 100, // 服务总时长，所有服务累计的小时数，设定为 100 小时

  // 物流精武门
  oper_thing_num: 30, // 共操作XX件，操作物品、任务等的总件数，假设为 30 件
  oper_thing_kg: 500, // 共操作XXKG，操作物品的总重量，假设为 500KG
  oper_vehicle_num: 5, // 共操作XX车，操作车辆的总数量，假设为 5 辆
  learn_hours: 20, // 京武门学习时长，参加公司京武门培训学习的累计小时数，设定为 20 小时
  learn_process_num: 5, // 学习了xx个工序的操作标准，学习掌握的工序数量，假设为 5 个
  pass_exam_num: 3, // 成功通过了X场考试，公司内部考试通过的场次，设定为 3 场
  upload_video_num: 5, // 在京抖云共上传xx个视频，在京抖云平台上传视频的数量，假设为 5 个
  post_video_num: 3, // 发布xxx视频，在相关平台发布视频的数量，假设为 3 个
  get_like_num: 10, // 收获xx个点赞，上传、发布视频获得的点赞数量，假设为 10 个
  score: 85, // 评分高达x分，综合绩效或其他评分，假设为 85 分
};

var dataTo = {
  topUseFunc: null,
  serveHoursSum: null,
  getPraiseCnt: null,
  maxServeDate: null,
  shopTimes: "174",
  chuangxinCnt: "0",
  bestPartnerMeetCnt: null,
  khbfCnt: "0",
  score: null,
  taxiRidesAmt: "0",
  getLikeNum: null,
  useShendengCnt: null,
  serveCustomerNum: null,
  keaiCnt: "0",
  cchrDays: null,
  kehuweixianCnt: "0",
  referralsNum: "0",
  getFansNum: null,
  entryDate: "2024-01-05",
  solveBugCnt: null,
  badgeCnt: "0",
  findBugCnt: null,
  getLikeCnt: null,
  interviewSucceedNum: "0",
  operThingKg: null,
  whjzgSum: "10",
  referralsSucceedNum: "0",
  totalMealCnt: "551",
  topViewArticles: null,
  totalShopAmt: "53021.84",
  welfareCouponsNum: "26",
  top1Stall: "B座3层餐厅",
  topViewWord: null,
  commentArticleCnt: null,
  maxMeetName: null,
  topViewNum: null,
  getCustLikeNum: null,
  yxzyHours: "9.09",
  fristUseDate: null,
  deliveryCnt: null,
  submitCodeCnt: null,
  useDays: null,
  pinboCnt: "0",
  getIntegralCnt: null,
  editWordsNum: null,
  chenxinCnt: "0",
  totalContactCnt: "233",
  userLikeCnt: null,
  demandNum: null,
  viewBestCreatorCnt: null,
  likeTool: null,
  iterationNum: null,
  cchrCnt: null,
  operThingNum: null,
  totalWelfareCouponsAmt: "1095",
  interviewNum: "1",
  entryDays: "362",
  dt: "2024",
  getViewCnt: null,
  bestCreatorErp: null,
  postVideoNum: null,
  solveIssueCnt: null,
  learnHours: null,
  totalCooperationCnt: null,
  mostMsgsContactErp: "yangshuo27",
  handlProblemCnt: null,
  createArticlesCnt: null,
  userErp: "sunhaoxing1",
  joinMeetCnt: null,
  kftxHours: "0",
  createWordCnt: null,
  groupNum: "668",
  fitnessTimes: "1",
  maxMeetDate: null,
  taxiRidesCnt: "0",
  meetHourSum: null,
  passExamNum: null,
  teachCnt: null,
  codeLineCnt: null,
  bestPartnerName: null,
  coursePlayCnt: null,
  operVehicleNum: null,
  npsFeedbackCnt: null,
  maxServeHours: null,
  processDemand: null,
  cchrCityCnt: null,
  maxSendNumMm: "11",
  viewWordCnt: null,
  paisouSum: null,
  cchrKmSum: null,
  xiezuoCnt: "0",
  useTime: null,
  getVieworLikeNum: null,
  totalMealAmt: "9084.23",
  ganenCnt: "0",
  huijiMeetNum: null,
  likeArticleCnt: null,
  fitnessHours: "0.36",
  learnProcessNum: null,
  userName: "孙好省",
  dandangCnt: "0",
  lanjianSum: null,
  browseArticleCnt: null,
  staffTypeName: null,
  topUseFunction: null,
  useDiaCnt: null,
  uploadVideoNum: null,
  topUseCnt: null,
};

const toUpperCase = (str) => {
    return str.split('_').map((i,idx) => {
        if(idx===0)return i;
        return i[0].toUpperCase()+i.slice(1)
    }).join('')
}
for (let key in dataBase) {
    const newKey = toUpperCase(key);
    if(dataTo[newKey] === undefined) {
        console.log('undefined', key, newKey,dataTo[newKey])
        continue;
    }
    // dataBase[newKey] =  dataBase[key];
    // delete dataBase[key];
    dataBase[key] = newKey
}


const fs = require('fs');

fs.writeFileSync('./dataBase.json', JSON.stringify(dataBase) )