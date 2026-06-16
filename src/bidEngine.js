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

export function getTenderFileSupport(fileName) {
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

export function normalizeEnterpriseProfile(input) {
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

export function extractTenderRequirements(tenderText) {
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

export function analyzeBidProject({ enterprise, tenderText }) {
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

export function generateProposalDraft(analysis) {
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

export function reviewProposalDraft({ analysis, draft }) {
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
