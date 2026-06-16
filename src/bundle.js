// ===== AI 标书精灵 Bundle =====

// ---- sampleData.js ----
const kexunEnterprise = {
  name: '重庆科讯科技有限公司',
  slogan: '办公终端、信息化设备供应与本地化服务供应商',
  businessLicense: {
    registeredAuthority: '重庆市九龙坡区市场监督管理局',
    address: '重庆市九龙坡区科创路65号1-8-3号',
    status: '已从响应文件识别营业执照复印件存在。统一社会信用代码、注册资本、成立日期、经营范围需 OCR/人工补充。',
    evidence: '响应文件正文提及由重庆市九龙坡区市场监督管理局签发的法人营业执照副本复印件。'
  },
  qualifications: [
    { name: '营业执照', level: '企业基础资格', validTo: '2099-12-31', evidence: '已识别营业执照复印件存在。核心字段需 OCR/人工补充。' },
    { name: '重庆市社会保险参保证明', level: '社保缴纳证明', validTo: '2099-12-31', evidence: '响应文件出现社会保险参保证明。证明期间待补充。' },
    { name: '完税证明', level: '税收缴纳证明', validTo: '2099-12-31', evidence: '响应文件出现完税证明。税款所属期和税种待补充。' },
    { name: '资产负债表', level: '财务资料', validTo: '2099-12-31', evidence: '响应文件出现资产负债表。资产、负债、所有者权益等数值待补充。' }
  ],
  cases: [
    {
      name: '重庆市教育矫治局办公终端采购响应项目',
      industry: '政府采购/办公终端设备',
      amount: 54240,
      year: 2024,
      tags: ['办公终端', '华为擎云C7', 'HarmonyOS', '设备供货', '原厂质保', '政府采购'],
      customer: '重庆市教育矫治局',
      evidence: '响应文件报价函和报价一览表显示项目名称、采购单位、报价总价、设备参数和质保承诺。'
    }
  ],
  devices: [
    {
      name: '华为擎云 C7 第二代 11.5 寸办公终端',
      os: 'HarmonyOS 4.2',
      rom: '256GB',
      ram: '8GB',
      battery: '8800mAh',
      resolution: '2800 x 1840',
      screenPpi: '291 PPI',
      rearCamera: '1300 万像素',
      frontCamera: '800 万像素',
      keyboard: 'KB11',
      certifications: ['型号核准(中国)', 'CCC(中国)', '航空运输鉴定', '节能认证', '中国环保等级CQC', 'RoHS认证(中国)', '德国莱茵硬件低蓝光认证', '德国莱茵无频闪认证', '中国环境标志产品认证', '蓝牙认证及WIFI认证'],
      evidence: '响应文件技术参数响应和认证列表。'
    }
  ],
  capabilities: [
    '办公终端设备供货',
    '华为擎云C7设备响应',
    'HarmonyOS办公终端配置',
    '设备参数响应',
    '政府采购响应文件编制',
    '报价测算与包干报价',
    '原厂质保服务协调',
    '本地化电话服务支持',
    '设备质量保障',
    '本地化售后技术服务'
  ],
  service: {
    localOffice: true,
    responseHours: 24,
    warranty: '办公终端整机不低于1年原厂质保，配套键盘质保1年。',
    evidence: '响应文件提供重庆本地地址和电话；响应文件中承诺1年原厂质保，小时级响应时效需人工确认。',
    pricing: '报价为包干价，包括完成项目所需人工费、经营管理费、利润、税费、交通费、通讯费等全部费用。'
  },
  contact: {
    address: '重庆市九龙坡区科创路65号1-8-3号',
    phone: '023-68797240',
    fax: '68797240',
    contactPerson: '李玉娥',
    mobile: '13983097210',
    email: '（响应文件中未提供邮箱，需人工补充）'
  },
  taxProofs: [
    {
      name: '完税证明',
      status: '已识别材料存在。税款所属期、税种、证明编号需 OCR/人工补充。',
      evidence: '响应文件目录/正文出现完税证明。'
    }
  ],
  financialStatements: [
    {
      name: '资产负债表',
      status: '已识别材料存在。资产总额、负债总额、所有者权益等关键数值需 OCR/人工补充。',
      evidence: '响应文件出现资产负债表。'
    }
  ],
  pendingEvidence: [
    '营业执照统一社会信用代码、注册资本、成立日期、经营范围',
    '社保证明所属期间、参保人数',
    '完税证明所属期间、税种、证明编号',
    '资产负债表资产总额、负债总额、所有者权益',
    '产品认证证书编号和有效期',
    '企业更多历史项目案例',
    '售后服务小时级响应承诺的正式证明'
  ],
  productCertifications: [
    { name: '型号核准(中国)', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' },
    { name: 'CCC(中国)', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' },
    { name: '航空运输鉴定', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' },
    { name: '节能认证', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' },
    { name: '中国环保等级CQC', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' },
    { name: 'RoHS认证(中国)', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' },
    { name: '德国莱茵硬件低蓝光认证', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' },
    { name: '德国莱茵无频闪认证', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' },
    { name: '中国环境标志产品认证', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' },
    { name: '蓝牙认证及WIFI认证', status: '已从产品技术参数表识别，证书编号需 OCR/人工补充。' }
  ],
  proposalTemplates: {
    commitment: '承诺未受到暂扣许可证件、降低资质等级、吊销许可证件、限制开展生产经营活动、责令停产停业、责令关闭、限制从业等行政处罚；未处于或未曾处于被执行人、失信被执行人状态；未处于重大税收违法案件当事人名单或政府采购严重违法失信行为记录名单状态。',
    warranty: '为办公终端整机提供不低于1年原厂质保，配套键盘质保1年。',
    pricing: '报价为包干价，包括完成项目所需人工费、经营管理费、利润、税费、交通费、通讯费等全部费用。',
    basicQualification: '公司具有独立承担民事责任的能力；参加政府采购活动前三年内，在经营活动中没有重大违法记录；具有良好的商业信誉和健全的财务会计制度；具有履行合同所必需的设备和专业技术能力；有依法缴纳税收和社会保障资金的良好记录。'
  },
  extractionWarnings: [
    '该 DOCX 可直接抽取文本约 4.7KB，可能存在证照扫描图片未被 OCR 识别。',
    '营业执照统一社会信用代码、注册资本、成立日期等关键信息未在可读文本中出现，需要 OCR 或人工补充。',
    '社保、完税、财务报表的具体日期和金额未在可读文本中出现，需要 OCR 或人工补充。',
    '该响应文件主要体现办公终端采购项目，不足以完整代表企业全部技术能力和历史案例。'
  ]
};

const sampleTenderText = `项目名称：重庆市某单位办公终端采购项目

投标人资格要求：
1. 投标人须具有有效营业执照。
2. 近三年具有不少于2个类似办公终端供货项目业绩，单项合同金额不低于5万元。
3. 项目团队须具备本地化服务能力，售后响应时间不超过24小时。

评分办法：
商务部分20分，技术部分50分，价格部分30分。
技术方案应包括项目理解、实施方案、质量保障、售后服务方案。

废标条款：
未按要求提供有效资质证书或未响应实质性条款的，按无效投标处理。`;


// ---- bidEngine.js ----
const TODAY = '2026-06-15';

const requirementPatterns = [
  {
    type: 'qualification',
    keywords: ['营业执照', 'ISO9001', '认证', '资质证书', '资格'],
    title: '有效资质证书要求'
  },
  {
    type: 'case',
    keywords: ['类似', '业绩', '合同金额'],
    title: '类似项目业绩要求'
  },
  {
    type: 'service',
    keywords: ['本地化服务', '售后', '响应时间'],
    title: '本地化售后服务要求'
  },
  {
    type: 'technical',
    keywords: ['技术方案', '实施方案', '质量保障', '售后服务方案'],
    title: '技术方案章节要求'
  },
  {
    type: 'risk',
    keywords: ['废标', '无效投标', '实质性条款'],
    title: '废标风险条款'
  }
];

function getTenderFileSupport(fileName) {
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith('.txt') || lowerName.endsWith('.md') || lowerName.endsWith('.json')) {
    return {
      supported: true,
      reason: '支持文本类招标文件，可直接读取并解析。'
    };
  }

  if (lowerName.endsWith('.docx')) {
    return {
      supported: true,
      reason: '支持 Word .docx 招标文件，将尝试读取文档正文文本。'
    };
  }

  if (lowerName.endsWith('.doc')) {
    return {
      supported: true,
      reason: '支持旧版 Word .doc 招标文件，将尝试从文件中提取可读正文。'
    };
  }

  if (lowerName.endsWith('.pdf')) {
    return {
      supported: false,
      reason: '当前 demo 不直接解析 PDF，需要后续接入 OCR/文档解析服务。'
    };
  }

  return {
    supported: false,
    reason: '当前 demo 仅支持 .txt、.md、.json、.doc、.docx 文件。'
  };
}

function normalizeEnterpriseProfile(input) {
  const errors = [];
  const name = String(input.name ?? '').trim();
  const slogan = String(input.slogan ?? '').trim();
  const qualifications = parseQualifications(input.qualificationsText ?? '');
  const cases = parseCases(input.casesText ?? '');
  const capabilities = splitList(input.capabilitiesText ?? '');
  const responseHours = Number(input.responseHours);
  const originalEnterprise = input.originalEnterprise ?? {};

  if (!name) errors.push('请填写企业名称。');
  if (qualifications.length === 0) errors.push('请至少填写一项企业资质。');
  if (!Number.isFinite(responseHours) || responseHours <= 0) errors.push('请填写有效的售后响应小时数。');

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    enterprise: {
      ...pickEnterpriseExtensions(originalEnterprise),
      name,
      slogan,
      qualifications,
      cases,
      capabilities,
      service: {
        ...(originalEnterprise.service ?? {}),
        localOffice: Boolean(input.localOffice),
        responseHours
      }
    }
  };
}

function pickEnterpriseExtensions(enterprise) {
  return {
    businessLicense: enterprise.businessLicense,
    devices: enterprise.devices ?? [],
    contact: enterprise.contact,
    taxProofs: enterprise.taxProofs ?? [],
    financialStatements: enterprise.financialStatements ?? [],
    pendingEvidence: enterprise.pendingEvidence ?? [],
    productCertifications: enterprise.productCertifications ?? [],
    proposalTemplates: enterprise.proposalTemplates,
    extractionWarnings: enterprise.extractionWarnings ?? []
  };
}

function extractTenderRequirements(tenderText) {
  const normalized = tenderText.replace(/\r/g, '').trim();
  const lines = normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const requirements = [];
  for (const pattern of requirementPatterns) {
    const line = findBestRequirementLine(lines, pattern);

    if (line) {
      requirements.push({
        id: `req-${requirements.length + 1}`,
        type: pattern.type,
        title: pattern.title,
        content: line.replace(/^\d+[.、]\s*/, ''),
        source: `招标文件片段：${line}`,
        mandatory: pattern.type !== 'technical'
      });
    }
  }

  return requirements;
}

function findBestRequirementLine(lines, pattern) {
  const candidates = lines
    .filter((candidate) => pattern.keywords.some((keyword) => candidate.includes(keyword)))
    .map((candidate) => ({
      line: candidate,
      score: scoreRequirementLine(candidate, pattern)
    }))
    .sort((a, b) => b.score - a.score);

  return candidates[0]?.line;
}

function scoreRequirementLine(line, pattern) {
  let score = 0;
  for (const keyword of pattern.keywords) {
    if (line.includes(keyword)) score += keyword.length;
  }

  if (/^\d+[.、]/.test(line)) score += 8;
  if (line.endsWith('要求：') || line.endsWith('要求:') || line.endsWith('评分办法：')) score -= 10;
  if (pattern.type === 'qualification' && line.includes('营业执照')) score += 12;
  if (pattern.type === 'case' && (line.includes('业绩') || line.includes('合同金额'))) score += 12;
  if (pattern.type === 'service' && line.includes('响应时间')) score += 12;

  return score;
}

function parseQualifications(text) {
  return String(text)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = '', level = '未填写', validTo = '2099-12-31'] = line.split('|').map((part) => part.trim());
      return { name, level, validTo };
    })
    .filter((item) => item.name);
}

function parseCases(text) {
  return String(text)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = '', industry = '未填写', amount = '0', year = '0', tags = ''] = line.split('|').map((part) => part.trim());
      return {
        name,
        industry,
        amount: Number(amount),
        year: Number(year),
        tags: splitList(tags)
      };
    })
    .filter((item) => item.name);
}

function splitList(text) {
  return String(text)
    .split(/[,，、]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function analyzeBidProject({ enterprise, tenderText }) {
  const requirements = extractTenderRequirements(tenderText);
  const reasoningNodes = [];

  reasoningNodes.push(createNode({
    id: 'node-parse',
    name: '解析招标文件要求',
    type: 'rule_parser',
    input: { tenderTextLength: tenderText.length },
    output: { requirementCount: requirements.length },
    confidence: 0.82
  }));

  const matches = requirements.map((requirement, index) => {
    const match = matchRequirement(enterprise, requirement);
    reasoningNodes.push(createNode({
      id: `node-match-${index + 1}`,
      name: `匹配：${requirement.title}`,
      type: match.logicType,
      input: { requirement: requirement.content },
      output: {
        status: match.status,
        score: match.score,
        reason: match.reason
      },
      confidence: match.confidence,
      evidence: match.evidence
    }));
    return { requirement, ...match };
  });

  const fit = calculateFit(matches);
  reasoningNodes.push(createNode({
    id: 'node-fit-score',
    name: '计算投标适配度',
    type: 'weighted_score',
    input: {
      qualification: getScore(matches, 'qualification'),
      case: getScore(matches, 'case'),
      service: getScore(matches, 'service'),
      technical: getScore(matches, 'technical'),
      risk: getScore(matches, 'risk')
    },
    output: fit,
    confidence: 0.84
  }));

  const risks = buildRisks(matches);

  // 增强解析：从招标文件中提取评分细则、交付要求等附加信息
  const enhancedAnalysis = extractEnhancedInfo(tenderText);

  return {
    enterprise,
    tenderText,
    requirements,
    matches,
    enhancedAnalysis,
    fit,
    risks,
    reasoningNodes
  };
}

function generateProposalDraft(analysis) {
  const qualificationMatch = findMatch(analysis.matches, 'qualification');
  const caseMatch = findMatch(analysis.matches, 'case');
  const serviceMatch = findMatch(analysis.matches, 'service');

  const firstQualification = analysis.enterprise.qualifications[0];
  const firstCase = analysis.enterprise.cases[0];

  return {
    title: `${analysis.enterprise.name}投标文件草稿`,
    sections: {
      companyProfile: `${analysis.enterprise.name}具备${analysis.enterprise.capabilities.slice(0, 4).join('、')}等能力。本草稿仅引用企业本体中的已登记事实，需由投标负责人最终确认。`,
      qualificationResponse: firstQualification
        ? `我公司具备${firstQualification.name}，证书等级/类型为${firstQualification.level}，有效期至${firstQualification.validTo}。该内容用于响应：${qualificationMatch?.requirement.content ?? '资质要求'}。`
        : '需人工补充：企业本体中未登记可用于响应的资质证书。',
      caseResponse: firstCase
        ? `我公司已完成${firstCase.name}，项目金额${formatMoney(firstCase.amount)}，实施年份${firstCase.year}，项目标签包括${firstCase.tags.join('、')}。${caseMatch?.status === '部分满足' ? '需人工补充：招标文件要求不少于2个类似项目，目前企业本体仅找到1个强匹配案例。' : ''}`
        : '需人工补充：企业本体中未登记类似项目案例。',
      technicalPlan: `针对本项目，建议技术方案围绕项目理解、系统集成、数据治理、平台运维、质量保障展开，并逐条对应招标文件中的技术方案评分点。`,
      implementationPlan: `实施方案建议分为启动调研、方案深化、系统配置、联调测试、试运行、验收交付六个阶段，并在每个阶段明确责任人、交付物和风险控制措施。`,
      afterSalesPlan: serviceMatch?.status === '满足'
        ? `我公司具备本地化售后服务能力，可承诺${analysis.enterprise.service.responseHours}小时内响应，并配置专人负责问题受理、跟踪和闭环。`
        : '需人工补充：本地化售后服务证明或响应时效承诺。'
    }
  };
}

function reviewProposalDraft({ analysis, draft }) {
  const findings = [];
  const qualificationMatch = findMatch(analysis.matches, 'qualification');
  const caseMatch = findMatch(analysis.matches, 'case');

  if (qualificationMatch?.status === '不满足') {
    findings.push({
      type: 'mandatory_gap',
      level: 'high',
      location: '资质响应',
      message: '硬性资质要求未满足，当前不应进入投标文件定稿。',
      suggestion: '补充有效资质证书，或确认该项目不适合参与。'
    });
  }

  if (caseMatch?.status !== '满足') {
    findings.push({
      type: 'missing_evidence',
      level: 'medium',
      location: '类似案例响应',
      message: '类似业绩证据不足，可能影响商务得分。',
      suggestion: '补充满足招标金额、时间和内容要求的类似项目案例，或标注为需人工确认。'
    });
  }

  if (draft.sections.technicalPlan.length < 120) {
    findings.push({
      type: 'low_score_risk',
      level: 'medium',
      location: '技术方案',
      message: '技术方案仍为提纲式表达，针对评分点的展开不足。',
      suggestion: '根据评分细则补充项目理解、实施路径、质量保障和售后服务的详细措施。'
    });
  }

  const highRiskCount = findings.filter((finding) => finding.level === 'high').length;
  const mediumRiskCount = findings.filter((finding) => finding.level === 'medium').length;

  return {
    findings,
    summary: {
      highRiskCount,
      mediumRiskCount,
      status: highRiskCount > 0 ? '需重点复核' : '可进入人工复核'
    }
  };
}

function matchRequirement(enterprise, requirement) {
  if (requirement.type === 'qualification') {
    const qualification = enterprise.qualifications.find((item) => {
      const content = requirement.content;
      const name = item.name;
      const keywordMatched =
        (content.includes('营业执照') && name.includes('营业执照')) ||
        (content.includes('ISO9001') && name.includes('ISO9001')) ||
        (content.includes('社保') && name.includes('社保')) ||
        (content.includes('完税') && name.includes('完税')) ||
        (content.includes('资质') && name.includes('资质'));
      return keywordMatched && item.validTo >= TODAY;
    });
    return qualification
      ? passMatch('满足', 100, `找到有效资质：${qualification.name}，有效期至${qualification.validTo}`, [qualification.name], 'ontology_query')
      : passMatch('不满足', 0, '企业本体中未找到与该资格要求直接对应的有效资料。', [], 'ontology_query');
  }

  if (requirement.type === 'case') {
    const minAmount = extractAmountRequirement(requirement.content);
    const requiredCount = extractCountRequirement(requirement.content);
    const requirementTokens = extractSimilarityTokens(requirement.content);
    const matchingCases = enterprise.cases.filter((item) =>
      item.year >= 2023 &&
      item.amount >= minAmount &&
      hasAnyOverlap([...item.tags, item.industry, item.name], requirementTokens)
    );

    if (matchingCases.length >= requiredCount) {
      return passMatch('满足', 100, `找到${matchingCases.length}个强匹配类似案例。`, matchingCases.map((item) => item.name), 'ontology_query + semantic_match');
    }

    if (matchingCases.length > 0) {
      return passMatch('部分满足', 60, `仅找到${matchingCases.length}个金额、时间和内容均匹配的类似案例，少于招标要求的${requiredCount}个。`, matchingCases.map((item) => item.name), 'ontology_query + semantic_match');
    }

    return passMatch('不满足', 0, `未找到金额不低于${formatMoney(minAmount)}的近三年类似项目案例。`, [], 'ontology_query + semantic_match');
  }

  if (requirement.type === 'service') {
    const service = enterprise.service;
    const requiredHours = extractHourRequirement(requirement.content);
    if (service.localOffice && service.responseHours <= requiredHours) {
      return passMatch('满足', 100, `具备本地化服务能力，响应时间${service.responseHours}小时。`, ['本地服务能力'], 'rule_check');
    }
    return passMatch('部分满足', 50, `本地化服务或响应时效证明不足；招标要求不超过${requiredHours}小时。`, [], 'rule_check');
  }

  if (requirement.type === 'technical') {
    const requirementTokens = extractSimilarityTokens(requirement.content);
    const relevantCapabilities = enterprise.capabilities.filter((capability) => hasAnyOverlap([capability], requirementTokens));
    return passMatch(
      relevantCapabilities.length >= 3 ? '满足' : '部分满足',
      relevantCapabilities.length >= 3 ? 85 : 55,
      `企业本体中找到${relevantCapabilities.length}项相关技术能力：${relevantCapabilities.join('、')}。`,
      relevantCapabilities,
      'capability_mapping'
    );
  }

  if (requirement.type === 'risk') {
    return passMatch('需人工确认', 50, '废标条款已识别，需要在标书生成后逐条检查有效资质和实质性响应。', ['废标条款'], 'risk_rule');
  }

  return passMatch('需人工确认', 40, '暂不支持该类要求自动匹配。', [], 'manual_review');
}

function passMatch(status, score, reason, evidence, logicType) {
  return {
    status,
    score,
    reason,
    evidence,
    logicType,
    confidence: status === '满足' ? 0.92 : 0.78
  };
}

function calculateFit(matches) {
  const totalScore = Math.round(
    getScore(matches, 'qualification') * 0.3 +
    getScore(matches, 'case') * 0.2 +
    getScore(matches, 'technical') * 0.2 +
    getScore(matches, 'service') * 0.15 +
    getScore(matches, 'risk') * 0.15
  );

  const hasMandatoryGap = matches.some((match) =>
    match.requirement.mandatory && match.status === '不满足'
  );

  let recommendation = '不建议参与';
  if (hasMandatoryGap) recommendation = '不建议参与';
  else if (totalScore >= 85) recommendation = '强烈推荐参与';
  else if (totalScore >= 75) recommendation = '推荐参与';
  else if (totalScore >= 60) recommendation = '谨慎参与';

  return {
    totalScore,
    recommendation,
    hasMandatoryGap,
    riskLevel: totalScore >= 80 ? '中' : '高',
    dimensions: [
      buildDimension('资格门槛匹配', getScore(matches, 'qualification'), 30),
      buildDimension('项目案例匹配', getScore(matches, 'case'), 20),
      buildDimension('技术能力匹配', getScore(matches, 'technical'), 20),
      buildDimension('服务交付匹配', getScore(matches, 'service'), 15),
      buildDimension('废标风险控制', getScore(matches, 'risk'), 15)
    ]
  };
}

function buildDimension(name, rawScore, weight) {
  return {
    name,
    rawScore,
    weightedScore: Math.round(rawScore * weight / 100),
    weight
  };
}

function buildRisks(matches) {
  return matches
    .filter((match) => match.status !== '满足')
    .map((match) => ({
      level: match.status === '不满足' ? 'high' : 'medium',
      title: match.requirement.title,
      description: match.reason,
      suggestion: match.status === '部分满足'
        ? '补充企业本体证据或在标书中标注需人工确认。'
        : '投标前必须补齐该项，否则可能不适合参与。'
    }));
}

function extractAmountRequirement(text) {
  const content = String(text);
  const wanMatch = content.match(/不低于\s*(\d+(?:\.\d+)?)\s*万/);
  if (wanMatch) return Number(wanMatch[1]) * 10000;

  const yuanMatch = content.match(/不低于\s*(\d+(?:\.\d+)?)\s*元/);
  if (yuanMatch) return Number(yuanMatch[1]);

  return 0;
}

function extractCountRequirement(text) {
  const content = String(text);
  const digitMatch = content.match(/不少于\s*(\d+)\s*个/);
  if (digitMatch) return Number(digitMatch[1]);

  if (content.includes('2个') || content.includes('两个')) return 2;
  return 1;
}

function extractHourRequirement(text) {
  const content = String(text);
  const hourMatch = content.match(/不超过\s*(\d+(?:\.\d+)?)\s*小时/);
  if (hourMatch) return Number(hourMatch[1]);
  return 24;
}

function extractSimilarityTokens(text) {
  const knownTokens = [
    '办公终端',
    '终端',
    '供货',
    '设备',
    '华为',
    'HarmonyOS',
    '政府采购',
    '信息化',
    '系统集成',
    '平台运维',
    '数据治理',
    '售后',
    '质保',
    '实施方案',
    '质量保障'
  ];

  return knownTokens.filter((token) => String(text).includes(token));
}

function hasAnyOverlap(values, tokens) {
  if (tokens.length === 0) return true;
  return values.some((value) => tokens.some((token) => String(value).includes(token) || token.includes(String(value))));
}

function findMatch(matches, type) {
  return matches.find((match) => match.requirement.type === type);
}

function getScore(matches, type) {
  return findMatch(matches, type)?.score ?? 0;
}

function createNode({ id, name, type, input, output, confidence, evidence = [] }) {
  const plain = buildPlainReasoning({ name, output, confidence, evidence });
  return {
    id,
    name,
    logicType: type,
    input,
    output,
    confidence,
    evidence,
    status: confidence >= 0.8 ? 'success' : 'need_human',
    ...plain
  };
}

function formatMoney(amount) {
  return `${(amount / 10000).toFixed(0)}万元`;
}

function buildPlainReasoning({ name, output, confidence, evidence }) {
  if (name === '解析招标文件要求') {
    return {
      summary: '系统先读取招标文件内容，识别其中的关键要求。',
      basis: `本次从文件中识别出 ${output.requirementCount} 类关键内容。`,
      conclusion: output.requirementCount > 0
        ? '招标文件已进入后续匹配分析。'
        : '未识别出有效要求，需要人工检查文件内容。',
      nextAction: output.requirementCount > 0
        ? '继续对企业资质、案例、服务和技术能力做匹配。'
        : '请确认上传文件是否为可读文本，或补充 OCR/文档解析。'
    };
  }

  if (name === '计算投标适配度') {
    return {
      summary: '系统把各项匹配结果汇总成投标适配度。',
      basis: `资格、案例、技术、服务和废标风险综合计算，总分为 ${output.totalScore} 分。`,
      conclusion: `当前结论是：${output.recommendation}，风险等级为${output.riskLevel}。`,
      nextAction: output.hasMandatoryGap
        ? '存在硬性缺口，建议先补齐资料或放弃本项目。'
        : '可进入标书草稿生成和人工复核。'
    };
  }

  const evidenceText = evidence.length > 0 ? evidence.join('、') : '未找到可直接引用的企业证据';
  const statusText = output.status ?? '需人工确认';
  const reasonText = output.reason ?? '暂无详细原因';

  return {
    summary: name.replace('匹配：', '系统检查：'),
    basis: `依据：${evidenceText}。`,
    conclusion: `判断结果：${statusText}。${reasonText}`,
    nextAction: confidence >= 0.8 && statusText === '满足'
      ? '该项可作为后续标书响应依据。'
      : '该项需要人工复核或补充企业资料。'
  };
}


// 增强解析：从招标文件中提取评分细则、交付要求等附加信息（不参与权重计算）
function extractEnhancedInfo(tenderText) {
  const enhancedPatterns = [
    { id: "scoringRules", keywords: ["评分办法", "评分标准", "评标方法", "综合评分", "评审因素", "分值", "价格分", "技术分", "商务分"], title: "评分细则" },
    { id: "delivery", keywords: ["交货时间", "交付地点", "实施周期", "工期", "交付期限", "验收标准"], title: "交付与验收要求" },
    { id: "procurementList", keywords: ["采购清单", "采购内容", "采购需求", "供货清单", "配置清单", "数量"], title: "采购清单" },
    { id: "bidDeadline", keywords: ["投标截止", "开标时间", "递交时间", "投标文件递交"], title: "投标时间与地点" },
    { id: "bidDeposit", keywords: ["投标保证金", "保证金", "投标保函"], title: "投标保证金" },
    { id: "budgetAndPricing", keywords: ["项目预算", "最高限价", "采购预算", "报价要求"], title: "预算与报价要求" }
  ];

  const normalized = tenderText.replace(/\r/g, '').trim();
  const lines = normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const info = [];

  for (const pattern of enhancedPatterns) {
    const matchedLine = lines.find((line) => pattern.keywords.some((kw) => line.includes(kw)));
    if (!matchedLine) continue;

    const lineIndex = lines.indexOf(matchedLine);
    const ctxStart = Math.max(0, lineIndex - 1);
    const ctxEnd = Math.min(lines.length, lineIndex + 4);
    const contextLines = [];
    for (let j = ctxStart; j < ctxEnd; j++) {
      contextLines.push(j === lineIndex ? '  \u2192 ' + lines[j] : '    ' + lines[j]);
    }

    // 提取结构化详情
    const details = {};
    const combined = contextLines.join(' ');

    if (pattern.id === 'scoringRules') {
      const priceMatch = combined.match(/价格分.*?(\d+)\s*[分%]/);
      const techMatch = combined.match(/技术分.*?(\d+)\s*[分%]/);
      const businessMatch = combined.match(/商务分.*?(\d+)\s*[分%]/);
      details.priceWeight = priceMatch ? parseInt(priceMatch[1]) : null;
      details.techWeight = techMatch ? parseInt(techMatch[1]) : null;
      details.businessWeight = businessMatch ? parseInt(businessMatch[1]) : null;
    }

    if (pattern.id === 'delivery') {
      const dayMatch = combined.match(/(\d+)\s*[天日]/);
      details.deliveryDays = dayMatch ? parseInt(dayMatch[1]) : null;
    }

    info.push({
      id: pattern.id,
      title: pattern.title,
      content: matchedLine.replace(/^\d+[.、]\s*/, ''),
      contextLines: contextLines,
      details: details
    });
  }

  return info;
}


// ---- app.js ----

const elements = {
  enterpriseName: document.querySelector('#enterpriseName'),
  enterpriseSlogan: document.querySelector('#enterpriseSlogan'),
  enterpriseFacts: document.querySelector('#enterpriseFacts'),
  enterpriseFile: document.querySelector('#enterpriseFile'),
  enterpriseStatus: document.querySelector('#enterpriseStatus'),
  loadKexunSample: document.querySelector('#loadKexunSample'),
  enterpriseNameInput: document.querySelector('#enterpriseNameInput'),
  enterpriseSloganInput: document.querySelector('#enterpriseSloganInput'),
  qualificationsInput: document.querySelector('#qualificationsInput'),
  casesInput: document.querySelector('#casesInput'),
  capabilitiesInput: document.querySelector('#capabilitiesInput'),
  localOfficeInput: document.querySelector('#localOfficeInput'),
  responseHoursInput: document.querySelector('#responseHoursInput'),
  enterpriseRawProfile: kexunEnterprise,
  tenderFile: document.querySelector('#tenderFile'),
  tenderInput: document.querySelector('#tenderInput'),
  runAnalysis: document.querySelector('#runAnalysis'),
  loadSample: document.querySelector('#loadSample'),
  fileStatus: document.querySelector('#fileStatus'),
  fitScore: document.querySelector('#fitScore'),
  fitRecommendation: document.querySelector('#fitRecommendation'),
  riskLevel: document.querySelector('#riskLevel'),
  reviewStatus: document.querySelector('#reviewStatus'),
  reviewCounts: document.querySelector('#reviewCounts'),
  dimensions: document.querySelector('#dimensions'),
  risks: document.querySelector('#risks'),
  draft: document.querySelector('#draft'),
  reviewFindings: document.querySelector('#reviewFindings'),
  reasoningNodes: document.querySelector('#reasoningNodes'),
  enhancedAnalysis: document.querySelector('#enhancedAnalysis')
};

function init() {
  fillEnterpriseForm(kexunEnterprise);
  renderEnterprise(kexunEnterprise);
  elements.enterpriseFile.addEventListener('change', handleEnterpriseFileUpload);
  elements.loadKexunSample.addEventListener('click', () => {
    elements.enterpriseFile.value = '';
    fillEnterpriseForm(kexunEnterprise);
    setEnterpriseStatus('已重置为重庆科讯科技有限公司资料。', true);
    renderEnterprise(kexunEnterprise);
  });
  setTenderContent(sampleTenderText, '已加载内置样例招标文件，可点击“开始解析”。', true);
  elements.tenderFile.addEventListener('change', handleTenderFileUpload);
  elements.loadSample.addEventListener('click', () => {
    elements.tenderFile.value = '';
    setTenderContent(sampleTenderText, '已加载内置样例招标文件，可点击“开始解析”。', true);
  });
  elements.runAnalysis.addEventListener('click', runAnalysis);
  runAnalysis();
}

function runAnalysis() {
  const tenderText = elements.tenderInput.value.trim();
  if (!tenderText) {
    setFileStatus('请先上传可解析的招标文件。', false);
    return;
  }

  const normalized = readEnterpriseFromForm();
  if (!normalized.ok) {
    setEnterpriseStatus(normalized.errors.join(' '), false);
    return;
  }

  const enterprise = normalized.enterprise;
  renderEnterprise(enterprise);
  setEnterpriseStatus('企业资料已用于本次解析。', true);

  const analysis = analyzeBidProject({ enterprise, tenderText });
  const draft = generateProposalDraft(analysis);
  const review = reviewProposalDraft({ analysis, draft });

  renderFit(analysis.fit, review);
  renderDimensions(analysis.fit.dimensions);
  renderRisks(analysis.risks);
  renderDraft(draft);
  renderReview(review);
  renderReasoning(analysis.reasoningNodes);
  renderEnhancedAnalysis(analysis.enhancedAnalysis);

}

async function handleEnterpriseFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.name.toLowerCase().endsWith('.json')) {
    setEnterpriseStatus('当前 demo 仅支持上传 JSON 格式企业资料。', false);
    return;
  }

  try {
    const parsed = JSON.parse(await file.text());
    const enterprise = parsed.enterprise ?? parsed;
    fillEnterpriseForm(enterprise);
    const normalized = readEnterpriseFromForm();
    if (!normalized.ok) {
      setEnterpriseStatus(normalized.errors.join(' '), false);
      return;
    }
    elements.enterpriseRawProfile = enterprise;
    renderEnterprise(normalized.enterprise);
    setEnterpriseStatus(`${file.name}：企业资料已读取，请点击“开始解析”。`, true);
  } catch {
    setEnterpriseStatus(`${file.name}：JSON 解析失败，请检查文件格式。`, false);
  }
}

async function handleTenderFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const support = getTenderFileSupport(file.name);
  if (!support.supported) {
    elements.tenderInput.value = '';
    setFileStatus(`${file.name}：${support.reason}`, false);
    return;
  }

  try {
    const lowerName = file.name.toLowerCase();
    const content = lowerName.endsWith('.docx')
      ? await extractDocxText(file)
      : lowerName.endsWith('.doc')
        ? await extractLegacyDocText(file)
        : await file.text();

    if (!content.trim()) {
      elements.tenderInput.value = '';
      setFileStatus(`${file.name}：没有读取到可解析文本。如果这是扫描版 Word 或加密 Word，需要 OCR 或另存为 .docx 后再解析。`, false);
      return;
    }

    setTenderContent(content, `${file.name}：${support.reason} 请点击“开始解析”。`, true);
  } catch {
    elements.tenderInput.value = '';
    setFileStatus(`${file.name}：文件读取失败，请确认文件格式有效。`, false);
  }
}

async function extractDocxText(file) {
  if (!window.mammoth) {
    throw new Error('mammoth not loaded');
  }

  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer });
  return result.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

async function extractLegacyDocText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const fullText16 = decodeBytes(bytes, 'utf-16le');
  const fullTextGb = decodeBytes(bytes, 'gb18030');

  const candidate16 = extractChineseBlocks(fullText16);
  const candidateGb = extractChineseBlocks(fullTextGb);

  const best = [candidate16, candidateGb]
    .map(mergeLines)
    .filter((t) => scoreTenderText(t) >= 8)
    .sort((a, b) => scoreTenderText(b) - scoreTenderText(a))[0] ?? '';

  return best;
}

function decodeBytes(bytes, label) {
  try {
    return new TextDecoder(label, { fatal: false }).decode(bytes);
  } catch {
    return '';
  }
}

function scoreTenderText(text) {
  const keywords = ['招标', '比选', '采购', '投标', '响应', '资格', '报价', '供应商', '项目', '文件'];
  const keywordScore = keywords.reduce((s, kw) => s + (text.includes(kw) ? 8 : 0), 0);
  const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  return keywordScore + Math.min(40, Math.floor(chineseCount / 80));
}

function setTenderContent(content, message, isReady) {
  elements.tenderInput.value = content;
  setFileStatus(message, isReady);
}

function setFileStatus(message, isReady) {
  elements.fileStatus.textContent = message;
  elements.fileStatus.classList.toggle('ready', isReady);
  elements.fileStatus.classList.toggle('blocked', !isReady);
}

function setEnterpriseStatus(message, isReady) {
  elements.enterpriseStatus.textContent = message;
  elements.enterpriseStatus.classList.toggle('ready', isReady);
  elements.enterpriseStatus.classList.toggle('blocked', !isReady);
}

function readEnterpriseFromForm() {
  return normalizeEnterpriseProfile({
    name: elements.enterpriseNameInput.value,
    slogan: elements.enterpriseSloganInput.value,
    qualificationsText: elements.qualificationsInput.value,
    casesText: elements.casesInput.value,
    capabilitiesText: elements.capabilitiesInput.value,
    localOffice: elements.localOfficeInput.checked,
    responseHours: elements.responseHoursInput.value,
    originalEnterprise: elements.enterpriseRawProfile
  });
}

function fillEnterpriseForm(enterprise) {
  elements.enterpriseRawProfile = enterprise;
  elements.enterpriseNameInput.value = enterprise.name ?? '';
  elements.enterpriseSloganInput.value = enterprise.slogan ?? '';
  elements.qualificationsInput.value = (enterprise.qualifications ?? [])
    .map((item) => `${item.name}|${item.level}|${item.validTo}`)
    .join('\n');
  elements.casesInput.value = (enterprise.cases ?? [])
    .map((item) => `${item.name}|${item.industry}|${item.amount}|${item.year}|${(item.tags ?? []).join(',')}`)
    .join('\n');
  elements.capabilitiesInput.value = (enterprise.capabilities ?? []).join(',');
  elements.localOfficeInput.checked = Boolean(enterprise.service?.localOffice);
  elements.responseHoursInput.value = enterprise.service?.responseHours ?? '';
}

// ============================================================
// 结构化企业信息展示
// 按类目分组，每条信息标注提取状态与证据来源
// ============================================================

function renderEnterprise(enterprise) {
  elements.enterpriseName.textContent = enterprise.name;
  elements.enterpriseSlogan.textContent = enterprise.slogan;

  const blocks = [];

  // ---- 区块1：基本资质 ----
  const qualItems = (enterprise.qualifications ?? []).map(q => {
    const status = tagStatus(q.evidence);
    return `
      <div class="e-item">
        <span class="e-label">${escapeHtml(q.name)}</span>
        <span class="e-value">${escapeHtml(q.level)}，有效期至 ${escapeHtml(q.validTo)}</span>
        <span class="e-badge ${status.cls}">${status.label}</span>
        ${q.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(q.evidence, 60))}</span>` : ''}
      </div>`;
  }).join('');

  blocks.push(buildBlock('基本资质', qualItems, '营业执照、社保、完税、财务等企业基础资料'));

  // ---- 区块2：营业执照详情 ----
  const bl = enterprise.businessLicense;
  if (bl) {
    const blItems = `
      <div class="e-item">
        <span class="e-label">登记机关</span>
        <span class="e-value">${escapeHtml(bl.registeredAuthority || '未填写')}</span>
        <span class="e-badge confirmed">已确认</span>
      </div>
      <div class="e-item">
        <span class="e-label">注册地址</span>
        <span class="e-value">${escapeHtml(bl.address || '未填写')}</span>
        <span class="e-badge confirmed">已确认</span>
      </div>
      <div class="e-item">
        <span class="e-label">执照状态</span>
        <span class="e-value">${escapeHtml(bl.status || '未填写')}</span>
        <span class="e-badge ocr">需OCR</span>
        ${bl.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(bl.evidence, 60))}</span>` : ''}
      </div>`;
    blocks.push(buildBlock('营业执照', blItems, '统一社会信用代码、注册资本等核心字段需 OCR 补充'));
  }

  // ---- 区块3：项目案例 ----
  const caseItems = (enterprise.cases ?? []).map(c => {
    const status = tagStatus(c.evidence);
    return `
      <div class="e-item">
        <span class="e-label">${escapeHtml(c.name)}</span>
        <span class="e-value">${escapeHtml(c.industry)} · ${c.amount ? formatAmount(c.amount) : '金额待补'} · ${c.year || '年份待补'}</span>
        <span class="e-badge ${status.cls}">${status.label}</span>
        ${c.customer ? `<span class="e-meta">客户：${escapeHtml(c.customer)}</span>` : ''}
        ${c.tags ? `<span class="e-meta">标签：${escapeHtml(c.tags.join('、'))}</span>` : ''}
        ${c.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(c.evidence, 60))}</span>` : ''}
      </div>`;
  }).join('') || '<div class="e-empty">暂无项目案例</div>';

  blocks.push(buildBlock('项目案例', caseItems, '已登记案例用于类似项目业绩匹配'));

  // ---- 区块4：技术设备与能力 ----
  let deviceItems = (enterprise.devices ?? []).map(d => {
    const status = tagStatus(d.evidence);
    return `
      <div class="e-item">
        <span class="e-label">${escapeHtml(d.name)}</span>
        <span class="e-value">${d.os ? escapeHtml(d.os) : ''}${d.ram ? ' · ' + escapeHtml(d.ram) : ''}${d.rom ? ' · ' + escapeHtml(d.rom) : ''}${d.battery ? ' · ' + escapeHtml(d.battery) : ''}</span>
        <span class="e-badge ${status.cls}">${status.label}</span>
        ${d.certifications ? `<span class="e-meta">认证：${escapeHtml(d.certifications.slice(0, 4).join('、'))}${d.certifications.length > 4 ? `等${d.certifications.length}项` : ''}</span>` : ''}
      </div>`;
  }).join('');

  const capItems = (enterprise.capabilities ?? []).map(c => `
    <span class="e-tag">${escapeHtml(c)}</span>
  `).join('');

  const techBlock = `
    ${deviceItems ? `<div class="e-subsection"><p class="e-subtitle">设备</p>${deviceItems}</div>` : ''}
    <div class="e-subsection"><p class="e-subtitle">技术能力</p><div class="e-tag-list">${capItems}</div></div>
    ${(enterprise.productCertifications ?? []).length > 0 ? `
      <div class="e-subsection"><p class="e-subtitle">产品认证（${enterprise.productCertifications.length} 项）</p>
      ${enterprise.productCertifications.map(pc => `
        <div class="e-item">
          <span class="e-label">${escapeHtml(pc.name)}</span>
          <span class="e-value">${escapeHtml(pc.status)}</span>
          <span class="e-badge ocr">需OCR</span>
        </div>
      `).join('')}</div>
    ` : ''}
    <div class="e-subsection"><p class="e-subtitle">售后服务</p>
      <div class="e-item">
        <span class="e-label">本地化服务</span>
        <span class="e-value">${enterprise.service?.localOffice ? '已具备' : '待确认'}</span>
        <span class="e-badge ${enterprise.service?.localOffice ? 'confirmed' : 'pending'}">${enterprise.service?.localOffice ? '已确认' : '待补充'}</span>
      </div>
      <div class="e-item">
        <span class="e-label">响应时效</span>
        <span class="e-value">${enterprise.service?.responseHours || '?'} 小时</span>
        <span class="e-badge ${enterprise.service?.responseHours ? 'confirmed' : 'pending'}">${enterprise.service?.responseHours ? '已确认' : '待补充'}</span>
      </div>
      ${enterprise.service?.warranty ? `
        <div class="e-item">
          <span class="e-label">质保承诺</span>
          <span class="e-value">${escapeHtml(enterprise.service.warranty)}</span>
          <span class="e-badge confirmed">已确认</span>
        </div>` : ''}
      ${enterprise.service?.pricing ? `
        <div class="e-item">
          <span class="e-label">报价说明</span>
          <span class="e-value">${escapeHtml(truncate(enterprise.service.pricing, 80))}</span>
          <span class="e-badge confirmed">已确认</span>
        </div>` : ''}
    </div>`;

  blocks.push(buildBlock('技术设备与能力', techBlock, '设备参数、技术能力、认证及售后服务'));

  // ---- 区块5：财税信息 ----
  const taxItems = (enterprise.taxProofs ?? []).map(t => `
    <div class="e-item">
      <span class="e-label">${escapeHtml(t.name)}</span>
      <span class="e-value">${escapeHtml(t.status)}</span>
      <span class="e-badge ocr">需OCR</span>
      ${t.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(t.evidence, 60))}</span>` : ''}
    </div>
  `).join('');

  const finItems = (enterprise.financialStatements ?? []).map(f => `
    <div class="e-item">
      <span class="e-label">${escapeHtml(f.name)}</span>
      <span class="e-value">${escapeHtml(f.status)}</span>
      <span class="e-badge ocr">需OCR</span>
      ${f.evidence ? `<span class="e-source">来源：${escapeHtml(truncate(f.evidence, 60))}</span>` : ''}
    </div>
  `).join('');

  blocks.push(buildBlock('财税信息', taxItems + finItems, '完税证明和资产负债表需 OCR 提取数值'));

  // ---- 区块6：待补证据清单 + 提取警告 ----
  const pendingItems = (enterprise.pendingEvidence ?? []).map(p => `
    <div class="e-item">
      <span class="e-value">${escapeHtml(p)}</span>
      <span class="e-badge pending">待补充</span>
    </div>
  `).join('') || '<div class="e-empty">暂无待补证据</div>';

  const warnItems = (enterprise.extractionWarnings ?? []).map(w => `
    <div class="e-item e-warning">
      <span class="e-value">${escapeHtml(w)}</span>
    </div>
  `).join('');

  blocks.push(buildBlock('待补充与注意事项', pendingItems + warnItems, '这些信息影响匹配精度，建议优先补充'));

  // ---- 区块7：标书模板（如果有） ----
  const pt = enterprise.proposalTemplates;
  if (pt) {
    const tmplItems = Object.entries(pt).map(([key, val]) => {
      const label = ({ commitment: '基本资格声明', warranty: '质保承诺', pricing: '报价说明', basicQualification: '基本资格声明' })[key] || key;
      return `
        <div class="e-item">
          <span class="e-label">${escapeHtml(label)}</span>
          <span class="e-value">${escapeHtml(truncate(val, 100))}</span>
          <span class="e-badge confirmed">文本已提取</span>
        </div>`;
    }).join('');
    blocks.push(buildBlock('标书模板素材', tmplItems, '可直接用于标书草稿生成'));
  }

  elements.enterpriseFacts.innerHTML = blocks.join('\n');
}

// ---- 辅助函数 ----

function buildBlock(title, items, hint) {
  return `
    <div class="e-block">
      <div class="e-block-head">
        <p class="e-block-title">${escapeHtml(title)}</p>
        ${hint ? `<span class="e-block-hint">${escapeHtml(hint)}</span>` : ''}
      </div>
      <div class="e-block-body">${items}</div>
    </div>`;
}

function tagStatus(evidence) {
  if (!evidence) return { cls: 'pending', label: '待补充' };
  const lower = evidence.toLowerCase();
  if (lower.includes('ocr') || lower.includes('待补充') || lower.includes('需人工')) return { cls: 'ocr', label: '需OCR' };
  if (lower.includes('待确认') || lower.includes('人工确认')) return { cls: 'pending', label: '待确认' };
  return { cls: 'confirmed', label: '已确认' };
}

function formatAmount(amount) {
  if (amount >= 10000) return `${(amount / 10000).toFixed(0)} 万元`;
  return `${amount} 元`;
}

function truncate(str, maxLen) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}


function renderFit(fit, review) {
  elements.fitScore.textContent = `${fit.totalScore}`;
  elements.fitRecommendation.textContent = fit.recommendation;
  elements.riskLevel.textContent = fit.riskLevel;
  elements.reviewStatus.textContent = review.summary.status;
  elements.reviewCounts.textContent = `高风险 ${review.summary.highRiskCount} 项，中风险 ${review.summary.mediumRiskCount} 项`;
}

function renderDimensions(dimensions) {
  elements.dimensions.innerHTML = dimensions.map((dimension) => `
    <div class="dimension">
      <div class="dimension-top">
        <span>${escapeHtml(dimension.name)}</span>
        <span>${dimension.weightedScore} / ${dimension.weight}</span>
      </div>
      <div class="bar"><span style="width:${dimension.rawScore}%"></span></div>
    </div>
  `).join('');
}

function renderRisks(risks) {
  elements.risks.innerHTML = risks.length
    ? risks.map((risk) => `
      <div class="risk ${risk.level}">
        <strong>${escapeHtml(risk.title)}</strong>
        <p>${escapeHtml(risk.description)}</p>
        <p>${escapeHtml(risk.suggestion)}</p>
      </div>
    `).join('')
    : '<div class="risk"><strong>暂无明显风险</strong><p>仍建议人工复核关键资质、案例和废标条款。</p></div>';
}

function renderDraft(draft) {
  const labels = {
    companyProfile: '公司基本情况',
    qualificationResponse: '资质响应',
    caseResponse: '类似案例',
    technicalPlan: '技术方案',
    implementationPlan: '实施方案',
    afterSalesPlan: '售后方案'
  };

  elements.draft.innerHTML = Object.entries(draft.sections).map(([key, value]) => `
    <section class="draft-section">
      <strong>${labels[key]}</strong>
      <p>${escapeHtml(value)}</p>
    </section>
  `).join('');
}

function renderReview(review) {
  elements.reviewFindings.innerHTML = review.findings.map((finding) => `
    <div class="finding ${finding.level}">
      <strong>${escapeHtml(finding.location)} · ${escapeHtml(finding.type)}</strong>
      <p>${escapeHtml(finding.message)}</p>
      <p>${escapeHtml(finding.suggestion)}</p>
    </div>
  `).join('');
}

function renderReasoning(nodes) {
  elements.reasoningNodes.innerHTML = nodes.map((node) => `
    <div class="node">
      <strong>${escapeHtml(node.summary)}</strong>
      <p>${escapeHtml(node.basis)}</p>
      <p>${escapeHtml(node.conclusion)}</p>
      <p class="next-action">${escapeHtml(node.nextAction)}</p>
      <span>可信度：${(node.confidence * 100).toFixed(0)}%</span>
    </div>
  `).join('');
}

function renderEnhancedAnalysis(info) {
  if (!info || info.length === 0) {
    elements.enhancedAnalysis.innerHTML = '<div class="e-empty">未识别到附加信息，可能是招标文件内容较简单。</div>';
    return;
  }

  const labels = {
    scoringRules: '评分细则',
    delivery: '交付与验收要求',
    procurementList: '采购清单',
    bidDeadline: '投标时间与地点',
    bidDeposit: '投标保证金',
    budgetAndPricing: '预算与报价要求'
  };

  elements.enhancedAnalysis.innerHTML = info.map((item) => {
    const detailHtml = Object.entries(item.details || {}).filter(([, v]) => v !== null).map(([k, v]) => {
      const detailLabels = { priceWeight: '价格分权重', techWeight: '技术分权重', businessWeight: '商务分权重', deliveryDays: '交付天数', maxResponseHours: '响应时效' };
      return `<span class="detail-tag">\${detailLabels[k] || k}：\${v}</span>`;
    }).join('');

    return `<div class="node">
      <strong>\${escapeHtml(labels[item.id] || item.title)}</strong>
      <p>\${escapeHtml(item.content)}</p>
      \${detailHtml ? `<p class="detail-line">\${detailHtml}</p>` : ''}
    </div>`;
  }).join('');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

init();

function extractChineseBlocks(text) {
  const blocks = [];
  let current = [];
  const chars = String(text).split('');
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const cp = ch.charCodeAt(0);
    const isChinese = cp >= 0x4e00 && cp <= 0x9fff;
    const isAsciiPunct = (cp >= 0x20 && cp <= 0x7e);
    const isCnPunct = '，。、；：？！""''（）【】《》—…·'.includes(ch);
    const isNewline = ch === '\n' || ch === '\r';
    if (isChinese || isAsciiPunct || isCnPunct) {
      current.push(ch);
    } else if (isNewline) {
      if (current.length > 0) {
        blocks.push(current.join('').trim());
        current = [];
      }
    }
  }
  if (current.length > 0) {
    blocks.push(current.join('').trim());
  }
  return blocks.join('\n');
}

function mergeLines(text) {
  return String(text)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => {
      if (line.length < 2) return false;
      const asciiRatio = (line.match(/[\x00-\x7f]/g) ?? []).length / line.length;
      return asciiRatio < 0.8;
    })
    .join('\n');
}

