const STORAGE_KEY = "onebox-os.memories.v4";
const LEGACY_STORAGE_KEYS = [
  "onebox-os.memories.v3",
  "onebox-os.memories.v2",
  "onebox-os.memories.v1",
];
const LAST_RESULT_KEY = "onebox-os.last-result.v4";
const LEGACY_LAST_RESULT_KEYS = [
  "onebox-os.last-result.v3",
  "onebox-os.last-result.v2",
  "onebox-os.last-result.v1",
];
const SETTINGS_KEY = "onebox-os.settings.v1";
const IMPORT_BATCH_DATE = "2026-04-01";
const DEFAULT_SETTINGS = {
  baseUrl: "https://api.deepseek.com/v1",
  model: "deepseek-chat",
  apiKey: "",
  temperature: 0.3,
};
const LEGACY_SEED_TITLES = new Set([
  "个人知识系统原则",
  "语音转写：关于输入框体验的想法",
  "网页摘录：长期记忆为什么重要",
  "截图摘录：主 Chat 体验短板",
  "产品原则：不要做炫技型 Agent",
]);

const sampleQueries = [
  {
    title: "核心卖点",
    text: "基于我的个人记忆，帮我总结适合对外讲的 3 个核心卖点。",
  },
  {
    title: "60 秒介绍",
    text: "基于我的个人记忆，帮我写一段适合 AI 产品经理面试的 60 秒自我介绍。",
  },
  {
    title: "时代天使方法论",
    text: "我在时代天使项目里的评估方法论是什么？",
  },
  {
    title: "技术实践",
    text: "帮我找出我关于 Prompt、RAG、Agent 的个人实践。",
  },
  {
    title: "面试准备",
    text: "如果我明天要面 AI 产品经理，最该优先复习什么？",
  },
];

const sampleMemories = [
  {
    id: "seed-profile-basics",
    type: "note",
    title: "个人档案：基础信息与主投方向",
    source: "04-简历与话术 / 自我介绍与自我评价",
    createdAt: IMPORT_BATCH_DATE,
    pinned: true,
    ignored: false,
    tags: ["个人档案", "教育背景", "AI产品经理"],
    content:
      "刘存会，湘潭大学应用统计学硕士，2026 年 6 月毕业，本科统计学。主投方向确认是 AI 产品经理，可接受杭州、北京、上海、深圳等地机会。",
    detail:
      "姓名：刘存会\n学历：湘潭大学应用统计学硕士，2026 年 6 月毕业；本科为统计学\n方向：主投 AI 产品经理\n地点：可接受杭州、北京、上海、深圳等机会\n荣誉：国家奖学金、特等奖学金、三好研究生、优秀研究生干部等",
  },
  {
    id: "seed-job-status",
    type: "note",
    title: "求职状态：Offer 与当前策略",
    source: "readme-交接 / 岗位追踪表",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["求职状态", "Offer", "策略"],
    content:
      "预策科技的数据产品 / AI Agent 实习岗位已拿 Offer，可以作为保底；主线仍然继续冲更匹配的 AI 产品经理岗位，不把求职节奏停下来。",
    detail:
      "当前状态：预策科技已拿 Offer\n岗位：数据产品 / AI Agent 实习\n策略：作为保底选择，但不停止投递\n主线目标：优先争取更匹配的 AI 产品经理岗位\n用途：在被问“当前进展”或“为什么还在看机会”时使用",
  },
  {
    id: "seed-core-advantage",
    type: "note",
    title: "核心优势：AI产品实战 × 数据闭环 × AI Native",
    source: "readme-交接 / 自我介绍与自我评价 / 面经回答",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["核心优势", "AI产品", "数据分析", "AI Native"],
    content:
      "个人竞争力的稳定组合是三件事：时代天使的 AI 应用 0 到 1 落地、得物和蔚来的数据评估与闭环能力、以及基于 Cursor / Dify / Markdown 工作流的 AI Native 原型与协作方式。",
    detail:
      "能力三角：\n1. AI 产品实战：时代天使做过 ASR + LLM + RAG + Dify 的 0 到 1 项目\n2. 数据闭环：得物和蔚来都做过指标体系、归因分析、版本验证、bad case 复盘\n3. AI Native：会用 Cursor、Dify、Markdown、Python 静态链路把想法快速做成原型或工作流\n适用问题：为什么适合 AI PM、你的差异化优势、相比传统 PM 多了什么",
  },
  {
    id: "seed-timesangel-overview",
    type: "note",
    title: "项目资产：时代天使 AI沟通记录摘要系统",
    source: "04-简历与话术 / 项目讲解·AI沟通摘要",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["时代天使", "AI沟通摘要", "0到1", "ASR", "RAG"],
    content:
      "在时代天使独立推进 AI 沟通记录摘要产品，从需求定义、技术选型到 MVP 灰度闭环完整落地。链路是阿里云 ASR + DeepSeek-V3 + RAG + Dify Workflow，45 秒内生成可编辑结构化摘要，全量上线后准确率达 90%，设计师归档效率提升 80%+。",
    detail:
      "背景：设计师每天要与医生通过电话和企微沟通病例方案，之后手动整理结构化沟通记录，每天约耗时 2 小时\n任务：设计 AI 自动生成结构化摘要的产品方案，并完成 MVP、评估和迭代\n技术链路：阿里云 ASR + DeepSeek-V3 + RAG + Dify Workflow\n输出结构：问题描述 / 处理描述 / 性格判定 / 风格判定\n结果口径：45 秒内生成可编辑结构化摘要，全量上线后准确率 90%，设计师归档效率提升 80%+",
  },
  {
    id: "seed-timesangel-eval",
    type: "note",
    title: "方法论：时代天使评估三件套",
    source: "04-简历与话术 / 项目讲解·AI沟通摘要",
    createdAt: IMPORT_BATCH_DATE,
    pinned: true,
    ignored: false,
    tags: ["评估体系", "MVP", "Bad Case", "方法论"],
    content:
      "沉淀了一套可复用的评估三件套：100 分制评分表、MVP 达标线（3 个以上样本≥70 分且无 <55 分样本）、bad case 归因模板（Prompt 缺陷 / 知识库缺失 / 模型能力 / 输入质量）。",
    detail:
      "100 分制评分表：\n- 问题描述 15 分\n- 处理描述 25 分\n- 性格判定 30 分\n- 风格判定 20 分\n- 通用质量 10 分\nMVP 达标线：\n- 3 个以上样本达到 70 分以上\n- 且不能出现低于 55 分的样本\n等级口径：A 级 ≥85 可上线；B 级 70-84 微调后上线；C 级 55-69 需大改；D 级 <55 需要重做\nbad case 归因四类：Prompt 缺陷 / 知识库缺失 / 模型能力 / 输入质量",
  },
  {
    id: "seed-timesangel-prompt-rag",
    type: "note",
    title: "方法论：多病例拆分与 Prompt / RAG 迭代",
    source: "04-简历与话术 / 项目讲解·AI沟通摘要",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["Prompt", "RAG", "Dify", "工作流", "企微"],
    content:
      "从通话场景扩展到企微群聊后，重点解决多病例拆分、转述识别、角色识别和噪音过滤问题。关键改动是先扫描并列出所有患者，再逐个分析；一致性从 66% 提升到 100%。",
    detail:
      "企微版 v1→v2 的 5 项改动：\n1. 病例拆分：从默认整段聊天=一个病例，改成先扫描并列出所有患者，再逐个分析\n2. 转述识别：补充“临床说…”“医生反馈…”等间接表达规则\n3. 角色识别：按企微群昵称格式识别设计师、客服、医生等角色\n4. 过滤逻辑：明确忽略表情、系统消息、寒暄，只提取病例相关对话\n5. 术语纠错：新增真实 bad case 中出现的术语映射，如“桥治→矫治”\n一致性测试：同一段含 3 位患者的聊天记录，v1 三次仅 2 次识别完整；v2 三次均识别完整，一致性提升到 100%",
  },
  {
    id: "seed-dewu-overview",
    type: "note",
    title: "项目资产：得物 AI鉴别数据闭环",
    source: "04-简历与话术 / 得物蔚来·AI经历问答",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["得物", "AI鉴别", "数据闭环", "BI"],
    content:
      "围绕 AI 鉴别场景梳理补图、人工复核、时效等关键节点，搭建指标监控体系并支持 bad case 分析。推动商品平均鉴别时长缩短 0.5 小时，周度复盘从 2 小时压缩到 10 分钟。",
    detail:
      "核心动作：\n1. 拆解鉴别链路：图片上传、补图、AI 鉴别、人工复核、整体时效\n2. 搭建指标体系：按类目、仓区、鉴别团队等维度监控异常\n3. 支持训练/调参：整理样本、分类 bad case、分析不同模板与类目波动\n4. 口径治理：主导 QuickBI 看板与宽表建模，提前发现并修复 2 项底层数据质量问题\n结果：平均鉴别时长缩短 0.5 小时，周度复盘 2 小时→10 分钟，补图率 12%→10%",
  },
  {
    id: "seed-dewu-agent-workflow",
    type: "voice",
    title: "AI Native 实践：得物周报 Agent 链路",
    source: "AIPM面经整理 / 面经回答",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["Cursor", "Agent", "周报", "QuickBI", "SQL"],
    content:
      "用 Cursor 把周报流程做成 Agent 链路：QuickBI + SQL 拉取数据，自动筛选环比同比异常，生成结构化叙事和 Markdown 周报，再由人工校验。周报制作和复盘从 4 小时降到 30 分钟，可追溯性更强。",
    detail:
      "链路步骤：\n1. QuickBI + SQL 拉取核心指标数据\n2. 自动筛选环比 / 同比异常项\n3. 将异常指标转成结构化叙事输入\n4. 输出 Markdown 周报初稿\n5. 人工校验后发布\n结果：周报制作与复盘耗时 4 小时→30 分钟\n价值：异常解释更一致，可追溯到原始数据和生成过程",
  },
  {
    id: "seed-nio-overview",
    type: "note",
    title: "项目资产：蔚来高快误刹归因与版本验证",
    source: "04-简历与话术 / 得物蔚来·AI经历问答",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["蔚来", "主动安全", "版本验证", "A/B"],
    content:
      "在蔚来围绕 NOP 高快误刹问题做场景拆解与归因分析，用 Python 搭建数据处理流程，参与端到端感知模型版本验证与 bad case 复盘，重点看千公里误刹车次数及施工区、汇入汇出等关键场景。",
    detail:
      "核心场景：静态障碍物、施工区、高速汇入汇出、异形障碍物等\n核心指标：千公里误刹车次数、关键场景触发率、版本前后 bad case 分布\n核心动作：\n1. 用 Python 做事件解析、标签结构化、关键特征提取\n2. 对比新旧版本在重点场景下的表现差异\n3. 参与 bad case 复盘，判断问题更像感知不稳定、策略保守还是边界定义不清\n定位：偏评估分析与版本验证，不是底层模型 owner",
  },
  {
    id: "seed-ai-native-project",
    type: "web",
    title: "AI Native 项目：OneBox OS",
    source: "onebox-os / README",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["AI Native", "产品化", "长期记忆", "Router"],
    content:
      "OneBox OS 把 AI Task Router 和 Personal Memory OS 合在同一个入口里：用户只输入一句话，系统先判断当前更适合澄清、搜索、写作、分析还是执行，再按需调用长期记忆，并展示路由理由和引用来源。",
    detail:
      "产品结构：\n1. 前台是自然语言任务入口\n2. 中间是 Clarify / Search / Write / Analyze / Act 五种路由\n3. 后台是双层长期记忆卡片（摘要卡 + 详细卡）\n4. 结果页展示回答、路由 trace 和引用来源\n当前实现：Cursor 辅助完成前端原型，支持本地记忆管理、可解释路由、真实模型配置、JSON 导入导出，并计划部署到 GitHub Pages 持续迭代。",
  },
  {
    id: "seed-model-selection",
    type: "note",
    title: "方法论：模型选型与评估六步法",
    source: "AIPM面经整理 / 面经回答",
    createdAt: IMPORT_BATCH_DATE,
    pinned: true,
    ignored: false,
    tags: ["模型选型", "评估流程", "灰度", "离线评测"],
    content:
      "模型选型按六步走：明确任务与输出规范、定义验收指标、做离线对比评测、设计评分表与达标线、灰度上线和指标监控、最后按 bad case 决定是改 Prompt / 流程 / RAG 还是再考虑微调。",
    detail:
      "六步法：\n1. 明确任务与输出规范：摘要结构、字段、容错边界、失败兜底\n2. 定义验收指标：准确、覆盖、一致性、幻觉率、延迟、成本、稳定性、合规\n3. 做离线评测：选 30-100 条代表性样本统一跑 A/B\n4. 设计评分表和达标线：例如 100 分制、MVP ≥70 且无 <55\n5. 灰度上线：抽检、反馈、线上 bad case 监控\n6. 迭代决策：优先改 Prompt / 流程 / RAG，数据量够再考虑 LoRA / SFT",
  },
  {
    id: "seed-rag-framework",
    type: "note",
    title: "方法论：RAG 排查与优化框架",
    source: "01-知识库 / 02-RAG与Agent框架",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["RAG", "检索", "Chunking", "Rerank"],
    content:
      "排查顺序是数据层 → 分块层 → 检索层 → 生成层。常见动作包括调 chunk size / overlap、混合检索、调 TopK 和阈值、加入 query 改写与 rerank，再看 Prompt 约束和模型参数。",
    detail:
      "四层排查：\n1. 数据层：ASR / OCR 是否准确，知识库是否覆盖、是否有重复矛盾内容\n2. 分块层：chunk 是否过大或过小，是否需要 overlap，是否按文档类型分块\n3. 检索层：是否漏召回、噪音过多、排序不合理；动作包括混合检索、调 TopK、调阈值、query 改写、加 rerank\n4. 生成层：Prompt 约束是否清晰，是否需要降温度、要求引用证据、限制幻觉\n你的项目口径：混合检索，TopK 从 6 调到 4 后噪音更少，输出更稳定",
  },
  {
    id: "seed-prompt-context",
    type: "note",
    title: "方法论：Prompt 与 Context Engineering",
    source: "01-知识库 / 07-Prompt Engineering与工作流设计",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["Prompt", "Context Engineering", "工作流", "System Prompt"],
    content:
      "Prompt 设计强调角色、任务、约束、输出格式、示例五要素；Context Engineering 更关注给模型看什么，包括 Write、Select、Compress、Order、Format、Isolate。经验是先把好答案结构化，再用 bad case 一轮轮收敛。",
    detail:
      "Prompt 五要素：\n1. 角色定义\n2. 核心任务\n3. 约束条件\n4. 输出格式\n5. Few-shot 示例\nContext Engineering 六个动作：Write / Select / Compress / Order / Format / Isolate\n你的实践：\n- 用 Markdown 模板约束输出结构\n- 用 RAG 的 TopK 和阈值控制 Select\n- 用噪音过滤规则做 Compress\n- 将角色定义和关键规则放到上下文前后关键位置做 Order",
  },
  {
    id: "seed-ai-pm-cognition",
    type: "note",
    title: "认知：AI产品经理的核心价值与边界",
    source: "AIPM面经整理 / 面经回答",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["AI产品经理", "主Chat", "搜索", "Agent"],
    content:
      "AI 产品经理的核心不是堆功能，而是把不确定的模型能力变成可验证、可灰度、可持续优化的体验。主 Chat 负责通用理解与表达入口，搜索解决事实查找，Agent 负责多步骤任务与工具调用，传统工具型产品则聚焦高频且确定性的任务闭环。",
    detail:
      "边界理解：\n- 主 Chat：适合模糊需求、综合表达、开放式生成，是统一入口\n- 搜索：适合事实查询、来源验证、时效性信息\n- Agent：适合计划、工具调用、多步骤任务推进\n- 传统工具：适合高频、明确、确定性的任务闭环\n核心价值：不是替代所有产品，而是在不确定问题上提供更低门槛的理解、组织和推进能力",
  },
  {
    id: "seed-answer-framework",
    type: "note",
    title: "面试表达：统一答题骨架",
    source: "AIPM面经整理 / 面经回答",
    createdAt: IMPORT_BATCH_DATE,
    pinned: true,
    ignored: false,
    tags: ["面试", "表达", "答题骨架"],
    content:
      "高频回答统一用先结论 → 关键动作 → 数据结果 → 方法论收束。项目深挖则补齐背景 / 目标 / 方案 / 评估 / 迭代 / 结果六段，避免一上来陷进细节堆砌。",
    detail:
      "30 秒骨架：结论 → 做了哪 3 步 → 1 个关键数据 → 收束成方法论\n2 分钟项目骨架：背景 / 目标 / 方案 / 评估 / 迭代 / 结果\n兜底句：我讲清楚为什么这么选、怎么评估、怎么闭环，但不会把自己说成底层模型 owner\n用途：自我介绍、项目深挖、模型选型、数据闭环、产品判断几乎都能套",
  },
  {
    id: "seed-expression-reminder",
    type: "screenshot",
    title: "表达提醒：先结论后展开，减少填充词",
    source: "02-面试复盘 / 01-Keep一面复盘",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["表达习惯", "面试提醒", "RAG短板"],
    content:
      "表达上要压缩填充词和重复表述，优先先给结论再展开。Keep 复盘暴露出的重点短板是 RAG 细节不够扎实、对产品体验不够完整，因此面试前要优先补齐 overlap、rerank、TopK 区分，以及核心竞品功能体验。",
    detail:
      "Keep 复盘暴露的问题：\n1. 把 RAG 检索 TopK 和 LLM 采样 TopK 混淆\n2. chunk size 只能说“试出来的”，缺少判断逻辑\n3. overlap 不了解\n4. rerank 和权重判断过度推给算法\n5. Keep 核心功能体验不完整\n改进优先级：先补 RAG 技术细节，再补产品体验深度，最后压缩表达中的填充词和重复",
  },
  {
    id: "seed-growth-supplement",
    type: "note",
    title: "补充经历：分群圈选与精细化运营",
    source: "AIPM面经整理 / 面经回答",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["增长", "分群圈选", "补充素材"],
    content:
      "在时代天使做过多主体智能圈选平台，打通圈选、执行、反馈闭环，圈选效率提升 90%+，支撑 10+ 精细化运营活动。这段是真实经历，但当前不放主简历，更适合在增长或运营相关追问中补充。",
    detail:
      "项目内容：多主体智能圈选平台，覆盖圈选、执行、反馈三段闭环\n结果：圈选效率提升 90%+，支撑 10+ 精细化运营活动\n使用场景：如果被问增长、精细化运营、数据驱动活动策略时再展开\n使用原则：属于补充牌，不作为 AI PM 主介绍的第一顺位",
  },
  {
    id: "seed-tool-stack",
    type: "note",
    title: "工具偏好：Cursor / Claude / DeepSeek / Dify",
    source: "02-面试复盘 / 美团AI面试准备",
    createdAt: IMPORT_BATCH_DATE,
    pinned: false,
    ignored: false,
    tags: ["工具栈", "Cursor", "Claude", "DeepSeek", "Dify"],
    content:
      "常用工具组合是 Cursor + Claude 做原型和代码协作，DeepSeek 做中文专业场景生成，Dify 搭工作流，阿里云 ASR 做语音转写。选工具的标准是是否真正改变工作流，而不是功能点是否新。",
    detail:
      "工具使用分工：\n- Cursor + Claude：代码协作、原型搭建、结构设计\n- DeepSeek：中文专业文本生成，时代天使项目主模型\n- Dify：工作流编排、知识库管理、快速搭 MVP\n- 阿里云 ASR：语音转写，支持热词库纠错\n选择标准：是否适配场景、成本是否合理、输出是否稳定、能否真正进入日常工作流",
  },
];

const state = {
  memories: [],
  lastResult: null,
  settings: { ...DEFAULT_SETTINGS },
  isBusy: false,
  runtimeStatus: {
    kind: "fallback",
    message: "当前使用本地启发式模式。保存真实模型配置后，可切到在线生成模式。",
  },
};

const modeConfig = {
  Clarify: {
    className: "route-clarify",
    description: "问题还不够清晰，应该先补关键信息或缩小范围。",
    keywords: ["这个", "那个", "一下", "完善", "看看", "帮我想", "怎么做"],
  },
  Search: {
    className: "route-search",
    description: "优先去记忆库里找线索和来源，再回答。",
    keywords: ["之前", "在哪", "提过", "找", "搜", "查", "记录", "有没有"],
  },
  Write: {
    className: "route-write",
    description: "需要基于上下文生成一版可直接使用的内容。",
    keywords: ["写", "润色", "改写", "文案", "介绍", "开场", "发给"],
  },
  Analyze: {
    className: "route-analyze",
    description: "需要拆问题、比较方案、给判断和建议。",
    keywords: ["分析", "比较", "评估", "判断", "拆解", "复盘", "优先级"],
  },
  Act: {
    className: "route-act",
    description: "可以做轻量执行，例如生成待办、保存卡片、沉淀新记忆。",
    keywords: ["保存", "记住", "待办", "创建", "整理成卡片", "导出", "行动"],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  state.memories = loadMemories();
  state.lastResult = loadLastResult();
  state.settings = loadSettings();
  if (canUseRealtimeAI(state.settings)) {
    setRuntimeStatus("live", `当前使用真实模型配置：${state.settings.model}。`);
  }
  renderExamples();
  renderMemoryList();
  renderSettings();
  wireEvents();
  if (state.lastResult) {
    renderResult(state.lastResult);
  } else {
    renderEmptyResult();
  }
});

function wireEvents() {
  document.getElementById("query-form").addEventListener("submit", handleQuery);
  document.getElementById("memory-form").addEventListener("submit", handleMemorySubmit);
  document.getElementById("settings-form").addEventListener("submit", handleSettingsSubmit);
  document.getElementById("test-connection").addEventListener("click", handleTestConnection);
  document.getElementById("export-memories").addEventListener("click", exportMemories);
  document.getElementById("import-memories").addEventListener("click", () => {
    document.getElementById("import-file").click();
  });
  document.getElementById("import-file").addEventListener("change", handleImportFile);
  document.getElementById("seed-query").addEventListener("click", () => {
    document.getElementById("query-input").value = sampleQueries[0].text;
    document.getElementById("query-form").requestSubmit();
  });
  document.getElementById("reset-demo").addEventListener("click", resetDemo);
  document.getElementById("clear-storage").addEventListener("click", clearStorage);
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleMiniAction(button.dataset.action));
  });
}

function renderExamples() {
  const container = document.getElementById("example-list");
  container.innerHTML = sampleQueries
    .map(
      (item) => `
        <button class="example-item" data-example="${escapeHtml(item.text)}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.text)}</span>
        </button>
      `
    )
    .join("");

  container.querySelectorAll(".example-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("query-input").value = button.dataset.example;
      document.getElementById("query-form").requestSubmit();
    });
  });
}

function renderSettings() {
  document.getElementById("settings-base-url").value = state.settings.baseUrl || "";
  document.getElementById("settings-model").value = state.settings.model || "";
  document.getElementById("settings-api-key").value = state.settings.apiKey || "";
  document.getElementById("settings-temperature").value =
    Number.isFinite(Number(state.settings.temperature)) ? state.settings.temperature : DEFAULT_SETTINGS.temperature;

  const badge = document.getElementById("model-status-badge");
  const isLive = canUseRealtimeAI(state.settings);
  badge.textContent = isLive ? "真实模型已配置" : "本地启发式";
  badge.className = `status-badge ${statusBadgeClass(state.runtimeStatus.kind, isLive)}`;
  document.getElementById("settings-status").textContent = state.runtimeStatus.message;
}

async function handleQuery(event) {
  event.preventDefault();
  if (state.isBusy) {
    return;
  }
  const query = document.getElementById("query-input").value.trim();
  if (!query) {
    return;
  }

  setBusy(true);
  const route = routeQuery(query, state.memories);
  const hits = retrieveMemories(query, state.memories, route.needsMemory);
  let result = {
    query,
    route,
    hits,
    response: buildResponse(query, route, hits),
    runtime: "fallback",
  };

  if (canUseRealtimeAI(state.settings)) {
    try {
      const aiPayload = await buildRealtimeResult(query, route, hits);
      result = mergeRealtimeResult(result, aiPayload);
      setRuntimeStatus("live", `当前使用真实模型：${state.settings.model}`);
    } catch (error) {
      console.error(error);
      const fallbackReason = extractErrorMessage(error);
      result.response.followUps = [
        `真实模型调用失败，已回退到本地启发式模式：${fallbackReason}`,
        ...result.response.followUps,
      ].slice(0, 3);
      setRuntimeStatus("error", `真实模型调用失败，已回退到本地模式：${fallbackReason}`);
    }
  } else {
    setRuntimeStatus("fallback", "当前使用本地启发式模式。保存真实模型配置后，可切到在线生成模式。");
  }

  state.lastResult = result;

  persistLastResult();
  renderResult(state.lastResult);
  renderSettings();
  setBusy(false);
}

function handleMemorySubmit(event) {
  event.preventDefault();
  const type = document.getElementById("memory-type").value;
  const title = document.getElementById("memory-title").value.trim();
  const source = document.getElementById("memory-source").value.trim();
  const summary = document.getElementById("memory-content").value.trim();
  const detail = document.getElementById("memory-detail").value.trim();
  const tags = document
    .getElementById("memory-tags")
    .value.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!title || !summary) {
    return;
  }

  state.memories.unshift({
    id: `m-${Date.now()}`,
    type,
    title,
    source: source || "手动导入",
    summary,
    detail,
    content: summary,
    tags,
    pinned: false,
    ignored: false,
    createdAt: new Date().toISOString().slice(0, 10),
  });

  persistMemories();
  renderMemoryList();
  event.target.reset();
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  state.settings = readSettingsForm();
  persistSettings();
  setRuntimeStatus(
    canUseRealtimeAI(state.settings) ? "live" : "fallback",
    canUseRealtimeAI(state.settings)
      ? `已保存真实模型配置：${state.settings.model}`
      : "配置未完整，当前仍使用本地启发式模式。"
  );
  renderSettings();
}

async function handleTestConnection() {
  const nextSettings = readSettingsForm();
  state.settings = nextSettings;
  persistSettings();
  renderSettings();

  if (!canUseRealtimeAI(nextSettings)) {
    setRuntimeStatus("fallback", "请先填写 Base URL、模型名和 API Key，再测试连接。");
    renderSettings();
    return;
  }

  const button = document.getElementById("test-connection");
  button.disabled = true;
  const previousText = button.textContent;
  button.textContent = "测试中...";

  try {
    await pingRealtimeModel(nextSettings);
    setRuntimeStatus("live", `连接成功，当前可直接使用 ${nextSettings.model}。`);
  } catch (error) {
    setRuntimeStatus("error", `连接失败：${extractErrorMessage(error)}`);
  } finally {
    button.disabled = false;
    button.textContent = previousText;
    renderSettings();
  }
}

function exportMemories() {
  const payload = JSON.stringify(state.memories, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `onebox-os-memories-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function handleImportFile(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  try {
    const raw = await file.text();
    const imported = JSON.parse(raw);
    if (!Array.isArray(imported)) {
      throw new Error("导入文件必须是记忆数组 JSON。");
    }
    state.memories = mergeMemories(state.memories, imported);
    persistMemories();
    renderMemoryList();
    setRuntimeStatus(
      canUseRealtimeAI(state.settings) ? "live" : "fallback",
      `导入成功：新增/更新 ${imported.length} 条记忆。`
    );
  } catch (error) {
    setRuntimeStatus("error", `导入失败：${extractErrorMessage(error)}`);
  } finally {
    event.target.value = "";
    renderSettings();
  }
}

function handleMiniAction(action) {
  if (!state.lastResult) {
    return;
  }

  if (action === "shorten") {
    state.lastResult.response = transformResponseShorter(state.lastResult.response);
  }

  if (action === "formalize") {
    state.lastResult.response = transformResponseFormal(state.lastResult.response);
  }

  if (action === "save") {
    const memory = {
      id: `m-${Date.now()}`,
      type: "note",
      title: `AI 输出：${state.lastResult.route.mode}`,
      source: "OneBox OS",
      summary: state.lastResult.response.summary,
      detail: "",
      content: state.lastResult.response.summary,
      tags: ["AI输出", state.lastResult.route.mode],
      pinned: false,
      ignored: false,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    state.memories.unshift(memory);
    persistMemories();
    renderMemoryList();
  }

  if (action === "todo") {
    const checklist = buildTodoFromResult(state.lastResult);
    state.lastResult.response.followUps = checklist;
  }

  persistLastResult();
  renderResult(state.lastResult);
}

function resetDemo() {
  state.memories = structuredClone(sampleMemories);
  state.lastResult = null;
  persistMemories();
  localStorage.removeItem(LAST_RESULT_KEY);
  renderMemoryList();
  renderEmptyResult();
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem(LAST_RESULT_KEY);
  LEGACY_LAST_RESULT_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem(SETTINGS_KEY);
  state.memories = [];
  state.lastResult = null;
  state.settings = { ...DEFAULT_SETTINGS };
  setRuntimeStatus("fallback", "本地数据和模型配置已清空，当前回到默认原型模式。");
  renderMemoryList();
  renderSettings();
  renderEmptyResult();
}

function renderMemoryList() {
  const container = document.getElementById("memory-list");
  if (!state.memories.length) {
    container.innerHTML = `<div class="empty-state">记忆库为空。先导入几条个人记忆，再让 Router 调用它们。</div>`;
    return;
  }

  container.innerHTML = state.memories
    .map((memory) => {
      const status = [];
      if (memory.pinned) status.push(`<span class="status-chip pinned">固定记忆</span>`);
      if (memory.ignored) status.push(`<span class="status-chip ignored">已忽略</span>`);
      status.push(`<span class="status-chip">${typeLabel(memory.type)}</span>`);

      return `
        <article class="memory-card ${memory.ignored ? "ignored" : ""}">
          <div class="card-top">
            <div>
              <h4>${escapeHtml(memory.title)}</h4>
              <div class="meta-row">
                ${status.join("")}
              </div>
            </div>
            <span class="muted">${escapeHtml(memory.createdAt)}</span>
          </div>
          <div class="memory-layers">
            <div class="memory-layer">
              <strong>摘要卡</strong>
              <p class="memory-text">${escapeHtml(getMemorySummary(memory))}</p>
            </div>
            ${
              getMemoryDetail(memory)
                ? `
                  <details class="memory-detail-toggle">
                    <summary>展开详细内容</summary>
                    <p>${escapeHtml(getMemoryDetail(memory)).replace(/\n/g, "<br />")}</p>
                  </details>
                `
                : ""
            }
          </div>
          <div class="memory-tags">
            ${memory.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="memory-actions">
            <button class="mini-button" data-memory-action="pin" data-id="${memory.id}">
              ${memory.pinned ? "取消固定" : "固定"}
            </button>
            <button class="mini-button" data-memory-action="ignore" data-id="${memory.id}">
              ${memory.ignored ? "恢复" : "忽略"}
            </button>
            <button class="mini-button" data-memory-action="delete" data-id="${memory.id}">
              删除
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  container.querySelectorAll("[data-memory-action]").forEach((button) => {
    button.addEventListener("click", () => updateMemory(button.dataset.id, button.dataset.memoryAction));
  });
}

function updateMemory(id, action) {
  state.memories = state.memories
    .map((memory) => {
      if (memory.id !== id) return memory;
      if (action === "pin") return { ...memory, pinned: !memory.pinned };
      if (action === "ignore") return { ...memory, ignored: !memory.ignored };
      return memory;
    })
    .filter((memory) => !(action === "delete" && memory.id === id));

  persistMemories();
  renderMemoryList();
}

function renderResult(result) {
  const routeBadge = document.getElementById("route-badge");
  routeBadge.textContent = result.route.mode;
  routeBadge.className = `route-badge ${modeConfig[result.route.mode].className}`;

  document.getElementById("route-summary").innerHTML = `
    <div class="response-block">
      <h4>我的判断</h4>
      <p>${escapeHtml(result.route.explanation)}</p>
    </div>
    <div class="response-block">
      <h4>为什么这么判</h4>
      <ul>${result.route.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul>
    </div>
  `;

  document.getElementById("trace-output").innerHTML = `
    <div class="trace-pill-list">
      ${Object.entries(result.route.scores)
        .map(
          ([mode, score]) =>
            `<span class="trace-pill">${escapeHtml(mode)} ${score.toFixed(1)}</span>`
        )
        .join("")}
    </div>
    <p><strong>回答引擎：</strong>${result.runtime === "live" ? escapeHtml(state.settings.model) : "本地启发式"}</p>
    <p><strong>是否需要长期记忆：</strong>${result.route.needsMemory ? "是" : "否"}</p>
    <p><strong>是否优先澄清：</strong>${result.route.mode === "Clarify" ? "是" : "否"}</p>
    <p><strong>置信度：</strong>${Math.round(result.route.confidence * 100)}%</p>
  `;

  document.getElementById("response-output").innerHTML = `
    <div class="response-block">
      <h4>最终回答</h4>
      <p>${escapeHtml(result.response.summary).replace(/\n/g, "<br />")}</p>
    </div>
    <div class="response-block">
      <h4>下一步</h4>
      <ul>${result.response.followUps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ul>
    </div>
  `;

  renderEvidence(result.hits);
}

function renderEvidence(hits) {
  const container = document.getElementById("evidence-list");
  if (!hits.length) {
    container.innerHTML = `这次回答没有调用长期记忆。你也可以继续导入更多个人内容，让回答更有个性。`;
    return;
  }

  container.innerHTML = hits
    .map(
      (memory) => `
        <article class="evidence-card">
          <h4>${escapeHtml(memory.title)}</h4>
          <p class="muted">${escapeHtml(memory.source)} · ${escapeHtml(memory.createdAt)}</p>
          <div class="evidence-layers">
            <div class="evidence-layer">
              <strong>摘要卡</strong>
              <p>${escapeHtml(getMemorySummary(memory))}</p>
            </div>
            ${
              getMemoryDetail(memory)
                ? `
                  <details class="evidence-detail-toggle">
                    <summary>展开详细内容</summary>
                    <p>${escapeHtml(getMemoryDetail(memory)).replace(/\n/g, "<br />")}</p>
                  </details>
                `
                : ""
            }
          </div>
        </article>
      `
    )
    .join("");
}

function renderEmptyResult() {
  document.getElementById("route-badge").textContent = "等待输入";
  document.getElementById("route-badge").className = "route-badge";
  document.getElementById("route-summary").textContent =
    "输入一句话后，这里会显示模式判断、置信度和为什么这么判。";
  document.getElementById("response-output").textContent =
    "回答会显示在这里。若调用了长期记忆，会在右侧显示引用来源。";
  document.getElementById("trace-output").textContent =
    "这里会显示模式分数、是否触发澄清、是否调用长期记忆。";
  document.getElementById("evidence-list").textContent =
    "相关记忆会显示在这里，所有回答都能追溯到来源。";
}

function routeQuery(query, memories) {
  const scores = {};
  const lower = query.toLowerCase();
  const activeMemories = memories.filter((memory) => !memory.ignored);
  const ambiguous = query.length < 14 || /这个|那个|一下|帮我看看|完善一下|想一想/.test(query);
  const multiIntent = /并且|同时|顺便|再|然后|还要/.test(query);

  Object.entries(modeConfig).forEach(([mode, config]) => {
    scores[mode] = config.keywords.reduce((sum, keyword) => {
      return sum + (lower.includes(keyword.toLowerCase()) ? 1.2 : 0);
    }, 0);
  });

  if (/基于|根据|结合|我之前|最近/.test(query)) {
    scores.Search += 0.8;
    scores.Analyze += 0.5;
    scores.Write += 0.5;
  }

  if (/帮我|整理|总结|规划|方案/.test(query)) {
    scores.Analyze += 0.7;
    scores.Write += 0.7;
  }

  if (ambiguous) {
    scores.Clarify += 1.4;
  }

  if (multiIntent) {
    scores.Clarify += 0.9;
    scores.Analyze += 0.3;
  }

  if (/保存|记住|待办|沉淀/.test(query)) {
    scores.Act += 1.4;
  }

  const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topMode, topScore] = ranking[0];
  const [, secondScore] = ranking[1];
  let mode = topMode;

  if ((ambiguous && topScore < 2.2) || Math.abs(topScore - secondScore) < 0.35) {
    mode = "Clarify";
  }

  const needsMemory =
    mode !== "Clarify" &&
    (/(我|之前|最近|记录|记忆|提过|结合|根据)/.test(query) || activeMemories.length > 0);

  const reasons = [
    `命中关键词最多的是 ${topMode}，当前问题更像在做“${modeConfig[topMode].description}”`,
    ambiguous ? "问题表达较模糊，系统提高了澄清优先级" : "问题目标较清晰，可以直接进入主任务模式",
    needsMemory ? "问题依赖个人上下文，应该先召回长期记忆再回答" : "问题更偏通用回答，长期记忆只做补充参考",
  ];

  const explanationMap = {
    Clarify: "这句话还不够具体，我会先缩小目标，再给更高命中的答案。",
    Search: "这更像找线索和找依据的任务，应该先从长期记忆里找相关片段。",
    Write: "这是典型的生成型任务，适合先抽取你的个人上下文，再写一版可用内容。",
    Analyze: "这更像需要拆问题和给判断的任务，应该基于记忆做结构化分析。",
    Act: "这类需求已经接近轻量执行，系统可以直接帮你沉淀为待办或新记忆。",
  };

  return {
    mode,
    confidence: Math.min(0.95, 0.55 + topScore / 5),
    scores,
    reasons,
    needsMemory,
    explanation: explanationMap[mode],
  };
}

function retrieveMemories(query, memories, shouldRetrieve) {
  if (!shouldRetrieve) {
    return [];
  }

  const tokens = tokenize(query);
  const activeMemories = memories.filter((memory) => !memory.ignored);
  const scored = activeMemories
    .map((memory) => ({
      ...memory,
      score: scoreMemory(memory, tokens),
    }))
    .filter((memory) => memory.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3);
}

function scoreMemory(memory, tokens) {
  const summary = getMemorySummary(memory);
  const detail = getMemoryDetail(memory);
  const corpus = `${memory.title} ${summary} ${detail} ${memory.tags.join(" ")} ${memory.source}`.toLowerCase();
  let score = memory.pinned ? 1.2 : 0;
  tokens.forEach((token) => {
    if (token.length >= 2 && corpus.includes(token.toLowerCase())) {
      score += token.length > 4 ? 1.1 : 0.65;
      if (summary.toLowerCase().includes(token.toLowerCase())) {
        score += 0.18;
      }
    }
  });
  return score;
}

function buildResponse(query, route, hits) {
  const memoryDigest = hits.map((memory) => `《${memory.title}》`).join("、");
  const memorySnippet = hits
    .map((memory) => {
      const summary = getMemorySummary(memory);
      return `- ${memory.title}：${summary.slice(0, 48)}${summary.length > 48 ? "..." : ""}`;
    })
    .join("\n");
  const tagDigest = summarizeTags(hits).join("、");

  if (route.mode === "Clarify") {
    return {
      summary:
        "我先不急着直接生成，因为这句话的目标还比较宽。你可以告诉我是更想要方案拆解、文案草稿、还是从历史记录里找依据。默认建议是先缩小成一个最重要的问题，再继续。",
      followUps: [
        "补充你最想得到的结果，比如“给我一个方向结论”或“直接写一版介绍”",
        "如果你希望结合历史记录，就明确说“根据我之前的记忆”",
        "如果这是多意图任务，先拆成 2 步会更稳定",
      ],
    };
  }

  if (route.mode === "Search") {
    return {
      summary: hits.length
        ? `我从长期记忆里找到 ${hits.length} 条高相关记录，主要集中在 ${memoryDigest}${tagDigest ? `，主题落在 ${tagDigest}` : ""}。\n\n相关线索如下：\n${memorySnippet}`
        : "我没有找到直接相关的长期记忆。建议先导入一批笔记、截图摘录或语音转写，再让系统基于个人上下文搜索。",
      followUps: hits.length
        ? [
            "继续让我把这些线索整理成一页项目讲稿",
            "继续问：这几条记忆之间的共同方法论是什么",
            `当前引用来源：${hits.map((memory) => memory.source).join("、")}`,
          ]
        : ["先导入 3-5 条记忆", "再问一次更具体的问题", "优先导入有标题和来源的内容"],
    };
  }

  if (route.mode === "Write") {
    const introQuery = /自我介绍|介绍|打招呼|开场/.test(query);
    const opening = hits.length
      ? `这版写作会优先调用 ${memoryDigest} 里的信息。`
      : "当前没有足够的个人记忆，我会先给一版偏通用的初稿。";
    return {
      summary: introQuery
        ? `${opening}\n\n第一版草稿：\n${buildIntroDraft(hits)}`
        : `${opening}\n\n第一版草稿：\n${buildWritingDraft(hits)}`,
      followUps: [
        "继续改成更像面试口语表达的版本",
        "继续压缩成 120 字以内",
        hits.length ? `这版草稿已结合：${memoryDigest}` : "下一步建议补导入你的个人笔记再重写一次",
      ],
    };
  }

  if (route.mode === "Act") {
    return {
      summary: `我已经把这个需求理解成轻量执行任务。当前最合适的动作不是接复杂外部系统，而是先帮你沉淀成可追踪结果。建议动作如下：\n1. 把当前结论保存为新记忆\n2. 生成 3 条下一步待办\n3. 固定最关键的背景记忆，避免下次回答重新走弯路`,
      followUps: buildTodoFromResult({ query, route, hits }),
    };
  }

  return {
    summary: hits.length
      ? buildAnalysisSummary(query, hits, memorySnippet)
      : "如果只从任务本身看，这更像一个需要先拆问题再给判断的分析题。建议先补充几条和目标相关的个人记忆，这样分析会更有你的个人风格。",
    followUps: [
      "把结论改成可直接复述的 3 点版本",
      "继续拆成面试回答或项目讲稿",
      "告诉我这几个判断分别来自哪条长期记忆",
    ],
  };
}

function transformResponseShorter(response) {
  const shorterSummary = response.summary
    .split("\n")
    .slice(0, 3)
    .join("\n");
  return {
    ...response,
    summary: `${shorterSummary}\n\n精简版：重点是“任务先路由，记忆按需调用，回答必须可解释”。`,
  };
}

function transformResponseFormal(response) {
  return {
    ...response,
    summary: `更正式的表达方式如下：\n\n${response.summary}\n\n建议保留“任务路由、长期记忆、可解释来源、持续协作”这四个关键词。`,
  };
}

function buildTodoFromResult(result) {
  return [
    "明确这次想产出的最终格式，例如自我介绍、项目讲稿或方法论总结",
    "把 2-3 条最关键的背景卡片固定，避免下次重复铺垫",
    "把当前回答继续改到可以直接复用，而不是停留在草稿层",
  ];
}

function setBusy(nextBusy) {
  state.isBusy = nextBusy;
  const submitButton = document.querySelector('#query-form button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = nextBusy;
    submitButton.textContent = nextBusy ? "处理中..." : "开始处理";
  }

  const routeBadge = document.getElementById("route-badge");
  if (nextBusy) {
    routeBadge.textContent = "处理中";
    routeBadge.className = "route-badge route-analyze";
    document.getElementById("route-summary").textContent =
      "正在判断任务模式、召回相关记忆，并尝试生成一版可直接使用的回答。";
    document.getElementById("response-output").textContent =
      "请稍等，OneBox OS 正在结合任务路由和长期记忆生成结果。";
    document.getElementById("trace-output").textContent =
      "处理中：如果你已配置真实模型，这一步会优先走在线生成；否则会回退到本地启发式模式。";
  }
}

function setRuntimeStatus(kind, message) {
  state.runtimeStatus = { kind, message };
}

function statusBadgeClass(kind, isLiveConfig) {
  if (kind === "error") return "status-error";
  if (kind === "live" || isLiveConfig) return "status-live";
  return "status-fallback";
}

function readSettingsForm() {
  return {
    baseUrl: document.getElementById("settings-base-url").value.trim(),
    model: document.getElementById("settings-model").value.trim(),
    apiKey: document.getElementById("settings-api-key").value.trim(),
    temperature: clampNumber(document.getElementById("settings-temperature").value, 0, 1.5, DEFAULT_SETTINGS.temperature),
  };
}

function canUseRealtimeAI(settings) {
  return Boolean(settings && settings.baseUrl && settings.model && settings.apiKey);
}

async function pingRealtimeModel(settings) {
  await callRealtimeModel(
    [
      {
        role: "system",
        content: "你是连通性测试助手。只返回 OK。",
      },
      {
        role: "user",
        content: "请只返回 OK。",
      },
    ],
    settings,
    0
  );
}

async function buildRealtimeResult(query, route, hits) {
  const memoryContext = hits.length
    ? hits
        .map((memory, index) => {
          return [
            `# Memory ${index + 1}`,
            `title: ${memory.title}`,
            `source: ${memory.source}`,
            `summary: ${getMemorySummary(memory)}`,
            `detail: ${getMemoryDetail(memory) || "无"}`,
            `tags: ${memory.tags.join(", ") || "无"}`,
          ].join("\n");
        })
        .join("\n\n")
    : "无可用长期记忆";

  const systemPrompt = [
    "你是 OneBox OS 的核心智能引擎。",
    "你的任务是：基于用户问题、启发式路由判断和召回到的长期记忆，输出一份严格 JSON。",
    "JSON schema:",
    '{',
    '  "mode": "Clarify|Search|Write|Analyze|Act",',
    '  "explanation": "一句话解释为什么这么路由",',
    '  "reasons": ["原因1", "原因2", "原因3"],',
    '  "needsMemory": true,',
    '  "summary": "给用户的最终回答，使用中文，可直接展示",',
    '  "followUps": ["下一步1", "下一步2", "下一步3"]',
    '}',
    "要求：",
    "1. 只输出 JSON，不要输出 markdown 代码块。",
    "2. 回答必须结合记忆；如果记忆不足，也要明确指出缺口。",
    "3. mode 必须是五个枚举之一。",
    "4. followUps 保持 2-3 条，适合继续推动任务。",
  ].join("\n");

  const userPrompt = [
    `用户问题：${query}`,
    `启发式模式：${route.mode}`,
    `启发式说明：${route.explanation}`,
    `启发式原因：${route.reasons.join(" | ")}`,
    `是否建议调用长期记忆：${route.needsMemory ? "是" : "否"}`,
    `长期记忆如下：\n${memoryContext}`,
  ].join("\n\n");

  const content = await callRealtimeModel(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    state.settings,
    state.settings.temperature
  );

  const parsed = extractJsonObject(content);
  if (!parsed.summary) {
    throw new Error("模型返回缺少 summary 字段。");
  }
  return parsed;
}

function mergeRealtimeResult(baseResult, aiPayload) {
  const nextMode = modeConfig[aiPayload.mode] ? aiPayload.mode : baseResult.route.mode;
  return {
    ...baseResult,
    runtime: "live",
    route: {
      ...baseResult.route,
      mode: nextMode,
      explanation: aiPayload.explanation || baseResult.route.explanation,
      reasons: Array.isArray(aiPayload.reasons) && aiPayload.reasons.length
        ? aiPayload.reasons.slice(0, 3)
        : baseResult.route.reasons,
      needsMemory:
        typeof aiPayload.needsMemory === "boolean"
          ? aiPayload.needsMemory
          : baseResult.route.needsMemory,
    },
    response: {
      summary: String(aiPayload.summary).trim(),
      followUps:
        Array.isArray(aiPayload.followUps) && aiPayload.followUps.length
          ? aiPayload.followUps.slice(0, 3).map((item) => String(item))
          : baseResult.response.followUps,
    },
  };
}

async function callRealtimeModel(messages, settings, temperature) {
  const baseUrl = settings.baseUrl.replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.model,
      temperature,
      messages,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}：${text.slice(0, 180)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("接口返回为空，未拿到模型内容。");
  }
  return content;
}

function extractJsonObject(rawText) {
  const text = String(rawText || "").trim();
  try {
    return JSON.parse(text);
  } catch (error) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("模型返回不是有效 JSON。");
    }
    return JSON.parse(text.slice(start, end + 1));
  }
}

function extractErrorMessage(error) {
  return String(error?.message || error || "未知错误");
}

function clampNumber(value, min, max, fallback) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}

function tokenize(text) {
  return (text.match(/[\u4e00-\u9fa5]{2,}|[a-zA-Z0-9-]+/g) || []).map((token) =>
    token.toLowerCase()
  );
}

function persistMemories() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.memories));
}

function persistLastResult() {
  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(state.lastResult));
}

function persistSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function loadMemories() {
  const current = safeReadJson(STORAGE_KEY);
  if (Array.isArray(current)) {
    return mergeMemories(sampleMemories, current);
  }

  const legacyMemories = LEGACY_STORAGE_KEYS.flatMap((key) => {
    const value = safeReadJson(key);
    return Array.isArray(value) ? value : [];
  });
  const merged = mergeMemories(sampleMemories, legacyMemories);
  persistMemoriesToKey(STORAGE_KEY, merged);
  return merged;
}

function loadLastResult() {
  const current = safeReadJson(LAST_RESULT_KEY);
  if (current) return current;
  for (const key of LEGACY_LAST_RESULT_KEYS) {
    const legacy = safeReadJson(key);
    if (legacy) return legacy;
  }
  return null;
}

function loadSettings() {
  const current = safeReadJson(SETTINGS_KEY);
  return {
    ...DEFAULT_SETTINGS,
    ...(current || {}),
  };
}

function typeLabel(type) {
  const labels = {
    note: "文字笔记",
    screenshot: "截图摘录",
    voice: "语音转写",
    web: "网页剪藏",
  };
  return labels[type] || type;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function summarizeTags(memories, limit = 4) {
  const counts = new Map();
  memories.forEach((memory) => {
    memory.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

function buildIntroDraft(hits) {
  const profile = pickMemory(["基础信息", "个人档案"]);
  const strengths = pickMemory(["核心优势"]);
  const eraAngel = pickMemory(["时代天使"]);
  const dewu = pickMemory(["得物"]);
  const nio = pickMemory(["蔚来"]);
  const aiNative = pickMemory(["AI Native"]);

  return [
    "面试官您好，我是刘存会，湘潭大学应用统计学硕士，2026 年 6 月毕业。",
    strengths
      ? "我和 AI 产品经理岗位的匹配点主要有三块：一是有真实的 AI 应用落地经历，二是有数据评估与闭环能力，三是具备 AI Native 的原型和工作流能力。"
      : "",
    eraAngel
      ? "在时代天使，我从 0 到 1 推进过 AI 沟通记录摘要产品，完成需求定义、技术选型、Prompt / RAG 设计、评估体系和灰度迭代闭环，最终做到 45 秒内生成结构化摘要，准确率 90%，设计师归档效率提升 80%+。"
      : "",
    dewu || nio
      ? `同时，我在${dewu ? "得物" : ""}${dewu && nio ? "和" : ""}${nio ? "蔚来" : ""}做过 AI 场景的数据分析、版本验证和 bad case 归因，更习惯用指标去判断方案是否真的有效。`
      : "",
    aiNative
      ? "除此之外，我会用 Cursor、Dify 和结构化工作流快速把想法做成原型，这让我在 AI 产品里不只是提需求，也能更快推进验证。"
      : "",
    profile ? "我现在主投 AI 产品经理，也希望把这套从模型能力到产品闭环的方法论带到新团队里。" : "",
  ]
    .filter(Boolean)
    .join("");
}

function buildWritingDraft(hits) {
  if (!hits.length) {
    return "这是一个围绕个人背景与长期记忆协作的 AI 工作台。用户输入一句话，系统会先判断任务类型，再按需调用相关记忆，输出可继续推进的结果。";
  }

  return `基于 ${hits.map((memory) => memory.title).join("、")} 这几条记忆，可以先写成这样：我具备从 AI 应用落地、数据评估闭环到 AI Native 原型搭建的复合能力。过去的项目既覆盖垂直场景的 Prompt / RAG / Workflow 设计，也覆盖指标体系、bad case 归因和版本验证，因此输出不仅能讲故事，也能讲清楚为什么这样做、如何验证有效。`;
}

function buildAnalysisSummary(query, hits, memorySnippet) {
  const askingForStrengths = /卖点|优势|匹配|为什么适合/.test(query);
  const askingForPrep = /复习|准备|优先|明天要面|面试/.test(query);
  const askingForMethod = /方法论|评估|流程|框架/.test(query);

  if (askingForStrengths) {
    return [
      "基于这次召回的长期记忆，我建议对外稳定强调 3 个核心卖点：",
      "1. 有真实的 AI 应用 0 到 1 落地能力：时代天使项目覆盖需求定义、技术选型、Prompt / RAG、评估与灰度迭代，并拿到 45 秒、90% 准确率、效率提升 80%+ 的结果。",
      "2. 有把 AI 做成数据闭环的能力：得物和蔚来的经历让你不只会讲方案，还会讲指标、bad case、版本验证和 ROI。",
      "3. 有 AI Native 的工作方式：能用 Cursor、Dify、Markdown 工作流快速把想法做成原型或自动化链路，体现推进速度和产品判断。",
    ].join("\n");
  }

  if (askingForPrep) {
    return [
      "如果明天就面 AI 产品经理，我会按优先级复习这 3 件事：",
      "1. 先把时代天使项目讲熟，尤其是评估三件套、Prompt / RAG 迭代、为什么不用微调。",
      "2. 再补齐 RAG 细节和面试短板，包括 overlap、rerank、TopK 区分，以及主 Chat / 搜索 / Agent 的边界理解。",
      "3. 最后准备一套稳定表达框架，把自我介绍、核心卖点、项目深挖都压成先结论后展开的版本，减少填充词和重复铺垫。",
    ].join("\n");
  }

  if (askingForMethod) {
    return `这次召回的记忆里，方法论最集中的部分有两条：一是 ${hits[0]?.title || "评估与迭代"}，二是 ${hits[1]?.title || "Prompt / RAG 设计"}。\n\n如果压成一句话，就是先定义任务和验收标准，再通过评分表、bad case 归因和结构化回归测试，把问题定位到 Prompt、知识库、模型能力或输入质量中的具体一层。`;
  }

  return `基于这次召回的长期记忆，我看到你最稳定的能力结构是“AI 应用落地 + 数据闭环 + AI Native 工作流”。\n\n我综合了以下线索：\n${memorySnippet}\n\n这些记忆说明，你的优势不在单点技术名词，而在于能把场景拆解、方法论沉淀和实际结果串成完整闭环。`;
}

function pickMemory(keywords) {
  const lowerKeywords = keywords.map((keyword) => keyword.toLowerCase());
  return state.memories.find((memory) => {
    if (memory.ignored) return false;
    const corpus = `${memory.title} ${getMemorySummary(memory)} ${getMemoryDetail(memory)} ${memory.tags.join(
      " "
    )}`.toLowerCase();
    return lowerKeywords.some((keyword) => corpus.includes(keyword));
  });
}

function safeReadJson(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function persistMemoriesToKey(key, memories) {
  localStorage.setItem(key, JSON.stringify(memories));
}

function mergeMemories(baseMemories, existingMemories) {
  const merged = new Map();

  baseMemories.forEach((memory) => {
    const normalized = normalizeMemory(memory);
    merged.set(memoryFingerprint(normalized), normalized);
  });

  existingMemories
    .filter((memory) => memory && !isLegacySeedMemory(memory))
    .forEach((memory) => {
      const normalized = normalizeMemory(memory);
      const key = memoryFingerprint(normalized);
      if (merged.has(key)) {
        const previous = merged.get(key);
        if (isSeedMemory(previous) || isSeedMemory(normalized)) {
          merged.set(key, {
            ...previous,
            pinned: normalized.pinned || previous.pinned,
            ignored: normalized.ignored || previous.ignored,
          });
          return;
        }
        merged.set(key, {
          ...previous,
          ...normalized,
          summary: normalized.summary || previous.summary,
          detail: normalized.detail || previous.detail,
          content: normalized.summary || previous.summary,
          tags: normalized.tags.length ? normalized.tags : previous.tags,
        });
      } else {
        merged.set(key, normalized);
      }
    });

  return [...merged.values()].sort(sortMemories);
}

function normalizeMemory(memory) {
  const summary = String(memory.summary || memory.content || "").trim();
  const detail = String(memory.detail || "").trim();
  return {
    id: memory.id || `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: memory.type || "note",
    title: String(memory.title || "").trim(),
    source: String(memory.source || "手动导入").trim(),
    createdAt: String(memory.createdAt || IMPORT_BATCH_DATE).slice(0, 10),
    pinned: Boolean(memory.pinned),
    ignored: Boolean(memory.ignored),
    tags: Array.isArray(memory.tags) ? memory.tags.filter(Boolean) : [],
    summary,
    detail,
    content: summary,
  };
}

function memoryFingerprint(memory) {
  return `${normalizeText(memory.title)}::${normalizeText(memory.source)}`;
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function isLegacySeedMemory(memory) {
  return LEGACY_SEED_TITLES.has(String(memory.title || "").trim());
}

function isSeedMemory(memory) {
  return String(memory.id || "").startsWith("seed-");
}

function sortMemories(a, b) {
  if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
  return String(b.createdAt).localeCompare(String(a.createdAt));
}

function getMemorySummary(memory) {
  return String(memory.summary || memory.content || "").trim();
}

function getMemoryDetail(memory) {
  return String(memory.detail || "").trim();
}
